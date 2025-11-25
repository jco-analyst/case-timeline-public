const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('file:///media/jonathanco/Backup/s3s/timeline/index.html');
  
  // Wait for SVG to render
  await page.waitForSelector('svg');
  
  // Check for track headers
  const trackHeaders = await page.locator('.track-header').count();
  console.log(`Track headers found: ${trackHeaders}`);
  
  // Check for timeline lines
  const timelineLines = await page.locator('.timeline-line').count();
  console.log(`Timeline lines found: ${timelineLines}`);
  
  // Get dimensions of timeline lines to verify they're at different Y positions
  const lines = await page.locator('.timeline-line').all();
  for (let i = 0; i < lines.length; i++) {
    const y1 = await lines[i].getAttribute('y1');
    const y2 = await lines[i].getAttribute('y2');
    console.log(`Timeline line ${i + 1}: y1=${y1}, y2=${y2}`);
  }
  
  // Check for timeline dots
  const timelineDots = await page.locator('.timeline-dot').count();
  console.log(`Timeline dots found: ${timelineDots}`);
  
  // Get a sample of dot positions
  const dots = await page.locator('.timeline-dot').all();
  for (let i = 0; i < Math.min(3, dots.length); i++) {
    const cy = await dots[i].getAttribute('cy');
    console.log(`Timeline dot ${i + 1}: cy=${cy}`);
  }
  
  // Check for connector lines
  const connectorLines = await page.locator('.connector-line').count();
  console.log(`Connector lines found: ${connectorLines}`);
  
  await browser.close();
  console.log('\n✅ Swim lane visual verification complete');
})();
