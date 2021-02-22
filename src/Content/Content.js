import React from "react";
import { Modal, Button, Image, Collapse, message, BackTop } from "antd";
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
  SendOutlined,
  DownloadOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
const { Panel } = Collapse;
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
  openExternal,
  opendevtool,
  deleteAll,
  newFind,
  _init,
  isdown,
}) => (
  <div>
    <div className="justify-content-center">
      {console.log(result)}
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
    <Collapse ghost>
      <Panel
        header={<MenuOutlined title="风格" />}
        showArrow={false}
        forceRender={true}
        className="CollapseControl"
      >
        <div className="typesIcon">
          <MehFilled onClick={() => newFind("dongman/", "动漫")} title="动漫" />
          <BankFilled
            onClick={() => newFind("jianzhu/", "建筑")}
            title="建筑"
          />
          <GitlabFilled
            onClick={() => newFind("dongwu/", "动物")}
            title="动物"
          />
          <YoutubeFilled
            onClick={() => newFind("meinv/", "美女")}
            title="美女"
          />
          <SkinFilled onClick={() => newFind("jingwu/", "静物")} title="静物" />
          <CarFilled onClick={() => newFind("qiche/", "汽车")} title="汽车" />
          <GiftFilled onClick={() => newFind("jieri/", "节日")} title="节日" />
          <StarFilled
            onClick={() => newFind("xingzuo/", "星座")}
            title="星座"
          />
          <FileImageFilled
            onClick={() => newFind("fengjing/", "风景")}
            title="风景"
          />
          <AlertFilled
            onClick={() => newFind("chuangyi/", "创意")}
            title="创意"
          />
          <DribbbleCircleFilled
            onClick={() => newFind("tiyu/", "体育")}
            title="体育"
          />
        </div>
      </Panel>
    </Collapse>

    <div className="icons_fix">
      <BackTop>
        <SendOutlined title="回到顶部" className="upicon" rotate={270} />
      </BackTop>
      <div
        className="icons-num"
        onClick={() => message.info(`当前一共${result.length}套壁纸`)}
      >
        {result.length}
      </div>
      <DownloadOutlined
        onClick={() =>
          result.some(({ children }) => children.length) || isdown
            ? _init(true)
            : message.info(`未下载壁纸`)
        }
        title="已下载集合"
      />
      <GlobalOutlined onClick={() => _init()} title="全部集合" />
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
          openExternal(
            "https://github.com/blazer233/Today-wallpaper/tree/react-store-puppeteer"
          )
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
