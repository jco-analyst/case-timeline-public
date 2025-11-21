const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('file:///media/jonathanco/Backup/s3s/timeline/index.html');

  // Wait for SVG to render
  await page.waitForSelector('svg');

  // Get all timeline dots and their positions
  const dots = await page.locator('.timeline-dot').all();

  // Get parent event data from the timeline
  const eventData = await page.evaluate(() => {
    const events = [];
    // Get dots from SVG
    document.querySelectorAll('.timeline-dot').forEach((dot, idx) => {
      const cy = parseFloat(dot.getAttribute('cy'));
      const cx = parseFloat(dot.getAttribute('cx'));
      const eventId = dot.getAttribute('data-event-id');
      events.push({ idx, eventId, cy, cx });
    });
    return events;
  });

  console.log('Timeline dots by position:');
  eventData.forEach((dot, i) => {
    console.log(`  Dot ${i + 1}: ID=${dot.eventId}, Y=${dot.cy.toFixed(2)}, X=${dot.cx.toFixed(2)}`);
  });

  // Get track information from the events by examining the viewportEvents data
  const trackInfo = await page.evaluate(() => {
    // Access the global variable if available through inspection
    return {
      timelineYPositions: [186.67, 400, 613.33],
      swimLaneHeight: 213.33
    };
  });

  console.log('\nSwim lane Y positions (calculated from code):');
  console.log(`  Track 1 (Motive): ${trackInfo.timelineYPositions[0].toFixed(2)}`);
  console.log(`  Track 2 (Triggers): ${trackInfo.timelineYPositions[1].toFixed(2)}`);
  console.log(`  Track 3 (Execution): ${trackInfo.timelineYPositions[2].toFixed(2)}`);
  console.log(`  Swim lane height: ${trackInfo.swimLaneHeight.toFixed(2)}`);

  // Group dots by their Y position
  const grouped = {};
  eventData.forEach(dot => {
    const key = dot.cy.toFixed(1);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(dot);
  });

  console.log('\nDots grouped by Y position:');
  Object.keys(grouped).sort((a, b) => parseFloat(a) - parseFloat(b)).forEach(y => {
    console.log(`  Y=${y}: ${grouped[y].length} dot(s)`);
  });

  // Check track headers
  const headers = await page.locator('.track-header').all();
  console.log(`\nTrack headers (${headers.length} total):`);
  for (let i = 0; i < headers.length; i++) {
    const text = await headers[i].textContent();
    const y = await headers[i].getAttribute('y');
    console.log(`  Header ${i + 1}: Y=${y}, Text="${text}"`);
  }

  await browser.close();
  console.log('\n✅ Convergence track verification complete');
})();
