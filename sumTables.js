const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let grandTotal = 0;

  for (let seed = 45; seed <= 54; seed++) {
    await page.goto(`https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`);
    await page.waitForSelector("table");

    const sum = await page.$$eval("table td", cells =>
      cells
        .map(c => Number(c.innerText))
        .filter(n => !isNaN(n))
        .reduce((a,b) => a + b, 0)
    );

    grandTotal += sum;
  }

  console.log(grandTotal);

  await browser.close();
})();
