"""
teol_scraper.py — Technologická olympiáda Quiz Scraper
======================================================
Navigates https://teol.cz/quiz/1 through /quiz/25, saves each page's HTML,
downloads any embedded images, then parses everything into a single .txt file
ready to paste into a chatbot.

Finally commits and pushes all saved files to a git repository so your
teammates can access them locally.

SETUP (once):
    pip install playwright beautifulsoup4
    playwright install chromium

USAGE:
    python teol_scraper.py

On first run the browser opens visibly so you can log in manually.
After you log in, press ENTER in the terminal and the script saves your
session to `session.json` and proceeds automatically from then on.
"""

import asyncio
import json
import os
import re
import shutil
import subprocess
import sys
import urllib.parse
from pathlib import Path

from bs4 import BeautifulSoup
from playwright.async_api import async_playwright

# ── Configuration ────────────────────────────────────────────────────────────

BASE_URL       = "https://teol.cz/quiz"
TOTAL_QUESTIONS = 25                    # change if the quiz grows
HTML_DIR       = Path("html_pages")    # where saved HTML files go
IMAGES_DIR     = Path("html_pages/images")  # where downloaded images go
OUTPUT_TXT     = Path("questions.txt") # final chatbot-ready text file
SESSION_FILE   = Path("session.json")  # saved login session (cookies + storage)

GIT_REMOTE     = "git@github.com:TashaTheInnkeeper/TEOL.git"   # e.g. "git@github.com:yourteam/teol-quiz.git"
                       # leave empty to skip git push
GIT_BRANCH     = "main"

# ── Helpers ───────────────────────────────────────────────────────────────────

def run_git(args: list[str]) -> None:
    """Run a git command, print output."""
    result = subprocess.run(["git"] + args, capture_output=True, text=True)
    if result.stdout:
        print(result.stdout.strip())
    if result.stderr:
        print(result.stderr.strip())

def ensure_git_repo() -> None:
    """Init git repo and add remote if not already set up."""
    if not Path(".git").exists():
        print("📁 Initialising git repository…")
        run_git(["init"])
        run_git(["checkout", "-b", GIT_BRANCH])

    if GIT_REMOTE:
        remotes = subprocess.run(
            ["git", "remote"], capture_output=True, text=True
        ).stdout
        if "origin" not in remotes:
            print(f"🔗 Adding remote origin: {GIT_REMOTE}")
            run_git(["remote", "add", "origin", GIT_REMOTE])

def git_commit_and_push() -> None:
    """Stage everything, commit, and push."""
    run_git(["add", str(HTML_DIR), str(OUTPUT_TXT)])
    run_git(["commit", "-m", "chore: update scraped quiz pages and questions.txt"])
    if GIT_REMOTE:
        print(f"🚀 Pushing to {GIT_REMOTE} ({GIT_BRANCH})…")
        run_git(["push", "-u", "origin", GIT_BRANCH])
    else:
        print("ℹ️  GIT_REMOTE not set — skipping push (files are committed locally).")

# ── Login / Session ───────────────────────────────────────────────────────────

async def get_or_create_session(playwright) -> dict:
    """
    If session.json exists, load and return the stored state.
    Otherwise open a visible browser, let the user log in, then save the state.
    """
    if SESSION_FILE.exists():
        print(f"✅ Loading saved session from {SESSION_FILE}")
        with open(SESSION_FILE) as f:
            return json.load(f)

    print("🔐 No saved session found — opening browser for manual login…")
    browser = await playwright.chromium.launch(headless=False)
    context = await browser.new_context()
    page    = await context.new_page()
    await page.goto("https://teol.cz")

    input("\n👉 Log in to teol.cz in the browser window, then press ENTER here…\n")

    state = await context.storage_state()
    with open(SESSION_FILE, "w") as f:
        json.dump(state, f, indent=2)
    print(f"💾 Session saved to {SESSION_FILE}")

    await browser.close()
    return state

# ── Page download ─────────────────────────────────────────────────────────────

async def download_image(page, src: str, question_number: int) -> str:
    """
    Download an image referenced in the HTML.
    Returns the local relative path to use in the saved HTML.
    """
    IMAGES_DIR.mkdir(parents=True, exist_ok=True)

    # Resolve relative URLs against the question page URL
    base = f"{BASE_URL}/{question_number}"
    full_url = urllib.parse.urljoin(base, src)

    # Derive a safe local filename
    filename = Path(urllib.parse.urlparse(full_url).path).name
    local_name = f"q{question_number}_{filename}"
    local_path = IMAGES_DIR / local_name

    if local_path.exists():
        return f"images/{local_name}"

    try:
        response = await page.request.get(full_url)
        if response.ok:
            local_path.write_bytes(await response.body())
            print(f"    🖼  Downloaded image: {local_name}")
        else:
            print(f"    ⚠️  Could not download image {full_url} ({response.status})")
    except Exception as e:
        print(f"    ⚠️  Image download error for {full_url}: {e}")

    return f"images/{local_name}"

async def scrape_question(page, number: int) -> dict:
    """
    Navigate to quiz/{number}, save the raw HTML, download images,
    and return a dict with parsed question data.
    """
    url = f"{BASE_URL}/{number}#qh"
    print(f"  📄 Fetching question {number}…")
    await page.goto(url, wait_until="networkidle", timeout=30_000)

    raw_html = await page.content()

    # ── Save HTML ──────────────────────────────────────────────────────────
    HTML_DIR.mkdir(parents=True, exist_ok=True)
    html_file = HTML_DIR / f"question_{number:02d}.html"
    html_file.write_text(raw_html, encoding="utf-8")

    # ── Parse with BeautifulSoup ───────────────────────────────────────────
    soup = BeautifulSoup(raw_html, "html.parser")

    # Question text (all paragraphs and lists inside div.question)
    question_div = soup.find("div", class_="question")
    question_text = ""
    image_paths   = []

    if question_div:
        for tag in question_div.find_all(["p", "ul", "ol", "table"], recursive=True):
            # Images
            img = tag.find("img")
            if img and img.get("src"):
                local = await download_image(page, img["src"], number)
                image_paths.append(local)
                # Update src in saved HTML later
                img["src"] = local
                continue

            text = tag.get_text(separator=" ", strip=True)
            if text:
                question_text += text + "\n"

    # Answer options
    answers      = []
    correct_idx  = None
    selected_idx = None

    for i, opt in enumerate(soup.select("div.answers div.option-wrap")):
        label = opt.find("label")
        text  = label.get_text(strip=True) if label else ""
        answers.append(text)

        classes = opt.get("class", [])
        if "correct" in classes:
            correct_idx = i
        # "incorrect" means the user chose it but it was wrong
        inp = opt.find("input", {"name": "answer[]"})
        if inp and inp.has_attr("checked"):
            selected_idx = i

    # Re-save HTML with updated image paths
    html_file.write_text(str(soup), encoding="utf-8")

    return {
        "number":       number,
        "question":     question_text.strip(),
        "images":       image_paths,
        "answers":      answers,
        "correct_idx":  correct_idx,
        "selected_idx": selected_idx,
    }

# ── Text output ───────────────────────────────────────────────────────────────

OPTION_LETTERS = "ABCDEFGHIJ"

def format_question(q: dict) -> str:
    """Format a single question as chatbot-ready plain text."""
    lines = []
    lines.append(f"{'='*70}")
    lines.append(f"QUESTION {q['number']}")
    lines.append(f"{'='*70}")
    lines.append("")
    lines.append(q["question"])

    if q["images"]:
        lines.append("")
        for img in q["images"]:
            lines.append(f"[IMAGE: {img}]")

    lines.append("")
    lines.append("Options:")
    for i, answer in enumerate(q["answers"]):
        letter = OPTION_LETTERS[i] if i < len(OPTION_LETTERS) else str(i + 1)
        marker = ""
        if i == q["correct_idx"] and i == q["selected_idx"]:
            marker = "  ✅ (správně / correct)"
        elif i == q["correct_idx"]:
            marker = "  ✅ CORRECT ANSWER"
        elif i == q["selected_idx"]:
            marker = "  ❌ (your answer — wrong)"
        lines.append(f"  {letter}) {answer}{marker}")

    lines.append("")
    return "\n".join(lines)

def write_txt(questions: list[dict]) -> None:
    header = (
        "Technologická olympiáda — All Questions\n"
        "Generated by teol_scraper.py\n"
        "Paste into a chatbot to analyse / solve.\n"
        f"Total questions: {len(questions)}\n\n"
    )
    body = "\n".join(format_question(q) for q in questions)
    OUTPUT_TXT.write_text(header + body, encoding="utf-8")
    print(f"\n✅ Written {len(questions)} questions to {OUTPUT_TXT}")

# ── Main ──────────────────────────────────────────────────────────────────────

async def main() -> None:
    # Optional: pick a range from command line, e.g.  python teol_scraper.py 5 10
    start = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    end   = int(sys.argv[2]) if len(sys.argv) > 2 else TOTAL_QUESTIONS

    ensure_git_repo()

    async with async_playwright() as pw:
        session_state = await get_or_create_session(pw)

        browser = await pw.chromium.launch(headless=True)  # headless after login
        context = await browser.new_context(storage_state=session_state)
        page    = await context.new_page()

        questions = []
        for n in range(start, end + 1):
            try:
                q = await scrape_question(page, n)
                questions.append(q)
            except Exception as e:
                print(f"  ❌ Error on question {n}: {e}")

        await browser.close()

    write_txt(questions)

    # ── Git ────────────────────────────────────────────────────────────────
    print("\n📦 Committing to git…")
    git_commit_and_push()
    print("\n🎉 Done!")

if __name__ == "__main__":
    asyncio.run(main())
