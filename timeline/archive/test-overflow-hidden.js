const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  await page.goto('file:///media/jonathanco/Backup/s3s/timeline/index.html');
  await page.waitForTimeout(2000);

  const info = await page.evaluate(() => {
    const body = document.body;
    const container = document.querySelector('.container');
    const svg = document.querySelector('svg');
    const bodyStyle = window.getComputedStyle(body);
    const containerStyle = window.getComputedStyle(container);

    return {
      // Overflow settings
      bodyOverflowX: bodyStyle.overflowX,

      // Dimensions
      viewport: window.innerWidth,
      bodyClientWidth: body.clientWidth,
      bodyScrollWidth: body.scrollWidth,
      bodyOffsetWidth: body.offsetWidth,

      // Body padding
      bodyPaddingLeft: parseFloat(bodyStyle.paddingLeft),
      bodyPaddingRight: parseFloat(bodyStyle.paddingRight),

      // Container
      containerClientWidth: container.clientWidth,
      containerScrollWidth: container.scrollWidth,
      containerOffsetWidth: container.offsetWidth,
      containerPaddingLeft: parseFloat(containerStyle.paddingLeft),
      containerPaddingRight: parseFloat(containerStyle.paddingRight),

      // SVG
      svgWidth: parseFloat(svg.getAttribute('width')),
      svgClientWidth: svg.clientWidth,
      svgOffsetWidth: svg.offsetWidth,
      svgBoundingWidth: svg.getBoundingClientRect().width,

      // Check if content is actually wider than viewport
      contentOverflows: body.scrollWidth > window.innerWidth
    };
  });

  console.log('=== OVERFLOW-X: HIDDEN ANALYSIS ===\n');
  console.log(`Body overflow-x: ${info.bodyOverflowX}`);
  console.log(`\nDIMENSIONS:`);
  console.log(`  Viewport: ${info.viewport}px`);
  console.log(`  Body clientWidth: ${info.bodyClientWidth}px`);
  console.log(`  Body scrollWidth: ${info.bodyScrollWidth}px`);
  console.log(`  Body offsetWidth: ${info.bodyOffsetWidth}px`);

  console.log(`\nCONTENT OVERFLOW CHECK:`);
  if (info.contentOverflows) {
    console.log(`  ⚠️ YES - Content (${info.bodyScrollWidth}px) exceeds viewport (${info.viewport}px)`);
    console.log(`  Overflow amount: ${info.bodyScrollWidth - info.viewport}px`);
    console.log(`  Scrollbar is HIDDEN by overflow-x: hidden, but content is clipped!`);
  } else {
    console.log(`  ✓ NO - Content fits within viewport`);
  }

  console.log(`\nBODY PADDING:`);
  console.log(`  Left: ${info.bodyPaddingLeft}px`);
  console.log(`  Right: ${info.bodyPaddingRight}px`);
  console.log(`  Total: ${info.bodyPaddingLeft + info.bodyPaddingRight}px`);
  console.log(`  Body content width: ${info.viewport - info.bodyPaddingLeft - info.bodyPaddingRight}px`);

  console.log(`\nCONTAINER:`);
  console.log(`  clientWidth: ${info.containerClientWidth}px (used for SVG calc)`);
  console.log(`  scrollWidth: ${info.containerScrollWidth}px`);
  console.log(`  offsetWidth: ${info.containerOffsetWidth}px`);
  console.log(`  padding: L=${info.containerPaddingLeft}px R=${info.containerPaddingRight}px`);

  console.log(`\nSVG:`);
  console.log(`  width attribute: ${info.svgWidth}px`);
  console.log(`  clientWidth: ${info.svgClientWidth}px`);
  console.log(`  offsetWidth: ${info.svgOffsetWidth}px`);
  console.log(`  getBoundingClientRect: ${info.svgBoundingWidth}px`);

  // Calculate the actual space consumption
  const bodyContentWidth = info.viewport - info.bodyPaddingLeft - info.bodyPaddingRight;
  const svgPlusContainerPadding = info.svgWidth + info.containerPaddingLeft + info.containerPaddingRight;

  console.log(`\n=== SPACE CALCULATION ===`);
  console.log(`Body content width: ${bodyContentWidth}px`);
  console.log(`SVG width: ${info.svgWidth}px`);
  console.log(`Container padding: ${info.containerPaddingLeft + info.containerPaddingRight}px`);
  console.log(`Total needed: ${svgPlusContainerPadding}px`);

  if (svgPlusContainerPadding > bodyContentWidth) {
    console.log(`\n⚠️ PROBLEM IDENTIFIED:`);
    console.log(`  Total needed (${svgPlusContainerPadding}px) > Body content (${bodyContentWidth}px)`);
    console.log(`  Exceeds by: ${svgPlusContainerPadding - bodyContentWidth}px`);
    console.log(`  This content is being CLIPPED by overflow-x: hidden`);
  }

  // Test what happens if we remove overflow-x: hidden
  console.log(`\n=== TESTING WITHOUT overflow-x: hidden ===`);

  await page.evaluate(() => {
    document.body.style.overflowX = 'auto';
  });

  await page.waitForTimeout(500);

  const infoWithoutHidden = await page.evaluate(() => {
    const body = document.body;
    return {
      bodyOverflowX: window.getComputedStyle(body).overflowX,
      bodyClientWidth: body.clientWidth,
      bodyScrollWidth: body.scrollWidth,
      hasScrollbar: body.scrollWidth > body.clientWidth
    };
  });

  console.log(`  Body overflow-x: ${infoWithoutHidden.bodyOverflowX}`);
  console.log(`  Body clientWidth: ${infoWithoutHidden.bodyClientWidth}px`);
  console.log(`  Body scrollWidth: ${infoWithoutHidden.bodyScrollWidth}px`);
  console.log(`  Has scrollbar: ${infoWithoutHidden.hasScrollbar ? 'YES ⚠️' : 'NO ✓'}`);

  if (infoWithoutHidden.hasScrollbar) {
    console.log(`\n⚠️ CONFIRMED: Removing overflow-x: hidden reveals a horizontal scrollbar!`);
    console.log(`  Overflow: ${infoWithoutHidden.bodyScrollWidth - infoWithoutHidden.bodyClientWidth}px`);
  }

  await browser.close();

  console.log(`\n=== CONCLUSION ===`);
  console.log(`The horizontal scrollbar is HIDDEN by 'overflow-x: hidden' on body (line 70).`);
  console.log(`However, content DOES overflow the viewport and is being clipped.`);
  console.log(`This is likely why you see boundary-aware positioning issues -`);
  console.log(`cards near the right edge are being clipped/cut off!`);
})();
