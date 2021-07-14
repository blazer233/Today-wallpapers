import React, { createElement } from "react";
import { Modal, Button, Image, Dropdown, Menu, message, BackTop } from "antd";

import {
  FolderOpenFilled,
  FormatPainterFilled,
  EyeInvisibleOutlined,
  DeleteOutlined,
  EyeOutlined,
  CodeOutlined,
  GithubOutlined,
  MenuOutlined,
  FileImageFilled,
  MehFilled,
  AlertFilled,
  CarFilled,
  DribbbleCircleFilled,
  BankFilled,
  GitlabFilled,
  YoutubeFilled,
  SkinFilled,
  GiftFilled,
  StarFilled,
  DownloadOutlined,
  GlobalOutlined,
  RocketFilled,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
export const configMap = [
  {
    type: MehFilled,
    className: "icons-li",
    url: "dongman/",
    title: "动漫",
  },
  {
    type: BankFilled,
    className: "icons-li",
    url: "jianzhu/",
    title: "建筑",
  },
  {
    type: GitlabFilled,
    className: "icons-li",
    url: "dongwu/",
    title: "动物",
  },
  {
    type: YoutubeFilled,
    className: "icons-li",
    url: "meinv/",
    title: "美女",
  },
  {
    type: SkinFilled,
    className: "icons-li",
    url: "jingwu/",
    title: "静物",
  },
  {
    type: CarFilled,
    className: "icons-li",
    url: "qiche/",
    title: "汽车",
  },
  {
    type: GiftFilled,
    className: "icons-li",
    url: "jieri/",
    title: "节日",
  },
  {
    type: DribbbleCircleFilled,
    className: "icons-li",
    url: "tiyu/",
    title: "体育",
  },
  {
    type: AlertFilled,
    className: "icons-li",
    url: "chuangyi/",
    title: "创意",
  },
  {
    type: FileImageFilled,
    className: "icons-li",
    url: "fengjing/",
    title: "风景",
  },
  {
    type: StarFilled,
    className: "icons-li",
    url: "xingzuo/",
    title: "星座",
  },
];

export const MenuFunc = newFind => (
  <Menu className="drop-downs-menu">
    {console.log(`MenuFunc组件`)}
    {configMap.map(({ type, className, url, title }) => (
      <Menu.Item key={url}>
        {createElement(
          type,
          { className, onClick: () => newFind(url, title), title },
          null
        )}
      </Menu.Item>
    ))}
  </Menu>
);
