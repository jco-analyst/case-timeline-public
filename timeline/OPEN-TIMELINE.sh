#!/bin/bash
# Quick script to open the timeline in your browser

TIMELINE_PATH="/media/jonathanco/Backup/s3s/timeline/index.html"

echo "=========================================="
echo "Opening Wrongful Dismissal Timeline"
echo "=========================================="
echo ""
echo "Path: $TIMELINE_PATH"
echo ""

# Try to open in available browser
if command -v firefox &> /dev/null; then
    echo "Opening in Firefox..."
    firefox "$TIMELINE_PATH" &
elif command -v google-chrome &> /dev/null; then
    echo "Opening in Chrome..."
    google-chrome "$TIMELINE_PATH" &
elif command -v chromium &> /dev/null; then
    echo "Opening in Chromium..."
    chromium "$TIMELINE_PATH" &
else
    echo "Opening with default browser..."
    xdg-open "$TIMELINE_PATH" &
fi

echo ""
echo "Timeline should open in your browser shortly."
echo ""
echo "Expected: 17 events in default 'Critical' view"
echo "Press F12 in browser to open DevTools and check Console"
echo ""
echo "See MANUAL-TEST-GUIDE.md for testing instructions"
echo "=========================================="
