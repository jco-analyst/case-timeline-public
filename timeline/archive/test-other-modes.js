const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('file:///media/jonathanco/Backup/s3s/timeline/index.html');

  // Wait for SVG to render
  await page.waitForSelector('svg');

  // Get initial state (overview mode)
  let initialLines = await page.locator('.timeline-line').count();
  let initialHeaders = await page.locator('.track-header').count();
  console.log('Overview mode:');
  console.log(`  Timeline lines: ${initialLines}`);
  console.log(`  Track headers: ${initialHeaders}`);

  // Click on Family filter button (using data-view attribute)
  const familyBtn = page.locator('button[data-view="family"]');
  if (await familyBtn.count() > 0) {
    await familyBtn.click();

    // Wait for re-render
    await page.waitForTimeout(500);

    const familyLines = await page.locator('.timeline-line').count();
    const familyHeaders = await page.locator('.track-header').count();
    console.log('\nFamily mode:');
    console.log(`  Timeline lines: ${familyLines} (should be 1)`);
    console.log(`  Track headers: ${familyHeaders} (should be 0)`);

    // Verify single timeline line has correct Y position (center)
    const lines = await page.locator('.timeline-line').all();
    if (lines.length === 1) {
      const y1 = await lines[0].getAttribute('y1');
      console.log(`  Timeline line Y1: ${y1}`);
    }
  }

  // Click back to Overview
  const overviewBtn = page.locator('button[data-view="overview"]');
  if (await overviewBtn.count() > 0) {
    await overviewBtn.click();

    // Wait for re-render
    await page.waitForTimeout(500);

    const finalLines = await page.locator('.timeline-line').count();
    const finalHeaders = await page.locator('.track-header').count();
    console.log('\nBack to Overview mode:');
    console.log(`  Timeline lines: ${finalLines} (should be 3)`);
    console.log(`  Track headers: ${finalHeaders} (should be 3)`);
  }

  await browser.close();
  console.log('\n✅ Mode switching verification complete');
})();
