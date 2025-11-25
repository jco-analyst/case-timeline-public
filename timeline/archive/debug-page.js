const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  page.on('console', msg => console.log('[CONSOLE]', msg.text()));
  page.on('pageerror', err => console.log('[ERROR]', err.message));

  await page.goto('file:///media/jonathanco/Backup/s3s/timeline/index.html');
  await page.waitForTimeout(5000);

  const pageInfo = await page.evaluate(() => {
    return {
      title: document.title,
      bodyChildren: document.body.children.length,
      hasSVG: !!document.querySelector('svg'),
      hasContainer: !!document.querySelector('.container'),
      hasTimeline: !!document.querySelector('#timeline-container'),
      svgCount: document.querySelectorAll('svg').length,
      cardCount: document.querySelectorAll('.card-container').length,
      d3Loaded: typeof d3 !== 'undefined'
    };
  });

  console.log('Page info:', pageInfo);

  if (!pageInfo.hasContainer) {
    console.log('Container not found! Checking body structure...');
    const bodyHTML = await page.evaluate(() => document.body.innerHTML.substring(0, 500));
    console.log('Body HTML (first 500 chars):', bodyHTML);
  }

  await browser.close();
})();
