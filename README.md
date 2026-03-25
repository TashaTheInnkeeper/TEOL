# teol_scraper

Scrapes all 25 questions from **teol.cz** (Technologická olympiáda), saves the
raw HTML and images locally, parses each question into a clean `.txt` file, and
commits/pushes everything to a shared git repo for your team.

---

## Quick start

### 1. Install dependencies

```bash
pip install playwright beautifulsoup4
playwright install chromium
```

### 2. Configure (optional but recommended)

Open `teol_scraper.py` and set:

```python
GIT_REMOTE = "git@github.com:TashaTheInnkeeper/TEOL.git"
GIT_BRANCH = "main"
```

Leave `GIT_REMOTE = ""` if you only want a local git commit.

### 3. Run

```bash
python teol_scraper.py
```

- **First run**: a visible browser window opens → log in to teol.cz manually →
  press **ENTER** in the terminal.  Your session is saved to `session.json` so
  you won't need to log in again.
- **Subsequent runs**: fully headless, no interaction needed.

### 4. Scrape a subset only

```bash
python teol_scraper.py 5 10   # scrape questions 5 through 10
```

---

## Output

| Path | What it is |
|------|-----------|
| `html_pages/question_01.html` … `question_25.html` | Full saved HTML of each question page |
| `html_pages/images/` | All images referenced in the questions |
| `questions.txt` | All questions formatted for chatbot paste |

### `questions.txt` format example

```
======================================================================
QUESTION 13
======================================================================

Předpokládejme senzor, který podporuje jak SPI, tak CAN protokoly…
…

[IMAGE: images/q13_image21.png]

Options:
  A) SECURE, STANDBY, ERROR, LISTEN, SECURE, STANDBY, NORMAL, SECURE, STANDBY, SLEEP
  B) SECURE, STANDBY, ERROR, WAIT, SECURE, STANDBY, NORMAL, SECURE
  C) SECURE, STANDBY, ERROR, LISTEN, SECURE, STANDBY, SLEEP, WAIT, SECURE  ❌ (your answer — wrong)
  D) SECURE, STANDBY, ERROR, WAIT, SECURE, STANDBY, SLEEP, WAIT, SECURE   ✅ CORRECT ANSWER
```

---

## Teammates: getting the files locally

```bash
git clone git@github.com:TashaTheInnkeeper/TEOL.git
```

Then open `questions.txt` or browse `html_pages/` in your browser.

---

## Notes

- `session.json` contains your login cookies — **do not commit it**.
  Add it to `.gitignore` (the script does this automatically).
- The script is safe to re-run: it won't re-download images that already exist.
- If a question fails (network error, etc.) it is skipped and the rest continue.
