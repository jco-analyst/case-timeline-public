#!/bin/bash
# Enhanced timeline test: JavaScript errors + dimension analysis + horizontal scrollbar detection
# Uses Playwright headless browser to capture console logs and measure layout dimensions

TIMELINE_PATH="file:///media/jonathanco/Backup/s3s/timeline/index.html"
PLAYWRIGHT_PYTHON="$HOME/.local/share/pipx/venvs/playwright/bin/python"

# Create enhanced test script
cat > /tmp/check_timeline_dimensions.py << 'PYTHON_SCRIPT'
#!/usr/bin/env python3
"""Check timeline console, dimensions, and horizontal scrollbar."""

from playwright.sync_api import sync_playwright
import json

timeline_path = "file:///media/jonathanco/Backup/s3s/timeline/index.html"

console_messages = []
errors = []


def handle_console(msg):
    console_messages.append(
        {"type": msg.type, "text": msg.text, "location": msg.location}
    )
    # Only print errors and warnings
    if msg.type in ["error", "warning"]:
        print(f"[{msg.type.upper()}] {msg.text}")


def handle_page_error(error):
    errors.append(str(error))
    print(f"[PAGE ERROR] {error}")


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    # Test multiple viewport sizes
    viewports = [
        {"width": 1920, "height": 1080, "name": "1920x1080 (Desktop)"},
        {"width": 1366, "height": 768, "name": "1366x768 (Laptop)"},
        {"width": 2560, "height": 1440, "name": "2560x1440 (Wide)"},
    ]

    for viewport_config in viewports:
        print("\n" + "=" * 70)
        print(f"TESTING VIEWPORT: {viewport_config['name']}")
        print("=" * 70)

        page = browser.new_page(
            viewport={"width": viewport_config["width"], "height": viewport_config["height"]}
        )

        # Listen for console messages and errors
        page.on("console", handle_console)
        page.on("pageerror", handle_page_error)

        print(f"Loading timeline from: {timeline_path}")
        page.goto(timeline_path)

        # Wait for page to fully load
        page.wait_for_load_state("networkidle")

        # Give it a moment for any deferred errors
        page.wait_for_timeout(1000)

        # Evaluate dimension diagnostics
        dimensions = page.evaluate("""
        () => {
            const body = document.body;
            const container = document.querySelector('.container');
            const svg = document.querySelector('svg');
            const cardsContainer = document.querySelector('.cards-container');

            // Find rightmost card
            const cards = Array.from(document.querySelectorAll('.event-card'));
            let rightmostCard = null;
            let maxRight = 0;

            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const right = rect.left + rect.width;
                if (right > maxRight) {
                    maxRight = right;
                    rightmostCard = card;
                }
            });

            // Find leftmost card
            let leftmostCard = null;
            let minLeft = Infinity;

            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                if (rect.left < minLeft) {
                    minLeft = rect.left;
                    leftmostCard = card;
                }
            });

            return {
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                body: {
                    clientWidth: body.clientWidth,
                    scrollWidth: body.scrollWidth,
                    hasHorizontalScroll: body.scrollWidth > body.clientWidth,
                    overflow: body.scrollWidth - body.clientWidth
                },
                container: {
                    clientWidth: container ? container.clientWidth : null,
                    scrollWidth: container ? container.scrollWidth : null,
                    offsetLeft: container ? container.offsetLeft : null,
                    hasHorizontalScroll: container ? container.scrollWidth > container.clientWidth : null
                },
                svg: {
                    widthAttr: svg ? svg.getAttribute('width') : null,
                    clientWidth: svg ? svg.clientWidth : null,
                    offsetLeft: svg ? svg.offsetLeft : null
                },
                cardsContainer: {
                    widthStyle: cardsContainer ? cardsContainer.style.width : null,
                    clientWidth: cardsContainer ? cardsContainer.clientWidth : null,
                    offsetLeft: cardsContainer ? cardsContainer.offsetLeft : null
                },
                leftmostCard: leftmostCard ? {
                    id: leftmostCard.getAttribute('data-event-id'),
                    left: leftmostCard.offsetLeft,
                    width: leftmostCard.offsetWidth,
                    boundingLeft: leftmostCard.getBoundingClientRect().left
                } : null,
                rightmostCard: rightmostCard ? {
                    id: rightmostCard.getAttribute('data-event-id'),
                    left: rightmostCard.offsetLeft,
                    width: rightmostCard.offsetWidth,
                    right: rightmostCard.offsetLeft + rightmostCard.offsetWidth,
                    boundingRight: rightmostCard.getBoundingClientRect().right
                } : null,
                totalCards: cards.length
            };
        }
        """)

        # Print dimension diagnostics
        print(f"\n📊 DIMENSION ANALYSIS")
        print(f"{'─' * 70}")

        print(f"\nViewport: {dimensions['viewport']['width']}px x {dimensions['viewport']['height']}px")

        body = dimensions['body']
        print(f"\nBody:")
        print(f"  Client width:     {body['clientWidth']}px")
        print(f"  Scroll width:     {body['scrollWidth']}px")
        print(f"  Overflow:         {body['overflow']}px")

        if body['hasHorizontalScroll']:
            print(f"  ⚠️  HAS HORIZONTAL SCROLLBAR! ({body['overflow']}px overflow)")
        else:
            print(f"  ✅ No horizontal scrollbar")

        if dimensions['container']['clientWidth']:
            cont = dimensions['container']
            print(f"\nContainer:")
            print(f"  Client width:     {cont['clientWidth']}px")
            print(f"  Scroll width:     {cont['scrollWidth']}px")
            print(f"  Offset left:      {cont['offsetLeft']}px")
            if cont['hasHorizontalScroll']:
                overflow = cont['scrollWidth'] - cont['clientWidth']
                print(f"  ⚠️  Container overflow: {overflow}px")

        if dimensions['svg']['widthAttr']:
            svgdata = dimensions['svg']
            print(f"\nSVG:")
            print(f"  Width attribute:  {svgdata['widthAttr']}px")
            print(f"  Client width:     {svgdata['clientWidth']}px")
            print(f"  Offset left:      {svgdata['offsetLeft']}px")

            container_width = dimensions['container']['clientWidth']
            svg_width = float(svgdata['widthAttr'])
            width_diff = container_width - svg_width
            pct = (svg_width / container_width * 100) if container_width else 0
            print(f"  SVG/Container:    {pct:.2f}% ({width_diff:+.0f}px difference)")

        if dimensions['cardsContainer']['clientWidth']:
            cards = dimensions['cardsContainer']
            print(f"\nCards Container:")
            print(f"  Width style:      {cards['widthStyle']}")
            print(f"  Client width:     {cards['clientWidth']}px")
            print(f"  Offset left:      {cards['offsetLeft']}px")

        print(f"\nCard Positioning: ({dimensions['totalCards']} total cards)")

        if dimensions['leftmostCard']:
            left = dimensions['leftmostCard']
            print(f"\n  Leftmost Card:")
            print(f"    Event ID:       {left['id']}")
            print(f"    Offset left:    {left['left']}px")
            print(f"    Bounding left:  {left['boundingLeft']:.1f}px")
            if left['boundingLeft'] < 0:
                print(f"    ⚠️  Extends {abs(left['boundingLeft']):.1f}px off left edge!")

        if dimensions['rightmostCard']:
            right = dimensions['rightmostCard']
            container_width = dimensions['container']['clientWidth']
            overflow = right['right'] - container_width
            viewport_overflow = right['boundingRight'] - dimensions['viewport']['width']

            print(f"\n  Rightmost Card:")
            print(f"    Event ID:       {right['id']}")
            print(f"    Offset left:    {right['left']}px")
            print(f"    Card width:     {right['width']}px")
            print(f"    Right edge:     {right['right']}px (offset)")
            print(f"    Bounding right: {right['boundingRight']:.1f}px")
            print(f"    Container edge: {container_width}px")
            print(f"    Overflow:       {overflow:+.1f}px")

            if overflow > 0:
                print(f"    ⚠️  Card extends {overflow:.1f}px beyond container!")

            if viewport_overflow > 0:
                print(f"    ⚠️  Card extends {viewport_overflow:.1f}px beyond viewport!")

        page.close()

    # Summary across all viewports
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"Total console messages: {len(console_messages)}")
    print(f"Total errors: {len(errors)}")

    if errors:
        print("\n❌ ERRORS FOUND:")
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

    browser.close()
PYTHON_SCRIPT

# Run the test
echo "Running enhanced Playwright dimension test..."
"$PLAYWRIGHT_PYTHON" /tmp/check_timeline_dimensions.py
