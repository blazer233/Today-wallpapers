import React, { useState } from "react";
import Content from "./Content";
import { ipcasync } from "./utils";
import {
  MinusSquareOutlined,
  ArrowsAltOutlined,
  ShrinkOutlined,
} from "@ant-design/icons";
export default () => {
  const [max, setmax] = useState(true);
  const [title, setTitle] = useState("👋");
  const getTitle = res => setTitle(res);
  return (
    <>
      <div className="button-icons">
        <div className="drag-icons">🤖 每日壁纸-{title}</div>
        <div>
          <ArrowsAltOutlined
            className="button-icon"
            title="最小化"
            onClick={() => ipcasync("mini-icon")}
          />
          {max ? (
            <MinusSquareOutlined
              className="button-icon"
              title="最大化"
              onClick={() => {
                ipcasync("max-icon");
                setmax(false);
              }}
            />
          ) : (
            <ShrinkOutlined
              className="button-icon"
              title="恢复大小"
              onClick={() => {
                ipcasync("max-icon");
                setmax(true);
              }}
            />
          )}
        </div>
      </div>
      <Content getTitle={getTitle} />
      <div className="button-icons-over"> one wallpaper💎 </div>
    </>
  );
};
