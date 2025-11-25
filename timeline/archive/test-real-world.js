const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false  // Open real browser
  });

  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  await page.goto('file:///media/jonathanco/Backup/s3s/timeline/index.html');
  await page.waitForTimeout(2000);

  // Inject debugging overlay
  await page.evaluate(() => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0,0,0,0.9);
      color: white;
      padding: 15px;
      font-family: monospace;
      font-size: 11px;
      z-index: 10000;
      border-radius: 5px;
      max-width: 350px;
    `;

    function updateInfo() {
      const body = document.body;
      const container = document.querySelector('.container');
      const svg = document.querySelector('svg');

      if (!svg) {
        overlay.innerHTML = 'SVG not found';
        return;
      }

      const bodyStyle = window.getComputedStyle(body);
      const containerStyle = window.getComputedStyle(container);

      const viewport = window.innerWidth;
      const bodyPaddingH = parseFloat(bodyStyle.paddingLeft) + parseFloat(bodyStyle.paddingRight);
      const containerPaddingH = parseFloat(containerStyle.paddingLeft) + parseFloat(containerStyle.paddingRight);
      const svgWidth = parseFloat(svg.getAttribute('width'));

      const bodyContentWidth = viewport - bodyPaddingH;
      const availableForSVG = bodyContentWidth - containerPaddingH;
      const svgOverflow = svgWidth - availableForSVG;

      const hasScrollbar = body.scrollWidth > viewport;

      overlay.innerHTML = `
        <div style="font-weight:bold;margin-bottom:10px">WIDTH DEBUG OVERLAY</div>
        <div>Viewport: ${viewport}px</div>
        <div>Body scrollWidth: ${body.scrollWidth}px</div>
        <div style="color: ${hasScrollbar ? '#ff6b6b' : '#51cf66'}">
          Scrollbar: ${hasScrollbar ? 'YES ⚠️' : 'NO ✓'}
        </div>
        <div style="margin-top:8px;padding-top:8px;border-top:1px solid #444">
          Body padding: ${bodyPaddingH}px<br>
          Container padding: ${containerPaddingH}px<br>
          Total padding: ${bodyPaddingH + containerPaddingH}px
        </div>
        <div style="margin-top:8px;padding-top:8px;border-top:1px solid #444">
          Body content: ${bodyContentWidth}px<br>
          Available for SVG: ${availableForSVG}px<br>
          SVG width: ${svgWidth.toFixed(1)}px
        </div>
        <div style="margin-top:8px;padding-top:8px;border-top:1px solid #444;color: ${svgOverflow > 0 ? '#ff6b6b' : '#51cf66'}">
          ${svgOverflow > 0 ? '⚠️ OVERFLOW: +' + svgOverflow.toFixed(1) + 'px' : '✓ Fits: -' + Math.abs(svgOverflow).toFixed(1) + 'px margin'}
        </div>
        <div style="margin-top:8px;padding-top:8px;border-top:1px solid #444;font-size:10px">
          Container clientWidth: ${container.clientWidth}px<br>
          SVG = clientWidth × 0.97 = ${svgWidth.toFixed(1)}px
        </div>
        <div style="margin-top:8px;font-size:9px;color:#888">
          Resize window to test different widths
        </div>
      `;
    }

    updateInfo();
    window.addEventListener('resize', updateInfo);
    window.addEventListener('scroll', updateInfo);

    document.body.appendChild(overlay);
  });

  console.log('Browser opened with debug overlay.');
  console.log('Resize the window to see when horizontal scrollbar appears.');
  console.log('Press Ctrl+C to close browser.');

  // Keep browser open
  await page.waitForTimeout(300000); // 5 minutes
  await browser.close();
})();
