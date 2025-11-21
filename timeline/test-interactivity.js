const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('file:///media/jonathanco/Backup/s3s/timeline/index.html');

  // Wait for SVG to render
  await page.waitForSelector('svg');

  // Test clicking on a timeline dot
  const dots = await page.locator('.timeline-dot').all();
  console.log(`Total timeline dots: ${dots.length}`);

  if (dots.length > 0) {
    console.log('\nClicking on first timeline dot...');
    await dots[0].click();
    await page.waitForTimeout(500);

    // Check if side panel appears
    const sidePanel = await page.locator('[id*="side"][id*="panel"], .side-panel, #event-panel').count();
    console.log(`Side panel visible: ${sidePanel > 0}`);

    // Check if card gets highlight
    const highlightedCards = await page.locator('.event-card.highlight').count();
    console.log(`Highlighted cards: ${highlightedCards}`);
  }

  // Test clicking on an event card
  const cards = await page.locator('.event-card').all();
  console.log(`\nTotal event cards: ${cards.length}`);

  if (cards.length > 0) {
    console.log('Clicking on first event card...');
    await cards[0].click();
    await page.waitForTimeout(500);

    // Check if card gets highlight
    const highlightedCards = await page.locator('.event-card.highlight').count();
    console.log(`Highlighted cards: ${highlightedCards}`);
  }

  // Test hovering over a connector line
  const connectorLines = await page.locator('.connector-line').all();
  console.log(`\nTotal connector lines: ${connectorLines.length}`);

  if (connectorLines.length > 0) {
    console.log('Hovering over first connector line...');
    await connectorLines[0].hover();
    await page.waitForTimeout(300);

    // Check if connector gets highlighted
    const highlightedConnectors = await page.locator('.connector-line.highlighted').count();
    console.log(`Highlighted connectors: ${highlightedConnectors}`);
  }

  console.log('\n✅ Interactivity verification complete');
  await browser.close();
})();
