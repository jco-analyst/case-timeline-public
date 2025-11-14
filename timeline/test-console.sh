#!/bin/bash
# Test timeline console for JavaScript errors and batch redistribution activity
# Uses Playwright headless browser to capture console logs

TIMELINE_PATH="file:///media/jonathanco/Backup/s3s/timeline/index.html"
PLAYWRIGHT_PYTHON="$HOME/.local/share/pipx/venvs/playwright/bin/python"

# Create test script
cat > /tmp/check_timeline_console.py << 'PYTHON_SCRIPT'
#!/usr/bin/env python3
"""Check timeline console for errors and batch redistribution activity."""

from playwright.sync_api import sync_playwright

timeline_path = "file:///media/jonathanco/Backup/s3s/timeline/index.html"

console_messages = []
errors = []


def handle_console(msg):
    console_messages.append(
        {"type": msg.type, "text": msg.text, "location": msg.location}
    )
    print(f"[{msg.type.upper()}] {msg.text}")


def handle_page_error(error):
    errors.append(str(error))
    print(f"[PAGE ERROR] {error}")


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    # Listen for console messages and errors
    page.on("console", handle_console)
    page.on("pageerror", handle_page_error)

    print(f"Loading timeline from: {timeline_path}")
    page.goto(timeline_path)

    # Wait for page to fully load
    page.wait_for_load_state("networkidle")

    # Give it a moment for any deferred errors
    page.wait_for_timeout(1000)

    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Total console messages: {len(console_messages)}")
    print(f"Total errors: {len(errors)}")

    if errors:
        print("\nERRORS FOUND:")
        for err in errors:
            print(f"  - {err}")
    else:
        print("\n✅ No JavaScript errors detected!")

    # Check for batch redistribution activity
    batch_redist = [
        msg for msg in console_messages if "batch-redistribution" in msg["text"]
    ]
    if batch_redist:
        print(f"\n🎯 Batch redistribution used {len(batch_redist)} times")
        for msg in batch_redist[:5]:  # Show first 5
            print(f"  {msg['text']}")

    # Check for card adjustments
    adjustments = [msg for msg in console_messages if "Applying" in msg["text"] and "adjustments" in msg["text"]]
    if adjustments:
        print(f"\n📦 Card adjustments: {len(adjustments)} instances")

    browser.close()
PYTHON_SCRIPT

# Run the test
echo "Running Playwright console test..."
"$PLAYWRIGHT_PYTHON" /tmp/check_timeline_console.py
