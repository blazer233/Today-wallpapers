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
const expHomeOne = (str, istime) =>
  istime
    ? store.get("Database").find(i => i[str])
    : store.get("Database").find(i => i.href == str);
const updatePage = (atr, islike, data) => {
  let res = store.get("Database");
  let result = res.find(i => i.href == atr);
  if (islike) {
    result.children.forEach(i => {
      if (i.maxsrc == data) i.like = !i.like;
    });
  } else {
    result.children = data;
  }
  store.set("Database", res);
};

const explikes = () => {
  let res = expDown();
  let target = [];
  res.forEach(({ children, title, href }) =>
    children.forEach(
      (i, index) =>
        i.like && target.push({ ...i, title: `${title}-${index + 1}`, href })
    )
  );
  return target;
};
const expDown = () =>
  expHomePage("title").filter(({ children }) => children.length);
module.exports = {
  savHomePage,
  expHomePage,
  destroyPage,
  updatePage,
  expHomeOne,
  expDown,
  explikes,
};
