import React from "react";
import { Modal, Button, Image, Dropdown, Menu, message, BackTop } from "antd";
import { openExternal } from "../utils";
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
} from "@ant-design/icons";
export default ({
  result,
  saveWallpaper,
  setWallpaper,
  handerchilden,
  details,
  Modals,
  setModal,
  setDetail,
  setheadless,
  headless,
  opendevtool,
  deleteAll,
  newFind,
  _init,
  isdown,
  isdownshow,
  setdownshow,
}) => {
  return (
    <div>
      <div className="justify-content-center">
        {result.map(({ srcmini, title, href }, index) => (
          <div className="mb-1 pics" key={title + index}>
            <div className="card" onClick={() => handerchilden(title, href)}>
              <img src={srcmini} />
              <div className="content-overlay"></div>
              <div className="content">
                <p>{title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        title={Modals}
        width="550"
        visible={Modals}
        onCancel={() => setModal(false)}
        closable={false}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setModal(false);
              setDetail([]);
            }}
          >
            Return
          </Button>,
        ]}
        maskClosable={false}
        style={{ top: 30 }}
      >
        <div className="Modalcon">
          {details.map(({ maxsrc, srcmini }, index) => (
            <div key={index}>
              <Image
                width={200}
                height={129}
                src={srcmini}
                className="Modalimage"
                preview={{
                  src: maxsrc,
                }}
              />
              <div className="icons">
                <div className="txtIcons">
                  {maxsrc.split("t_s")[1]
                    ? maxsrc.split("t_s")[1].split("c5")[0]
                    : maxsrc.split("/")[7]}
                </div>
                <FolderOpenFilled onClick={saveWallpaper} title="下载图片" />
                <FormatPainterFilled
                  onClick={() => setWallpaper(maxsrc)}
                  title="设置壁纸"
                />
              </div>
            </div>
          ))}
        </div>
      </Modal>
      <Dropdown
        overlayClassName="drop-downs"
        className="drop-down"
        placement="topCenter"
        overlay={() => (
          <Menu className="drop-downs-menu">
            <Menu.Item>
              <MehFilled
                className="icons-li"
                onClick={() => newFind("dongman/", "动漫")}
                title="动漫"
              />
            </Menu.Item>
            <Menu.Item>
              <BankFilled
                className="icons-li"
                onClick={() => newFind("jianzhu/", "建筑")}
                title="建筑"
              />
            </Menu.Item>
            <Menu.Item>
              <GitlabFilled
                className="icons-li"
                onClick={() => newFind("dongwu/", "动物")}
                title="动物"
              />
            </Menu.Item>
            <Menu.Item>
              <YoutubeFilled
                className="icons-li"
                onClick={() => newFind("meinv/", "美女")}
                title="美女"
              />
            </Menu.Item>
            <Menu.Item>
              <SkinFilled
                className="icons-li"
                onClick={() => newFind("jingwu/", "静物")}
                title="静物"
              />
            </Menu.Item>
            <Menu.Item>
              <CarFilled
                className="icons-li"
                onClick={() => newFind("qiche/", "汽车")}
                title="汽车"
              />
            </Menu.Item>
            <Menu.Item>
              <GiftFilled
                className="icons-li"
                onClick={() => newFind("jieri/", "节日")}
                title="节日"
              />
            </Menu.Item>
            <Menu.Item>
              <DribbbleCircleFilled
                className="icons-li"
                onClick={() => newFind("tiyu/", "体育")}
                title="体育"
              />
            </Menu.Item>
            <Menu.Item>
              <AlertFilled
                className="icons-li"
                onClick={() => newFind("chuangyi/", "创意")}
                title="创意"
              />
            </Menu.Item>
            <Menu.Item>
              <FileImageFilled
                className="icons-li"
                onClick={() => newFind("fengjing/", "风景")}
                title="风景"
              />
            </Menu.Item>
            <Menu.Item>
              <StarFilled
                className="icons-li"
                onClick={() => newFind("xingzuo/", "星座")}
                title="星座"
              />
            </Menu.Item>
          </Menu>
        )}
      >
        <MenuOutlined title="风格" />
      </Dropdown>

      <div className="icons_fix">
        <BackTop className="upicon">
          <RocketFilled title="回到顶部" />
        </BackTop>
        <div
          className="icons-num"
          onClick={() => message.info(`当前一共${result.length}套壁纸`)}
        >
          {result.length}
        </div>
        {isdownshow ? (
          <GlobalOutlined
            onClick={() => {
              setdownshow(false);
              _init();
            }}
            title="查看全部集合"
          />
        ) : (
          <DownloadOutlined
            onClick={() => {
              setdownshow(true);
              result.some(({ children }) => children.length) || isdown
                ? _init(true)
                : message.info(`未下载壁纸`);
            }}
            title="查看已下载集合"
          />
        )}

        <CodeOutlined onClick={opendevtool} title="控制台" />
        {headless ? (
          <EyeInvisibleOutlined
            onClick={() => setheadless(false)}
            title="显示爬虫"
          />
        ) : (
          <EyeOutlined onClick={() => setheadless(true)} title="隐藏爬虫" />
        )}
        <GithubOutlined
          onClick={() =>
            openExternal("https://github.com/blazer233/Today-wallpapers")
          }
          title="访问github"
        />
        <DeleteOutlined
          title="全部删除"
          onClick={() => {
            Modal.error({
              title: "是否删除数据库全部数据",
              content: "删除后无法恢复只能重新下载",
              onOk: deleteAll,
              maskClosable: true,
              okText: "确认",
            });
          }}
        />
      </div>
    </div>
  );
};
