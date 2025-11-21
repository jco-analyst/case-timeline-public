const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  await page.goto('file:///media/jonathanco/Backup/s3s/timeline/width-analysis.html');

  // Wait for analysis to complete
  await page.waitForTimeout(1000);

  // Extract debug information
  const debugInfo = await page.evaluate(() => {
    const debugDiv = document.getElementById('debug');
    return debugDiv ? debugDiv.innerText : 'Debug info not found';
  });

  console.log('=== WIDTH ANALYSIS ===\n');
  console.log(debugInfo);

  // Also check the actual timeline
  await page.goto('file:///media/jonathanco/Backup/s3s/timeline/index.html');
  await page.waitForTimeout(2000); // Wait for D3 to render

  const timelineInfo = await page.evaluate(() => {
    const body = document.body;
    const container = document.querySelector('.container');
    const svg = document.querySelector('svg');

    if (!container || !svg) {
      return { error: 'Container or SVG not found' };
    }

    return {
      viewport: window.innerWidth,
      bodyScrollWidth: body.scrollWidth,
      hasHorizontalScroll: body.scrollWidth > window.innerWidth,
      overflowAmount: body.scrollWidth - window.innerWidth,
      containerClientWidth: container.clientWidth,
      containerOffsetWidth: container.offsetWidth,
      containerPaddingLeft: parseFloat(window.getComputedStyle(container).paddingLeft),
      containerPaddingRight: parseFloat(window.getComputedStyle(container).paddingRight),
      svgWidth: parseFloat(svg.getAttribute('width')),
      svgActualWidth: svg.getBoundingClientRect().width,
      bodyPaddingLeft: parseFloat(window.getComputedStyle(body).paddingLeft),
      bodyPaddingRight: parseFloat(window.getComputedStyle(body).paddingRight)
    };
  });

  console.log('\n=== ACTUAL TIMELINE MEASUREMENTS ===\n');
  console.log(`Viewport width: ${timelineInfo.viewport}px`);
  console.log(`Body scroll width: ${timelineInfo.bodyScrollWidth}px`);
  console.log(`Horizontal scroll: ${timelineInfo.hasHorizontalScroll ? 'YES ⚠️' : 'NO ✓'}`);
  if (timelineInfo.hasHorizontalScroll) {
    console.log(`Overflow amount: +${timelineInfo.overflowAmount.toFixed(1)}px`);
  }
  console.log(`\nBody padding: L=${timelineInfo.bodyPaddingLeft}px R=${timelineInfo.bodyPaddingRight}px`);
  console.log(`Container padding: L=${timelineInfo.containerPaddingLeft}px R=${timelineInfo.containerPaddingRight}px`);
  console.log(`Container clientWidth: ${timelineInfo.containerClientWidth}px (used for calculation)`);
  console.log(`SVG width attribute: ${timelineInfo.svgWidth}px`);
  console.log(`SVG actual width: ${timelineInfo.svgActualWidth.toFixed(1)}px`);

  // Calculate the problem
  const totalPadding = timelineInfo.bodyPaddingLeft + timelineInfo.bodyPaddingRight +
                       timelineInfo.containerPaddingLeft + timelineInfo.containerPaddingRight;
  const availableSpace = timelineInfo.viewport - totalPadding;
  const svgOverflow = timelineInfo.svgActualWidth - availableSpace;

  console.log(`\n=== CALCULATION ===`);
  console.log(`Total padding: ${totalPadding}px`);
  console.log(`Available space: ${availableSpace}px`);
  console.log(`SVG actual width: ${timelineInfo.svgActualWidth.toFixed(1)}px`);
  if (svgOverflow > 0) {
    console.log(`SVG EXCEEDS AVAILABLE SPACE BY: ${svgOverflow.toFixed(1)}px ⚠️`);
  } else {
    console.log(`SVG fits within available space ✓`);
  }

  // Root cause analysis
  console.log(`\n=== ROOT CAUSE ===`);
  console.log(`1. Body content width = viewport - body padding`);
  console.log(`   = ${timelineInfo.viewport} - ${timelineInfo.bodyPaddingLeft + timelineInfo.bodyPaddingRight} = ${timelineInfo.viewport - timelineInfo.bodyPaddingLeft - timelineInfo.bodyPaddingRight}px`);
  console.log(`\n2. Container clientWidth (with box-sizing: border-box)`);
  console.log(`   = body content width (because max-width: 100%)`);
  console.log(`   = ${timelineInfo.containerClientWidth}px`);
  console.log(`   Note: clientWidth INCLUDES the effect of padding: 0 10px`);
  console.log(`\n3. SVG width = containerClientWidth * 0.97`);
  console.log(`   = ${timelineInfo.containerClientWidth} * 0.97 = ${timelineInfo.svgWidth}px`);
  console.log(`\n4. Problem: SVG (${timelineInfo.svgWidth}px) + container padding (${timelineInfo.containerPaddingLeft + timelineInfo.containerPaddingRight}px)`);
  console.log(`   = ${timelineInfo.svgWidth + timelineInfo.containerPaddingLeft + timelineInfo.containerPaddingRight}px`);
  console.log(`   But body content width is only ${timelineInfo.viewport - timelineInfo.bodyPaddingLeft - timelineInfo.bodyPaddingRight}px`);

  const expectedContainerContent = (timelineInfo.viewport - timelineInfo.bodyPaddingLeft - timelineInfo.bodyPaddingRight) - (timelineInfo.containerPaddingLeft + timelineInfo.containerPaddingRight);
  console.log(`\n5. Container should only have ${expectedContainerContent}px for content`);
  console.log(`   But SVG is ${timelineInfo.svgWidth}px`);
  console.log(`   Difference: ${(timelineInfo.svgWidth - expectedContainerContent).toFixed(1)}px overflow`);

  await browser.close();
})();
