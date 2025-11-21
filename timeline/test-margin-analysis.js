import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Set viewport to 1920x1080
  await page.setViewportSize({ width: 1920, height: 1080 });

  await page.goto('file://' + process.cwd() + '/index.html', { waitUntil: 'networkidle' });

  // Click "All Events" button to show all cards
  await page.click('button:has-text("All Events")');

  // Wait for timeline to render
  await page.waitForTimeout(2000);

  // Wait for cards to appear
  await page.waitForSelector('foreignObject', { timeout: 5000 }).catch(() => {
    console.log('Warning: No cards rendered');
  });

  // Analyze dimensions and scroll
  const analysis = await page.evaluate(() => {
    const results = {
      viewport: {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight
      },
      body: {
        clientWidth: document.body.clientWidth,
        scrollWidth: document.body.scrollWidth,
        offsetWidth: document.body.offsetWidth,
        paddingLeft: getComputedStyle(document.body).paddingLeft,
        paddingRight: getComputedStyle(document.body).paddingRight,
        hasScroll: document.body.scrollWidth > document.body.clientWidth
      },
      container: {},
      svg: {},
      cards: {
        leftmost: null,
        rightmost: null
      },
      margins: {},
      calculations: {}
    };

    const container = document.querySelector('.container');
    if (container) {
      results.container = {
        clientWidth: container.clientWidth,
        scrollWidth: container.scrollWidth,
        offsetWidth: container.offsetWidth,
        paddingLeft: getComputedStyle(container).paddingLeft,
        paddingRight: getComputedStyle(container).paddingRight,
        hasScroll: container.scrollWidth > container.clientWidth
      };
    }

    const svg = document.querySelector('svg');
    if (svg) {
      const svgWidth = parseFloat(svg.getAttribute('width'));
      const svgHeight = parseFloat(svg.getAttribute('height'));
      const bbox = svg.getBBox();

      results.svg = {
        attrWidth: svgWidth,
        attrHeight: svgHeight,
        clientWidth: svg.clientWidth,
        scrollWidth: svg.scrollWidth,
        offsetWidth: svg.offsetWidth,
        bboxX: bbox.x,
        bboxY: bbox.y,
        bboxWidth: bbox.width,
        bboxHeight: bbox.height,
        bboxRight: bbox.x + bbox.width
      };

      // Find timeline line to determine margins
      const timelineLine = svg.querySelector('.timeline-line');
      if (timelineLine) {
        results.margins = {
          left: parseFloat(timelineLine.getAttribute('x1')),
          right: svgWidth - parseFloat(timelineLine.getAttribute('x2'))
        };
      }
    }

    // Find leftmost and rightmost cards
    const cards = Array.from(document.querySelectorAll('foreignObject'));
    if (cards.length > 0) {
      let leftmost = null;
      let rightmost = null;

      cards.forEach(card => {
        const x = parseFloat(card.getAttribute('x'));
        const y = parseFloat(card.getAttribute('y'));
        const cardWidth = parseFloat(card.getAttribute('width')); // 280
        const leftEdge = x;
        const rightEdge = x + cardWidth;
        const centerX = x + cardWidth/2;
        const text = card.querySelector('.card-text')?.textContent.substring(0, 30) || 'Unknown';

        if (!leftmost || leftEdge < leftmost.leftEdge) {
          leftmost = { x: centerX, leftEdge, rightEdge, text };
        }
        if (!rightmost || rightEdge > rightmost.rightEdge) {
          rightmost = { x: centerX, leftEdge, rightEdge, text };
        }
      });

      results.cards.leftmost = leftmost;
      results.cards.rightmost = rightmost;
      results.cards.count = cards.length;
    }

    // Calculate expected values
    const CARD_WIDTH = 280;
    const containerWidth = container ? container.clientWidth : 0;
    const minMargin = CARD_WIDTH / 2 + 15; // 155px
    const expectedSvgWidth = containerWidth * 0.95;
    const expectedMarginLeft = Math.max(containerWidth * 0.015, minMargin);
    const expectedMarginRight = Math.max(containerWidth * 0.015, minMargin);

    results.calculations = {
      CARD_WIDTH,
      containerWidth,
      minMargin,
      expectedSvgWidth,
      expectedMarginLeft,
      expectedMarginRight,
      timelineStart: expectedMarginLeft,
      timelineEnd: expectedSvgWidth - expectedMarginRight,
      timelineWidth: (expectedSvgWidth - expectedMarginRight) - expectedMarginLeft
    };

    // Check if cards extend beyond SVG
    if (results.cards.leftmost && results.cards.rightmost) {
      results.overflowAnalysis = {
        leftCardExceedsSvg: results.cards.leftmost.leftEdge < 0,
        rightCardExceedsSvg: results.cards.rightmost.rightEdge > results.svg.attrWidth,
        leftCardExceedsTimeline: results.cards.leftmost.x < results.margins.left,
        rightCardExceedsTimeline: results.cards.rightmost.x > (results.svg.attrWidth - results.margins.right),
        leftCardLeftEdge: results.cards.leftmost.leftEdge,
        rightCardRightEdge: results.cards.rightmost.rightEdge,
        svgWidth: results.svg.attrWidth,
        excessOnRight: Math.max(0, results.cards.rightmost.rightEdge - results.svg.attrWidth)
      };
    }

    return results;
  });

  // Print analysis
  console.log('\n=== VIEWPORT & BODY ===');
  console.log(`Viewport width: ${analysis.viewport.innerWidth}px`);
  console.log(`Body clientWidth: ${analysis.body.clientWidth}px`);
  console.log(`Body scrollWidth: ${analysis.body.scrollWidth}px`);
  console.log(`Body padding: ${analysis.body.paddingLeft} / ${analysis.body.paddingRight}`);
  console.log(`Body has horizontal scroll: ${analysis.body.hasScroll ? 'YES ❌' : 'NO ✓'}`);

  console.log('\n=== CONTAINER ===');
  console.log(`Container clientWidth: ${analysis.container.clientWidth}px`);
  console.log(`Container scrollWidth: ${analysis.container.scrollWidth}px`);
  console.log(`Container padding: ${analysis.container.paddingLeft} / ${analysis.container.paddingRight}`);
  console.log(`Container has horizontal scroll: ${analysis.container.hasScroll ? 'YES ❌' : 'NO ✓'}`);

  console.log('\n=== SVG ===');
  console.log(`SVG attr width: ${analysis.svg.attrWidth}px`);
  console.log(`SVG clientWidth: ${analysis.svg.clientWidth}px`);
  console.log(`SVG bbox: x=${analysis.svg.bboxX.toFixed(0)} width=${analysis.svg.bboxWidth.toFixed(0)} right=${analysis.svg.bboxRight.toFixed(0)}`);

  console.log('\n=== MARGINS ===');
  console.log(`Margin left: ${analysis.margins.left}px`);
  console.log(`Margin right: ${analysis.margins.right}px`);
  console.log(`Timeline width: ${(analysis.svg.attrWidth - analysis.margins.left - analysis.margins.right).toFixed(0)}px`);

  console.log('\n=== CALCULATIONS ===');
  console.log(`CARD_WIDTH: ${analysis.calculations.CARD_WIDTH}px`);
  console.log(`minMargin: ${analysis.calculations.minMargin}px (CARD_WIDTH/2 + 15)`);
  console.log(`Container width: ${analysis.calculations.containerWidth}px`);
  console.log(`Expected SVG width: ${analysis.calculations.expectedSvgWidth}px (container * 0.95)`);
  console.log(`Expected margin left: ${analysis.calculations.expectedMarginLeft}px`);
  console.log(`Expected margin right: ${analysis.calculations.expectedMarginRight}px`);
  console.log(`Timeline span: ${analysis.calculations.timelineStart}px to ${analysis.calculations.timelineEnd}px`);
  console.log(`Timeline width: ${analysis.calculations.timelineWidth}px`);

  console.log('\n=== CARDS ===');
  console.log(`Total cards: ${analysis.cards.count}`);
  if (analysis.cards.leftmost) {
    console.log(`\nLeftmost card: "${analysis.cards.leftmost.text}"`);
    console.log(`  Center X: ${analysis.cards.leftmost.x.toFixed(0)}px`);
    console.log(`  Left edge: ${analysis.cards.leftmost.leftEdge.toFixed(0)}px`);
    console.log(`  Right edge: ${analysis.cards.leftmost.rightEdge.toFixed(0)}px`);
    console.log(`  Distance from margin.left: ${(analysis.cards.leftmost.x - analysis.margins.left).toFixed(0)}px`);
  }
  if (analysis.cards.rightmost) {
    console.log(`\nRightmost card: "${analysis.cards.rightmost.text}"`);
    console.log(`  Center X: ${analysis.cards.rightmost.x.toFixed(0)}px`);
    console.log(`  Left edge: ${analysis.cards.rightmost.leftEdge.toFixed(0)}px`);
    console.log(`  Right edge: ${analysis.cards.rightmost.rightEdge.toFixed(0)}px`);
    console.log(`  Distance to timeline end: ${((analysis.svg.attrWidth - analysis.margins.right) - analysis.cards.rightmost.x).toFixed(0)}px`);
  }

  if (analysis.overflowAnalysis) {
    console.log('\n=== OVERFLOW ANALYSIS ===');
    console.log(`Left card exceeds SVG bounds: ${analysis.overflowAnalysis.leftCardExceedsSvg ? 'YES ❌' : 'NO ✓'}`);
    console.log(`Right card exceeds SVG bounds: ${analysis.overflowAnalysis.rightCardExceedsSvg ? 'YES ❌' : 'NO ✓'}`);
    console.log(`Left card exceeds timeline start: ${analysis.overflowAnalysis.leftCardExceedsTimeline ? 'YES ❌' : 'NO ✓'}`);
    console.log(`Right card exceeds timeline end: ${analysis.overflowAnalysis.rightCardExceedsTimeline ? 'YES ❌' : 'NO ✓'}`);
    console.log(`\nLeft card left edge: ${analysis.overflowAnalysis.leftCardLeftEdge.toFixed(0)}px (should be >= 0)`);
    console.log(`Right card right edge: ${analysis.overflowAnalysis.rightCardRightEdge.toFixed(0)}px (should be <= ${analysis.svg.attrWidth})`);
    console.log(`Excess on right: ${analysis.overflowAnalysis.excessOnRight.toFixed(0)}px`);
  }

  console.log('\n=== ROOT CAUSE DIAGNOSIS ===');
  if (analysis.body.hasScroll || analysis.container.hasScroll) {
    console.log('❌ HORIZONTAL SCROLL DETECTED');
    console.log('\nPossible causes:');

    if (analysis.overflowAnalysis && analysis.overflowAnalysis.rightCardExceedsSvg) {
      console.log(`  1. RIGHT CARD OVERFLOW: Right card extends ${analysis.overflowAnalysis.excessOnRight.toFixed(0)}px beyond SVG width`);
      console.log(`     → Card right edge: ${analysis.overflowAnalysis.rightCardRightEdge.toFixed(0)}px`);
      console.log(`     → SVG width: ${analysis.svg.attrWidth}px`);
    }

    if (analysis.svg.attrWidth > analysis.container.clientWidth) {
      console.log(`  2. SVG TOO WIDE: SVG (${analysis.svg.attrWidth}px) > container (${analysis.container.clientWidth}px)`);
    }

    const minMarginReduction = 155 - 140; // Current vs just CARD_WIDTH/2
    console.log(`\n  RECOMMENDATION: Reduce minMargin from 155px to 140px (save ${minMarginReduction}px on each side = ${minMarginReduction * 2}px total)`);

    const svgWidthIncrease = analysis.container.clientWidth * 0.02; // 2% increase
    console.log(`  ALTERNATIVE: Keep minMargin at 155px but increase SVG width to 97% (gain ~${svgWidthIncrease.toFixed(0)}px)`);

  } else {
    console.log('✓ NO HORIZONTAL SCROLL - Timeline fits perfectly!');
  }

  await browser.close();
})();
