const Store = require("electron-store");
const dayjs = require("dayjs");
const time = dayjs().format("YYYY-MM-DD");
const store = new Store();
const diff = (arr1 = [], arr2 = []) =>
  arr1.filter(i => arr2.every(_i => _i.href !== i.href));
const merge = (arr1 = [], arr2 = []) => {
  let res = [...arr1, ...arr2];
  let timer = res.find(({ time }) => time);
  timer ? (timer.time = time) : res.push({ time });
  return res;
};
const destroyPage = () => store.delete("Database");
const savHomePage = arr => {
  let oldDate = expHomePage() || [];
  let diffArr = diff(arr, oldDate) || [];
  store.set("Database", merge(diffArr, oldDate));
  return diffArr.length;
};
const expHomePage = str =>
  str ? store.get("Database").filter(i => i[str]) : store.get("Database");
const expHomeOne = (str, num) =>
  num
    ? store.get("Database").find(i => i[str])
    : store.get("Database").find(i => i.href == str);
const updatePage = (atr, data) => {
  let res = store.get("Database");
  let result = res.find(i => i.href == atr);
  result.children = data;
  store.set("Database", res);
};
module.exports = {
  savHomePage,
  expHomePage,
  destroyPage,
  updatePage,
  expHomeOne,
};
