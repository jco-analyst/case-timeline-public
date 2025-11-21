const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  const logs = [];
  page.on('console', msg => {
    const text = msg.text();
    logs.push(text);
  });

  await page.goto('file:///media/jonathanco/Backup/s3s/timeline/index.html');
  await page.waitForTimeout(5000);

  // Wait for SVG to be rendered
  await page.waitForSelector('svg', { timeout: 10000 });

  const analysis = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    const cards = document.querySelectorAll('.event-card');

    if (!svg) {
      return { error: 'SVG not found' };
    }

    if (cards.length === 0) {
      return { error: `Cards not found. SVG exists but no .event-card elements rendered.` };
    }

    const svgWidth = parseFloat(svg.getAttribute('width'));
    const svgViewBox = svg.getAttribute('viewBox');

    // Extract margin values from the timeline
    const timelineLine = svg.querySelector('.timeline-line');
    const x1 = parseFloat(timelineLine.getAttribute('x1'));
    const x2 = parseFloat(timelineLine.getAttribute('x2'));

    const marginLeft = x1;
    const marginRight = svgWidth - x2;

    const cardPositions = [];
    cards.forEach((card, i) => {
      const leftStyle = card.style.left;
      if (leftStyle) {
        const cardWidth = 280; // CARD_WIDTH
        const cardLeft = parseFloat(leftStyle);
        const cardRight = cardLeft + cardWidth;
        const centerX = cardLeft + cardWidth / 2;

        cardPositions.push({
          index: i,
          centerX: centerX,
          left: cardLeft,
          right: cardRight,
          exceedsLeftBoundary: cardLeft < 0,
          exceedsRightBoundary: cardRight > svgWidth,
          exceedsLeftMargin: cardLeft < marginLeft,
          exceedsRightMargin: cardRight > (svgWidth - marginRight)
        });
      }
    });

    return {
      svgWidth,
      svgViewBox,
      marginLeft,
      marginRight,
      timelineStart: x1,
      timelineEnd: x2,
      effectiveWidth: x2 - x1,
      cardCount: cards.length,
      cardPositions
    };
  });

  if (analysis.error) {
    console.log(`ERROR: ${analysis.error}`);
    await browser.close();
    return;
  }

  console.log('=== SVG & CARD BOUNDARY ANALYSIS ===\n');
  console.log(`SVG width: ${analysis.svgWidth}px`);
  console.log(`SVG viewBox: ${analysis.svgViewBox || 'none'}`);
  console.log(`Margin left: ${analysis.marginLeft}px`);
  console.log(`Margin right: ${analysis.marginRight}px`);
  console.log(`Timeline start (x1): ${analysis.timelineStart}px`);
  console.log(`Timeline end (x2): ${analysis.timelineEnd}px`);
  console.log(`Effective timeline width: ${analysis.effectiveWidth}px`);
  console.log(`Total cards: ${analysis.cardCount}`);

  console.log(`\n=== CARD BOUNDARY VIOLATIONS ===\n`);

  const violations = analysis.cardPositions.filter(c =>
    c.exceedsLeftBoundary || c.exceedsRightBoundary ||
    c.exceedsLeftMargin || c.exceedsRightMargin
  );

  if (violations.length === 0) {
    console.log('✓ NO VIOLATIONS - All cards within boundaries');
  } else {
    console.log(`⚠️ FOUND ${violations.length} VIOLATIONS:\n`);

    violations.forEach(card => {
      console.log(`Card ${card.index}:`);
      console.log(`  Center: ${card.centerX.toFixed(1)}px`);
      console.log(`  Left edge: ${card.left.toFixed(1)}px`);
      console.log(`  Right edge: ${card.right.toFixed(1)}px`);

      if (card.exceedsLeftBoundary) {
        console.log(`  ⚠️ LEFT EDGE EXCEEDS SVG (< 0)`);
      }
      if (card.exceedsRightBoundary) {
        console.log(`  ⚠️ RIGHT EDGE EXCEEDS SVG (> ${analysis.svgWidth})`);
      }
      if (card.exceedsLeftMargin) {
        console.log(`  ⚠️ LEFT EDGE EXCEEDS MARGIN (< ${analysis.marginLeft})`);
      }
      if (card.exceedsRightMargin) {
        console.log(`  ⚠️ RIGHT EDGE EXCEEDS RIGHT MARGIN (> ${analysis.svgWidth - analysis.marginRight})`);
      }
      console.log('');
    });
  }

  // Check for cards that extend beyond the container
  const containerInfo = await page.evaluate(() => {
    const container = document.querySelector('.container');
    const svg = document.querySelector('svg');

    return {
      containerWidth: container.offsetWidth,
      svgWidth: parseFloat(svg.getAttribute('width')),
      svgOffsetWidth: svg.offsetWidth,
      containerPadding: {
        left: parseFloat(window.getComputedStyle(container).paddingLeft),
        right: parseFloat(window.getComputedStyle(container).paddingRight)
      }
    };
  });

  console.log(`\n=== CONTAINER VS SVG ===\n`);
  console.log(`Container width: ${containerInfo.containerWidth}px`);
  console.log(`Container padding: L=${containerInfo.containerPadding.left}px R=${containerInfo.containerPadding.right}px`);
  console.log(`Container content width: ${containerInfo.containerWidth - containerInfo.containerPadding.left - containerInfo.containerPadding.right}px`);
  console.log(`SVG width (attr): ${containerInfo.svgWidth}px`);
  console.log(`SVG offsetWidth: ${containerInfo.svgOffsetWidth}px`);

  if (containerInfo.svgWidth > (containerInfo.containerWidth - containerInfo.containerPadding.left - containerInfo.containerPadding.right)) {
    console.log(`\n⚠️ SVG (${containerInfo.svgWidth}px) EXCEEDS container content width!`);
  }

  // Look for rightmost card
  const rightmostCard = analysis.cardPositions.reduce((max, card) =>
    card.right > max.right ? card : max
  , analysis.cardPositions[0]);

  console.log(`\n=== RIGHTMOST CARD ===\n`);
  console.log(`Card ${rightmostCard.index}:`);
  console.log(`  Center: ${rightmostCard.centerX.toFixed(1)}px`);
  console.log(`  Right edge: ${rightmostCard.right.toFixed(1)}px`);
  console.log(`  Timeline end: ${analysis.timelineEnd}px`);
  console.log(`  SVG right margin boundary: ${analysis.svgWidth - analysis.marginRight}px`);
  console.log(`  Distance from timeline end: ${(analysis.timelineEnd - rightmostCard.right).toFixed(1)}px`);

  if (rightmostCard.right > analysis.timelineEnd) {
    console.log(`  ⚠️ Card extends ${(rightmostCard.right - analysis.timelineEnd).toFixed(1)}px beyond timeline end!`);
  }

  await browser.close();
})();
