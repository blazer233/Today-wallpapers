import React, { useEffect, useState } from "react";
import Content from "./Content";
import { executablePath } from "../../package.json";
import { SyncOutlined } from "@ant-design/icons";
import { Spin, message } from "antd";
import { ipcasync, puppeteer, wallpaper, showOpenDialogSync } from "../utils";
const App = ({ getTitle }) => {
  const [result, setResult] = useState([]);
  const [isdown, setdown] = useState(false);
  const [isdownshow, setdownshow] = useState(false);
  const [details, setDetail] = useState([]);
  const [Modals, setModal] = useState({});
  const [screenSize, setScreenSize] = useState({});
  const [path, setPath] = useState("");
  const [headless, setheadless] = useState(true);
  const [panding, setPanding] = useState("请稍后");
  const config = {
    headless,
    executablePath,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  };
  const _init = async (_ = false) => {
    setPanding("努力加载中...第一次加载时间会比较长~~~");
    let res = await ipcasync("init-homepage", _);
    setScreenSize(await ipcasync("init-imgsize"));
    _ ? getTitle("🏠") : getTitle("🌎");
    _ ? setdownshow(true) : setdownshow(false);
    res ? setResult(res) : newFind();
    setPanding(false);
  };
  useEffect(() => _init(), []);
  const getHomePage = async url => {
    let urls = "http://desk.zol.com.cn/" + url;
    const browser = await puppeteer.launch(config);
    const page = await browser.newPage();
    await page.goto(urls);
    await page.waitForSelector(".wrapper", { visible: true });
    const arr = await page.$$eval(".main>ul a", el =>
      el.map(i => ({
        href: "http://desk.zol.com.cn" + i.getAttribute("href"),
        srcmini: i.firstChild.getAttribute("src"),
        title: i.firstChild.getAttribute("title"),
        children: [],
      }))
    );
    browser.close();
    return arr;
  };
  const getPages = async (url, screen) => {
    const browser = await puppeteer.launch(config);
    const page = await browser.newPage();
    await page.goto(url);
    const all = await page.$eval(".wrapper span", el => el.textContent);
    const allPage = all.split("/")[1].replace("）", "");
    console.log("开始", url);
    await page.waitForSelector(".wrapper", { visible: true });
    const arr = await page.$$eval("#showImg li a", el =>
      el.map(i => ({
        href: "http://desk.zol.com.cn" + i.getAttribute("href"),
        srcmini:
          i.firstElementChild.getAttribute("src") ||
          i.firstElementChild.getAttribute("srcs"),
      }))
    );
    for (let i = 0; i < arr.length; i++) {
      i && setPanding(`总共爬取 ${allPage} 张,当前爬取第 ${i} 张`);
      await page.goto(arr[i].href);
      await page.waitForSelector(`#tagfbl`, { visible: true });
      const hrefItems = await page.evaluate(
        el =>
          document.querySelector(el)
            ? document.querySelector(el).getAttribute("href")
            : document.querySelector(`a[id="1920x1080"]`)
            ? document.querySelector(`a[id="1920x1080"]`).getAttribute("href")
            : document.querySelector(`#tagfbl a`).getAttribute("href"),
        `a[id="${screen}"]`
      );
      await page.goto("http://desk.zol.com.cn" + hrefItems);
      await page.waitForSelector("body img", { visible: true });
      const hrefItem = await page.$eval("body img", el => el.src);
      arr[i].maxsrc = hrefItem;
      details.push(arr[i]);
      setDetail(details);
    }
    setPanding(`爬取完成。请稍后`);
    browser.close();
  };
  const handerchilden = async (title, href) => {
    console.log(title, href, screenSize);
    setModal({ title, href });
    setPanding("正在从数据库拉取数据~~~");
    let res = await ipcasync("init-collect", href);
    if (res) {
      setDetail(res);
    } else {
      try {
        setPanding("数据库未查询到，正在拉取新数据~~~");
        let { width, height } = screenSize;
        let size =
          height < 1100 && height > 1000
            ? `1920x1080`
            : height < 1600 && height > 1100
            ? `2560x1440`
            : height < 1900 && height > 1600
            ? `2880x1800`
            : `${width}x${height}`;
        await getPages(href, size);
      } catch (error) {
        message.info(`网络异常未能全部下载成功`);
        setPanding(false);
        setDetail(details);
      }
      ipcasync("init-collect-add", { href, resultHref: details });
      setdown(true);
      Notification.requestPermission(
        () => new Notification("hi~", { body: `" ${title} "获取完成` })
      );
    }
    setPanding(false);
  };
  const opendevtool = async () => await ipcasync("init-devtool");
  const deleteAll = async () => {
    setResult([]);
    setPanding(`删除全部壁纸重新获取......`);
    let res = await ipcasync("init-delete");
    res && _init();
  };
  const saveWallpaper = () => {
    const filepath = showOpenDialogSync({
      properties: ["openDirectory", "createDirectory", "promptToCreate"],
    });
    console.log(filepath);
    setPath(filepath && filepath[0]);
  };
  const setWallpaper = async url => {
    setPanding("正在设置桌面壁纸");
    try {
      let res = await ipcasync("download", { url, path });
      wallpaper.set(res);
      setPanding(false);
    } catch (error) {
      setPanding(false);
      message.info(`网络异常未能全部下载成功`);
    }
  };
  const likehander = async (src, name, taghref) => {
    message.info(name == "set-like" ? "添加喜欢" : "取消喜欢");
    let res = await ipcasync(name, {
      src,
      href: taghref ? taghref : Modals.href,
    });
    taghref ? openlike(true) : setDetail(res);
  };
  const openlike = async _is => {
    let res = await ipcasync("init-like");
    if (res.length) {
      getTitle("💖");
    } else {
      message.info(`暂时没有收藏壁纸`);
    }
    setResult(res);
  };
  const newFind = async (str, name) => {
    try {
      setPanding(`正在添加${name}壁纸`);
      let data = await getHomePage(str ? str : "pc/");
      let { dataArry, add } = await ipcasync("init-day-data", {
        data,
      });
      message.info(add == 0 ? "本次无新增" : `本次新增 ${add} 张`);
      setResult(dataArry);
    } catch (error) {
      message.info(`加载失败`);
      setResult([]);
    }
    setPanding(false);
    setdownshow(false);
  };
  const antIcon = <SyncOutlined spin style={{ fontSize: 24 }} />;
  return (
    <div id="app">
      {panding && (
        <div className="loading">
          <Spin indicator={antIcon} tip={panding} size="large" />
        </div>
      )}
      <Content
        {...{
          result,
          saveWallpaper,
          setWallpaper,
          handerchilden,
          details,
          setDetail,
          Modals,
          setModal,
          setheadless,
          headless,
          opendevtool,
          deleteAll,
          newFind,
          _init,
          isdown,
          isdownshow,
          likehander,
          openlike,
        }}
      />
    </div>
  );
};
export default App;
