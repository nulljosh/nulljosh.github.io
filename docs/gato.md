# Architecture

Voice-first operating system shell. Built on top of macOS, gato hides the traditional desktop (Dock, menu bar) and boots into fullscreen browser and Finder, with voice input and output as the primary interaction. Talk, not click.

## How it runs

`kiosk.sh` launches the OS: hides the Dock and menu bar, opens Safari fullscreen (for web apps), opens Finder (for files), and runs `gato.sh --kiosk` (always listening). `gato.sh` is the voice router. On each keystroke (or continuous in kiosk mode), it listens via `whisper.cpp` (local speech-to-text), routes the transcript to Claude (via `claude -p`), local Ollama, or direct action prefixes (open:, find:, go:), and speaks the result with `say`. Routing prefixes let you switch models and services mid-sentence without re-listening.

| File | What it owns |
|---|---|
| `gato.sh` | Voice router. Listens via whisper-cli (local STT), routes to claude/ollama/direct actions, speaks reply with `say`. Runs in interactive mode (`--listen-once`, triggered by hotkey) or kiosk mode (continuous). |
| `kiosk.sh` | OS launcher. Hides Dock and menu bar, opens Safari fullscreen and Finder, runs `gato.sh --kiosk`. `kiosk.sh --exit` restores the normal desktop. |
| `landing/index.html` | Explainer page deployed to gato.heyitsmejosh.com. |
| `wrangler.toml` | Cloudflare Worker deployment config for landing page. |

## Dependencies

- `claude` CLI (Anthropic's Claude Code)
- `ollama` (local LLMs)
- `whisper.cpp` (brew formula: whisper-cli)
- macOS built-ins: `say` (text-to-speech), `mdfind` (Spotlight search), `open` (launch apps), Safari, Finder

## Interaction model

Prefixes for model routing and direct actions, no model needed:
- `local:` / `ollama:` - use on-device model
- `codex:` - ask for a second opinion
- `open:<app>` - launch an app
- `find:<name>` - Spotlight search
- `go:<url>` - open URL in Safari
