#!/bin/bash
# Diagnostic test to identify which element causes horizontal overflow

TIMELINE_PATH="file:///media/jonathanco/Backup/s3s/timeline/index.html"
PLAYWRIGHT_PYTHON="$HOME/.local/share/pipx/venvs/playwright/bin/python"

cat > /tmp/overflow_diagnostic.py << 'PYTHON_SCRIPT'
from playwright.sync_api import sync_playwright

timeline_path = "file:///media/jonathanco/Backup/s3s/timeline/index.html"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)  # Keep visible
    page = browser.new_page(viewport={"width": 1920, "height": 1080})
    
    print("Loading timeline...")
    page.goto(timeline_path)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1000)
    
    # Check each element one by one
    result = page.evaluate("""
    () => {
        const elements = [
            { name: 'body', el: document.body },
            { name: '.container', el: document.querySelector('.container') },
            { name: '#timeline-container', el: document.querySelector('#timeline-container') },
            { name: 'svg', el: document.querySelector('svg') },
            { name: '.cards-container', el: document.querySelector('.cards-container') }
        ];
        
        const results = [];
        
        elements.forEach(item => {
            if (item.el) {
                const scrollWidth = item.el.scrollWidth;
                const clientWidth = item.el.clientWidth;
                const offsetWidth = item.el.offsetWidth;
                const overflow = scrollWidth - clientWidth;
                const hasScroll = overflow > 0;
                
                const computedStyle = window.getComputedStyle(item.el);
                const overflowX = computedStyle.overflowX;
                const position = computedStyle.position;
                
                results.push({
                    name: item.name,
                    scrollWidth: scrollWidth,
                    clientWidth: clientWidth,
                    offsetWidth: offsetWidth,
                    overflow: overflow,
                    hasScroll: hasScroll,
                    overflowX: overflowX,
                    position: position
                });
            }
        });
        
        return results;
    }
    """)
    
    print("\n" + "="*70)
    print("OVERFLOW DIAGNOSTIC - CHECKING EACH ELEMENT")
    print("="*70)
    
    for item in result:
        print(f"\n{item['name']}:")
        print(f"  scrollWidth:  {item['scrollWidth']}px")
        print(f"  clientWidth:  {item['clientWidth']}px")
        print(f"  offsetWidth:  {item['offsetWidth']}px")
        print(f"  overflow:     {item['overflow']:+}px")
        print(f"  overflow-x:   {item['overflowX']}")
        print(f"  position:     {item['position']}")
        
        if item['hasScroll'] and item['overflow'] > 0:
            print(f"  🔴 THIS ELEMENT HAS OVERFLOW! ({item['overflow']}px)")
        else:
            print(f"  ✅ No overflow")
    
    print("\n" + "="*70)
    print("Press Enter to close browser...")
    input()
    
    browser.close()
PYTHON_SCRIPT

"$PLAYWRIGHT_PYTHON" /tmp/overflow_diagnostic.py
