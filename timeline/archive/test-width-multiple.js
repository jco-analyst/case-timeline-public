const { chromium } = require('playwright');

async function testViewport(width, height) {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width, height }
  });

  await page.goto('file:///media/jonathanco/Backup/s3s/timeline/index.html');
  await page.waitForTimeout(2000); // Wait for D3 to render

  const info = await page.evaluate(() => {
    const body = document.body;
    const container = document.querySelector('.container');
    const svg = document.querySelector('svg');

    if (!container || !svg) {
      return { error: 'Container or SVG not found' };
    }

    const bodyStyle = window.getComputedStyle(body);
    const containerStyle = window.getComputedStyle(container);

    return {
      viewport: window.innerWidth,
      bodyScrollWidth: body.scrollWidth,
      hasHorizontalScroll: body.scrollWidth > window.innerWidth,
      overflowAmount: body.scrollWidth - window.innerWidth,
      bodyPaddingLeft: parseFloat(bodyStyle.paddingLeft),
      bodyPaddingRight: parseFloat(bodyStyle.paddingRight),
      containerClientWidth: container.clientWidth,
      containerOffsetWidth: container.offsetWidth,
      containerScrollWidth: container.scrollWidth,
      containerPaddingLeft: parseFloat(containerStyle.paddingLeft),
      containerPaddingRight: parseFloat(containerStyle.paddingRight),
      svgWidth: parseFloat(svg.getAttribute('width')),
      svgActualWidth: svg.getBoundingClientRect().width
    };
  });

  await browser.close();
  return info;
}

(async () => {
  const viewports = [
    { width: 1920, height: 1080, name: 'Desktop HD' },
    { width: 1440, height: 900, name: 'Laptop' },
    { width: 1280, height: 800, name: 'Small Laptop' },
    { width: 1024, height: 768, name: 'Tablet' },
    { width: 800, height: 600, name: 'Small Screen' }
  ];

  console.log('=== TESTING MULTIPLE VIEWPORT SIZES ===\n');

  for (const vp of viewports) {
    const info = await testViewport(vp.width, vp.height);

    console.log(`${vp.name} (${vp.width}x${vp.height})`);
    console.log(`  Viewport: ${info.viewport}px`);
    console.log(`  Body scroll width: ${info.bodyScrollWidth}px`);
    console.log(`  Horizontal scroll: ${info.hasHorizontalScroll ? 'YES ⚠️' : 'NO ✓'}`);

    if (info.hasHorizontalScroll) {
      console.log(`  Overflow: +${info.overflowAmount.toFixed(1)}px`);

      // Detailed analysis
      const totalPadding = info.bodyPaddingLeft + info.bodyPaddingRight +
                          info.containerPaddingLeft + info.containerPaddingRight;
      const availableSpace = info.viewport - totalPadding;
      const svgOverflow = info.svgActualWidth - availableSpace;

      console.log(`\n  ANALYSIS:`);
      console.log(`    Body padding: ${info.bodyPaddingLeft + info.bodyPaddingRight}px`);
      console.log(`    Container padding: ${info.containerPaddingLeft + info.containerPaddingRight}px`);
      console.log(`    Total padding: ${totalPadding}px`);
      console.log(`    Container clientWidth: ${info.containerClientWidth}px (used for calc)`);
      console.log(`    SVG width (97% of clientWidth): ${info.svgWidth.toFixed(1)}px`);
      console.log(`    SVG actual width: ${info.svgActualWidth.toFixed(1)}px`);
      console.log(`    Available space: ${availableSpace}px`);
      console.log(`    SVG vs available: ${svgOverflow > 0 ? '+' : ''}${svgOverflow.toFixed(1)}px`);

      // The problem calculation
      const bodyContentWidth = info.viewport - (info.bodyPaddingLeft + info.bodyPaddingRight);
      const svgPlusContainerPadding = info.svgActualWidth + info.containerPaddingLeft + info.containerPaddingRight;
      const actualOverflow = svgPlusContainerPadding - bodyContentWidth;

      console.log(`\n  ROOT CAUSE:`);
      console.log(`    Body content width: ${bodyContentWidth}px`);
      console.log(`    SVG (${info.svgActualWidth.toFixed(1)}px) + container padding (${info.containerPaddingLeft + info.containerPaddingRight}px) = ${svgPlusContainerPadding.toFixed(1)}px`);
      console.log(`    Exceeds body content by: ${actualOverflow.toFixed(1)}px`);

      // Explain why this happens
      console.log(`\n  WHY THIS HAPPENS:`);
      console.log(`    1. container.clientWidth = ${info.containerClientWidth}px`);
      console.log(`       (This is body content width ${bodyContentWidth}px, but clientWidth with box-sizing: border-box`);
      console.log(`        already INCLUDES padding effect, so internal space is reduced)`);
      console.log(`    2. SVG = clientWidth * 0.97 = ${info.svgWidth.toFixed(1)}px`);
      console.log(`    3. But container has padding: 0 10px on OUTSIDE of SVG`);
      console.log(`    4. Total horizontal space = SVG + container padding = ${svgPlusContainerPadding.toFixed(1)}px`);
      console.log(`    5. This exceeds body content (${bodyContentWidth}px) by ${actualOverflow.toFixed(1)}px`);
    }

    console.log('');
  }

  console.log('\n=== CONCLUSION ===');
  console.log('The problem is NOT with the SVG width calculation itself (97% works).');
  console.log('The problem is that container.clientWidth is used, which with box-sizing: border-box');
  console.log('gives us the OUTER width including padding, but then container also has padding: 0 10px');
  console.log('that adds ADDITIONAL space around the SVG.');
  console.log('');
  console.log('SOLUTION OPTIONS:');
  console.log('1. Remove container padding: 0 10px (set to 0)');
  console.log('2. Calculate SVG width as: (clientWidth - containerPadding) * 0.97');
  console.log('3. Reduce SVG width multiplier from 0.97 to ~0.94-0.95');
  console.log('4. Use offsetWidth instead of clientWidth and account for padding');
})();
