const { ipcRenderer } = window.require("electron");
export const wallpaper = window.require("wallpaper");
export const puppeteer = window.require("puppeteer");
export const {
  shell: { openExternal },
} = window.require("electron");
export const {
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
