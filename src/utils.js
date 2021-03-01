export const wallpaper = window.require("wallpaper");
export const puppeteer = window.require("puppeteer");
export const schedule = require("node-schedule");
export const {
  ipcRenderer,
  shell: { openExternal },
  remote: {
    dialog: { showOpenDialogSync },
  },
} = window.require("electron");
export const ipcasync = async (name, obj = null) => {
  ipcRenderer.send(name, obj);
  return await new Promise(resolve => {
    ipcRenderer.on(`${name}-reply`, (event, arg) => resolve(arg));
  });
};
export const setSchedule = () => {
  schedule.scheduleJob("* 1 * * * *", async () => {
    let waps = await ipcasync("init-like");
    if (waps.length) {
      let url = waps[Math.floor(Math.random() * waps.length)].maxsrc;
      try {
        let res = await ipcasync("download", { url, path: "" });
        wallpaper.set(res);
      } catch (error) {
        console.log(error);
      }
    }
  });
};
