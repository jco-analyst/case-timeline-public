const { chromium } = require('playwright');

async function testWithZoom(zoomLevel) {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  // Set zoom level via CDP
  const client = await page.context().newCDPSession(page);
  await client.send('Emulation.setPageScaleFactor', { pageScaleFactor: zoomLevel });

  await page.goto('file:///media/jonathanco/Backup/s3s/timeline/index.html');
  await page.waitForTimeout(2000);

  const info = await page.evaluate(() => {
    const body = document.body;
    const container = document.querySelector('.container');
    const svg = document.querySelector('svg');

    return {
      viewport: window.innerWidth,
      zoom: window.devicePixelRatio,
      bodyScrollWidth: body.scrollWidth,
      bodyClientWidth: body.clientWidth,
      hasOverflow: body.scrollWidth > window.innerWidth,
      containerClientWidth: container.clientWidth,
      svgWidth: parseFloat(svg.getAttribute('width')),
      svgBoundingWidth: svg.getBoundingClientRect().width
    };
  });

  await browser.close();
  return info;
}

(async () => {
  const zoomLevels = [0.75, 0.9, 1.0, 1.1, 1.25, 1.5];

  console.log('=== TESTING DIFFERENT ZOOM LEVELS ===\n');

  for (const zoom of zoomLevels) {
    console.log(`Zoom: ${(zoom * 100).toFixed(0)}%`);
    const info = await testWithZoom(zoom);

    console.log(`  Viewport: ${info.viewport}px`);
    console.log(`  Body scrollWidth: ${info.bodyScrollWidth}px`);
    console.log(`  Has overflow: ${info.hasOverflow ? 'YES ⚠️' : 'NO ✓'}`);

    if (info.hasOverflow) {
      console.log(`  Overflow amount: ${info.bodyScrollWidth - info.viewport}px`);
      console.log(`  Container clientWidth: ${info.containerClientWidth}px`);
      console.log(`  SVG width: ${info.svgWidth}px`);
    }
    console.log('');
  }
})();
