import React, { useState, useEffect } from "react";
import Content from "./Content";
import { ipcasync, setSchedule } from "./utils";
import {
  MinusSquareOutlined,
  ArrowsAltOutlined,
  ShrinkOutlined,
  EyeInvisibleTwoTone,
  EyeTwoTone,
} from "@ant-design/icons";
import { message } from "antd";
export default () => {
  const [max, setmax] = useState(true);
  const [day, sday] = useState(true);
  const [title, setTitle] = useState("👋");
  const getTitle = res => setTitle(res);
  useEffect(() => {
    message.info(day ? `您已开启每日壁纸` : "关闭每日壁纸");
    setSchedule(day);
  }, [day]);
  return (
    <>
      <div className="button-icons">
        <div className="drag-icons">🏂 每日壁纸-{title}</div>
        <div>
          <MinusSquareOutlined
            className="button-icon"
            title="最小化"
            onClick={() => ipcasync("mini-icon")}
          />
          {max ? (
            <ArrowsAltOutlined
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
      <div className="show-day">
        {day ? (
          <EyeTwoTone onClick={() => sday(false)} />
        ) : (
          <EyeInvisibleTwoTone onClick={() => sday(true)} />
        )}
      </div>
      <Content getTitle={getTitle} />
      <div className="button-icons-over"> one wallpaper💎 </div>
    </>
  );
};
