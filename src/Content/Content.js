import React, { createElement } from "react";
import { Modal, Button, Image, Dropdown, Menu, message, BackTop } from "antd";
import { openExternal } from "../utils";
import { MenuFunc } from "../configMap";
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
export default ({
  result,
  saveWallpaper,
  setWallpaper,
  handerchilden,
  details,
  Modals: { title },
  setModal,
  setDetail,
  setheadless,
  headless,
  opendevtool,
  deleteAll,
  newFind,
  _init,
  isdownshow,
  likehander,
  openlike,
}) => {
  return (
    <div>
      <div className="justify-content-center">
        {result.map(({ srcmini, title, href, like, maxsrc: src }, index) => (
          <div className="mb-1 pics" key={title + index}>
            <div
              className="card"
              onClick={() => !like && handerchilden(title, href)}
            >
              {like ? (
                <>
                  <Image src={srcmini} preview={{ src }} className="like-img" />
                  <div className="like-title">
                    <span className="txtIcons len">{title}</span>
                    <HeartFilled
                      title="取消喜欢"
                      onClick={() => likehander(src, "set-dislike", href)}
                    />
                    <FormatPainterFilled
                      onClick={() => setWallpaper(src)}
                      title="设置壁纸"
                    />
                  </div>
                </>
              ) : (
                <>
                  <img src={srcmini} />
                  <div className="content-overlay"></div>
                  <div className="content">
                    <p>{title}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <Modal
        title={title}
        width="550"
        visible={title}
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
          {details.map(({ maxsrc: src, srcmini, like = false }, index) => (
            <div key={index}>
              <Image
                width={200}
                height={129}
                src={srcmini}
                className="Modalimage"
                preview={{ src }}
              />
              <div className="icons">
                <div className="txtIcons">
                  {src.split("t_s")[1]
                    ? src.split("t_s")[1].split("c5")[0]
                    : src.split("/")[7]}
                </div>
                {like ? (
                  <HeartFilled
                    title="取消喜欢"
                    onClick={() => likehander(src, "set-dislike")}
                  />
                ) : (
                  <HeartOutlined
                    title="喜欢"
                    onClick={() => likehander(src, "set-like")}
                  />
                )}
                <FolderOpenFilled onClick={saveWallpaper} title="下载图片" />
                <FormatPainterFilled
                  onClick={() => setWallpaper(src)}
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
        overlay={<MenuFunc newFind={newFind} />}
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
          <GlobalOutlined onClick={() => _init()} title="查看全部集合" />
        ) : (
          <DownloadOutlined
            title="查看已下载集合"
            onClick={() => _init(true)}
          />
        )}
        <HeartOutlined onClick={openlike} title="喜欢" />
        <CodeOutlined onClick={opendevtool} title="控制台" />
        {headless ? (
          <EyeInvisibleOutlined
            title="显示爬虫"
            onClick={() => setheadless(false)}
          />
        ) : (
          <EyeOutlined onClick={() => setheadless(true)} title="隐藏爬虫" />
        )}
        <GithubOutlined
          title="访问github"
          onClick={() =>
            openExternal("https://github.com/blazer233/Today-wallpapers")
          }
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
