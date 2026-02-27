const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let grandTotal = 0;

  for (let seed = 45; seed <= 54; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    const bodyText = await page.textContent("body");

    const numbers = bodyText
      .match(/\d+/g)
      .map(Number);

    const sum = numbers.reduce((a, b) => a + b, 0);
    grandTotal += sum;
  }

  // VERY IMPORTANT: print ONLY the number
  process.stdout.write(String(grandTotal));

  await browser.close();
})();
