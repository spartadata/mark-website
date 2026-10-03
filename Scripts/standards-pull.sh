#!/bin/sh
# Pull the latest standard into this project (run at the start of every agent session).
set -e
cd "$(git rev-parse --show-toplevel)"
git submodule update --init --remote standards >/dev/null 2>&1 || true
head -4 standards/HOUSE-RULES.md | sed -n '3p'
