const {
  app,
  ipcMain,
  BrowserWindow,
  Notification, 
  Tray, 
  Menu: { buildFromTemplate, setApplicationMenu },
  screen,
} = require("electron");
const path = require("path");
const { download } = require("electron-dl");
const log = require("electron-log");
const {
  savHomePage,
  expHomePage,
  updatePage,
  expHomeOne,
  destroyPage,
  expDown,
  explikes,
} = require("./Database");
const dayjs = require("dayjs");
const isDev = process.env.NODE_ENV !== "development";
var appTray;
const Hand = async () => {
  //当electron完成初始化后触发init-day-data
  mainWindow = new BrowserWindow({
    show: false,
    width: 900,
    height: 700,
    minHeight: 700,
    minWidth: 310,
    frame: false, //无边框
    transparent: false, //透明
    alwaysOnTop: false,
    hasShadow: false, //阴影
    resizable: true,
    webPreferences: {
      nodeIntegration: true, //是否使用node
      enableRemoteModule: true, //是否有子页面
      contextIsolation: false, //是否禁止node
      nodeIntegrationInSubFrames: true, //否允许在子页面(iframe)或子窗口(child window)中集成Node.js
    },
  });
  isDev
    ? mainWindow.loadURL(`file://${__dirname}\\index.html`)
    : mainWindow.loadURL(`http://localhost:3000`);
  setApplicationMenu(buildFromTemplate([]));
  ipcMain.on("init-imgsize", e => {
    var { workAreaSize } = screen.getPrimaryDisplay();
    e.sender.send("init-imgsize-reply", workAreaSize);
  });
  ipcMain.on("init-devtool", e =>
    mainWindow.webContents.openDevTools({ mode: "detach" })
  );
  ipcMain.on("init-delete", e => {
    destroyPage();
    e.sender.send("init-delete-reply", true);
  });
  ipcMain.on("init-homepage", (e, _) => {
    let ctx = expHomePage() || [];
    if (ctx.length) {
      log.info("查询到数据库数据");
      let { time } = expHomeOne("time", true);
      let isday = dayjs().isSame(time, "day");
      log.info(time, "数据库时间", isday, "同一天");
      e.sender.send(
        "init-homepage-reply",
        isday && _ ? expDown() : isday ? expHomePage("title") : false
      );
    } else {
      log.info("未查到数据库数据");
      e.sender.send("init-homepage-reply", false);
    }
  });
  ipcMain.on("init-day-data", (e, { data }) => {
    let add = savHomePage(data);
    e.sender.send("init-day-data-reply", {
      dataArry: expHomePage("title"),
      add,
    });
  });
  ipcMain.on("init-collect", (e, href) => {
    let result = expHomeOne(href);
    result.children.length
      ? e.sender.send("init-collect-reply", result.children)
      : e.sender.send("init-collect-reply", false);
  });  
  ipcMain.on("init-collect-add", (e, { href, resultHref }) => {
    updatePage(href, false, resultHref);
    e.sender.send("init-day-data-reply", true);
  });
  ipcMain.on("set-like", (e, { src, href }) => {
    updatePage(href, true, src);
    e.sender.send("set-like-reply", expHomeOne(href).children);
  });
  ipcMain.on("set-dislike", (e, { src, href }) => {
    updatePage(href, true, src);
    e.sender.send("set-dislike-reply", expHomeOne(href).children);
  });
  ipcMain.on("init-like", e => {
    e.sender.send("init-like-reply", explikes());
  });
  ipcMain.on("download", async (event, { url, path }) => {
    const defaultPath = app.getPath("downloads");
    const currentPath = path ? path : defaultPath;
    let dl = await download(BrowserWindow.getFocusedWindow(), url, {
      directory: currentPath,
      openFolderWhenDone: false,
    });
    new Notification({
      title: "hi~",
      body: "您已设置新桌面",
      silent: true,
      icon: dl.getSavePath(),
      timeoutType: "default",
    }).show();

    event.sender.send("download-reply", dl.getSavePath());
  });
  ipcMain.on("max-icon", () => {
    mainWindow.isMaximized() ? mainWindow.restore() : mainWindow.maximize();
  });
  ipcMain.on("mini-icon", () => {
    mainWindow.minimize();
    mainWindow.hide();
    if (!appTray) {
      appTray = new Tray(path.join(__dirname, "favicon.ico"));
      appTray.setToolTip("one wallpaper💎");
      appTray.on("click", () =>
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
      );
      const contextMenu = buildFromTemplate([
        // {
        //   label: "显示/隐藏", //设置单个菜单项名称
        //   click: () =>
        //     mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show(),
        // },
        {
          label: "退出",
          click: () => app.quit(),
        },
      ]);
      appTray.setContextMenu(contextMenu);
    }
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
    app.quit(); //应用退出的时候触发
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
};
app.on("ready", () => {
  Hand();
});

app.on("activate", () => mainWindow === null && Hand());
