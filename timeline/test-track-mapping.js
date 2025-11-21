const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Intercept console logs to capture debug output
  const consoleLogs = [];
  page.on('console', (msg) => {
    if (msg.text().includes('convergenceTrack') || msg.text().includes('viewportEvents')) {
      consoleLogs.push(msg.text());
    }
  });

  await page.goto('file:///media/jonathanco/Backup/s3s/timeline/index.html');

  // Wait for SVG to render
  await page.waitForSelector('svg');

  // Get viewport events data by examining the rendered dots and their event data
  const eventMapping = await page.evaluate(() => {
    // Try to access global timelineEvents if available
    if (typeof timelineEvents !== 'undefined') {
      return timelineEvents.slice(0, 10).map(e => ({
        text: e.text.substring(0, 40),
        convergenceTrack: e.convergenceTrack
      }));
    }
    return null;
  });

  console.log('First 10 events from timelineEvents:');
  if (eventMapping) {
    eventMapping.forEach((e, i) => {
      console.log(`  ${i + 1}. Track ${e.convergenceTrack}: ${e.text}`);
    });
  } else {
    console.log('  (Could not access timelineEvents)');
  }

  // Verify dots are in correct swim lanes
  const trackPositions = {
    1: 186.67,
    2: 400.00,
    3: 613.33
  };

  const dotInfo = await page.evaluate((positions) => {
    const dots = [];
    document.querySelectorAll('.timeline-dot').forEach((dot, idx) => {
      const cy = parseFloat(dot.getAttribute('cy'));
      const track = Object.entries(positions).find(([t, y]) => Math.abs(cy - y) < 1)?.[0];
      dots.push({
        eventId: dot.getAttribute('data-event-id'),
        cy: cy.toFixed(2),
        track: track || 'unknown'
      });
    });
    return dots;
  }, trackPositions);

  console.log('\nTimeline dots and their swim lane assignments:');
  dotInfo.forEach((dot, i) => {
    console.log(`  ${i + 1}. ${dot.eventId}: Y=${dot.cy}, Track=${dot.track}`);
  });

  // Verify track headers exist
  const headerInfo = await page.evaluate(() => {
    const headers = [];
    document.querySelectorAll('.track-header').forEach((header) => {
      headers.push({
        y: header.getAttribute('y'),
        text: header.textContent
      });
    });
    return headers;
  });

  console.log('\nTrack headers found:');
  headerInfo.forEach((h, i) => {
    console.log(`  ${i + 1}. ${h.text}`);
  });

  // Verify connector lines connect to correct timeline dots
  const connectorInfo = await page.evaluate(() => {
    const connectors = [];
    const dotsByEventId = {};
    document.querySelectorAll('.timeline-dot').forEach(dot => {
      const eventId = dot.getAttribute('data-event-id');
      dotsByEventId[eventId] = {
        cy: parseFloat(dot.getAttribute('cy'))
      };
    });

    document.querySelectorAll('.connector-line').forEach((line, idx) => {
      const eventId = line.getAttribute('data-event-id');
      const y1 = parseFloat(line.getAttribute('y1'));
      const y2 = parseFloat(line.getAttribute('y2'));
      const dotY = dotsByEventId[eventId]?.cy;
      connectors.push({
        eventId,
        y1: y1.toFixed(2),
        y2: y2.toFixed(2),
        matchesDot: dotY !== undefined && Math.abs(y1 - dotY) < 1
      });
    });
    return connectors;
  });

  console.log('\nConnector lines (first 5):');
  connectorInfo.slice(0, 5).forEach((c, i) => {
    console.log(`  ${i + 1}. ${c.eventId}: y1=${c.y1}, y2=${c.y2}, starts at dot=${c.matchesDot}`);
  });

  await browser.close();
  console.log('\n✅ Track mapping verification complete');
})();
