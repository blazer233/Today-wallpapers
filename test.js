const puppeteer = require("puppeteer");
const getHomePage = async (istime = false) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://ss.netnr.com/wallpaper#");
  await page.waitForSelector(`.row`, { visible: true });
  await page.evaluate(async () => {
    var totalHeight = 0;
    var distance = 100;
    var timer = setInterval(() => {
      var scrollHeight = document.body.scrollHeight;
      window.scrollBy(0, distance);
      totalHeight += distance;
      totalHeight >= scrollHeight && clearInterval(timer);
    }, 100);
  });
  await page.waitForSelector(`.py-3`, { visible: true });

  const arr = await page.$$eval(".row>div img", el =>
    el.map((i, index) => ({
      href: i.getAttribute("data-url"),
      srcmini: i.getAttribute("src"),
      title: i.getAttribute("title") || "",
      index,
    }))
  );
  console.log(arr);
  browser.close();
};
getHomePage();
