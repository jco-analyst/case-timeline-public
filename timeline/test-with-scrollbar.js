const { chromium } = require('playwright');

(async () => {
  // Test with headed browser to see actual scrollbars
  const browser = await chromium.launch({
    headless: false,
    args: ['--force-device-scale-factor=1']  // Disable scaling
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1
  });

  const page = await context.newPage();

  await page.goto('file:///media/jonathanco/Backup/s3s/timeline/index.html');
  await page.waitForTimeout(2000);

  // Check if horizontal scrollbar exists
  const scrollInfo = await page.evaluate(() => {
    const body = document.body;
    const container = document.querySelector('.container');
    const svg = document.querySelector('svg');

    // Check for actual scrollbar visibility
    const hasHorizontalScrollbar = body.scrollWidth > body.clientWidth;
    const hasVerticalScrollbar = body.scrollHeight > body.clientHeight;

    // Get computed overflow styles
    const bodyStyle = window.getComputedStyle(body);
    const containerStyle = window.getComputedStyle(container);

    return {
      // Viewport
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,

      // Body
      bodyClientWidth: body.clientWidth,
      bodyScrollWidth: body.scrollWidth,
      bodyOffsetWidth: body.offsetWidth,
      bodyOverflowX: bodyStyle.overflowX,
      hasHorizontalScrollbar,
      hasVerticalScrollbar,

      // Scrollbar width calculation
      scrollbarWidth: window.innerWidth - body.clientWidth,

      // Container
      containerClientWidth: container.clientWidth,
      containerScrollWidth: container.scrollWidth,
      containerOffsetWidth: container.offsetWidth,
      containerPaddingLeft: parseFloat(containerStyle.paddingLeft),
      containerPaddingRight: parseFloat(containerStyle.paddingRight),

      // SVG
      svgWidth: parseFloat(svg.getAttribute('width')),
      svgClientWidth: svg.clientWidth,
      svgBoundingWidth: svg.getBoundingClientRect().width
    };
  });

  console.log('=== SCROLLBAR ANALYSIS ===\n');
  console.log(`Window inner size: ${scrollInfo.innerWidth}x${scrollInfo.innerHeight}`);
  console.log(`\nBody dimensions:`);
  console.log(`  clientWidth: ${scrollInfo.bodyClientWidth}px`);
  console.log(`  scrollWidth: ${scrollInfo.bodyScrollWidth}px`);
  console.log(`  offsetWidth: ${scrollInfo.bodyOffsetWidth}px`);
  console.log(`  overflow-x: ${scrollInfo.bodyOverflowX}`);
  console.log(`\nScrollbars:`);
  console.log(`  Horizontal: ${scrollInfo.hasHorizontalScrollbar ? 'YES ⚠️' : 'NO ✓'}`);
  console.log(`  Vertical: ${scrollInfo.hasVerticalScrollbar ? 'YES' : 'NO'}`);
  console.log(`  Calculated scrollbar width: ${scrollInfo.scrollbarWidth}px`);

  if (scrollInfo.hasHorizontalScrollbar) {
    console.log(`\n⚠️ HORIZONTAL SCROLLBAR DETECTED`);
    console.log(`  Overflow: ${scrollInfo.bodyScrollWidth - scrollInfo.bodyClientWidth}px`);
  }

  console.log(`\nContainer:`);
  console.log(`  clientWidth: ${scrollInfo.containerClientWidth}px (used for SVG calc)`);
  console.log(`  scrollWidth: ${scrollInfo.containerScrollWidth}px`);
  console.log(`  padding: L=${scrollInfo.containerPaddingLeft}px R=${scrollInfo.containerPaddingRight}px`);

  console.log(`\nSVG:`);
  console.log(`  width attribute: ${scrollInfo.svgWidth}px`);
  console.log(`  clientWidth: ${scrollInfo.svgClientWidth}px`);
  console.log(`  getBoundingClientRect: ${scrollInfo.svgBoundingWidth}px`);

  // The key insight
  console.log(`\n=== KEY INSIGHT ===`);
  if (scrollInfo.hasVerticalScrollbar && scrollInfo.scrollbarWidth > 0) {
    console.log(`Vertical scrollbar takes up ${scrollInfo.scrollbarWidth}px of horizontal space!`);
    console.log(`This reduces body.clientWidth from ${scrollInfo.innerWidth}px to ${scrollInfo.bodyClientWidth}px`);
    console.log(`But container.clientWidth calculation might not account for this...`);

    // Check if this causes the overflow
    const effectiveViewport = scrollInfo.innerWidth - scrollInfo.scrollbarWidth;
    console.log(`\nEffective viewport (minus scrollbar): ${effectiveViewport}px`);
    console.log(`Container scroll width: ${scrollInfo.containerScrollWidth}px`);

    if (scrollInfo.containerScrollWidth > effectiveViewport) {
      console.log(`⚠️ Container content (${scrollInfo.containerScrollWidth}px) exceeds effective viewport (${effectiveViewport}px)`);
    }
  }

  // Take screenshot
  await page.screenshot({ path: '/media/jonathanco/Backup/s3s/timeline/scrollbar-test.png', fullPage: false });
  console.log('\nScreenshot saved to: scrollbar-test.png');

  console.log('\nBrowser window will stay open for 10 seconds for manual inspection...');
  await page.waitForTimeout(10000);

  await browser.close();
})();
