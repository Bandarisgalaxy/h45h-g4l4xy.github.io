#!/usr/bin/env bash
# =============================================================================
# migrate.sh — Migrate Jekyll Chirpy posts to the React blog
# =============================================================================
# Usage:
#   ./migrate.sh [source_dir] [dest_dir]
#
# Defaults:
#   source_dir = ../_posts          (Jekyll _posts relative to react-blog/)
#   dest_dir   = ./_posts           (React blog _posts)
#
# This script:
#   1. Copies all .md files from source → dest
#   2. Strips/remaps the 'layout: post' frontmatter key (not needed in React)
#   3. Validates that required frontmatter fields exist
#   4. Prints a summary
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="${1:-${SCRIPT_DIR}/../_posts}"
DEST_DIR="${2:-${SCRIPT_DIR}/_posts}"

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}"
echo "╔══════════════════════════════════════════════════════╗"
echo "║       H45H G4L4XY — Jekyll → React Migration        ║"
echo "╚══════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Verify source exists
if [[ ! -d "$SOURCE_DIR" ]]; then
  echo -e "${RED}[ERROR]${NC} Source directory not found: $SOURCE_DIR"
  echo "  Run this script from inside the react-blog/ directory, or pass the correct path."
  exit 1
fi

# Create destination
mkdir -p "$DEST_DIR"
echo -e "${GREEN}[✓]${NC} Destination: $DEST_DIR"

# Copy assets/images if they exist
if [[ -d "${SCRIPT_DIR}/../assets/images" ]]; then
  mkdir -p "${SCRIPT_DIR}/public/images"
  cp -r "${SCRIPT_DIR}/../assets/images/"* "${SCRIPT_DIR}/public/images/" 2>/dev/null || true
  echo -e "${GREEN}[✓]${NC} Images copied to public/images/"
fi

# Count files
TOTAL=0
COPIED=0
SKIPPED=0
WARNINGS=0

echo ""
echo -e "${CYAN}[→] Migrating posts...${NC}"
echo ""

for src_file in "$SOURCE_DIR"/*.md; do
  [[ -f "$src_file" ]] || continue
  TOTAL=$((TOTAL + 1))

  filename="$(basename "$src_file")"
  dest_file="$DEST_DIR/$filename"

  # Read file
  content=$(cat "$src_file")

  # Validate we have frontmatter
  if [[ ! "$content" =~ ^--- ]]; then
    echo -e "  ${YELLOW}[WARN]${NC} No frontmatter: $filename — skipping"
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  # Copy the file (strips nothing — the React lib handles Jekyll frontmatter just fine)
  cp "$src_file" "$dest_file"

  # Check for required fields
  missing_fields=()
  for field in title date categories; do
    if ! grep -q "^${field}:" "$dest_file"; then
      missing_fields+=("$field")
    fi
  done

  if [[ ${#missing_fields[@]} -gt 0 ]]; then
    echo -e "  ${YELLOW}[WARN]${NC} $filename — missing fields: ${missing_fields[*]}"
    WARNINGS=$((WARNINGS + 1))
  else
    echo -e "  ${GREEN}[✓]${NC} $filename"
  fi

  COPIED=$((COPIED + 1))
done

echo ""
echo -e "${CYAN}╔══════════════════════════════╗"
echo -e "║         Migration Summary    ║"
echo -e "╚══════════════════════════════╝${NC}"
echo -e "  Total found:  ${TOTAL}"
echo -e "  ${GREEN}Copied:${NC}        ${COPIED}"
echo -e "  ${RED}Skipped:${NC}       ${SKIPPED}"
echo -e "  ${YELLOW}Warnings:${NC}      ${WARNINGS}"
echo ""

if [[ $COPIED -gt 0 ]]; then
  echo -e "${GREEN}[✓] Migration complete!${NC}"
  echo ""
  echo "  Next steps:"
  echo "  1. cd react-blog"
  echo "  2. npm install"
  echo "  3. npm run dev"
  echo "  4. Open http://localhost:3000"
else
  echo -e "${RED}[✗] No posts were migrated. Check your source directory.${NC}"
  exit 1
fi
