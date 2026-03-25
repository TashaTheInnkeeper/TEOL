{
  description = "Python Text RPG Dungeon Crawler";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {inherit system;};
      python = pkgs.python312;
      pythonEnv = python.withPackages (ps:
        with ps; [
          ipython
          pytest
          pytest-cov
          playwright
          beautifulsoup4
          ruff
          mypy
        ]);
    in {
      devShells.default = pkgs.mkShell {
        packages = [
          pythonEnv
          pkgs.playwright-driver.browsers # ← Nix-managed browser binaries
          pkgs.just
        ];
        shellHook = ''
          echo "🐍 Python $(python --version) — TEOL env ready"

          # Tell Playwright where Nix put the browsers
          export PLAYWRIGHT_BROWSERS_PATH="${pkgs.playwright-driver.browsers}"

          # Skip the FHS host check (NixOS will fail it otherwise)
          export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true
        '';
      };
    });
}
