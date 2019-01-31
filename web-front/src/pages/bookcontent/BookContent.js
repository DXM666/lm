import "./BookContent.css";

import {
  Affix,
  Button,
  Divider,
  Drawer,
  Dropdown,
  Icon,
  Menu,
  message
} from "antd";
import React, { Component } from "react";

import { SiteConf } from "../../common/config";

export class BookContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      chapterList: [],
      chapterInfo: "",
      currentChapter: "",
      currentChapterNum: 0,
      contentFontSize: 14,
      fontSizeVisible: false
    };
  }

  componentDidMount() {
    const url =
      SiteConf.apiHost + "chapterlist/" + this.props.location.state.content._id;
    fetch(url, {
      method: "get",
      mode: "cors"
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          chapterList: res.mixToc.chapters,
          currentChapter: res.mixToc.chapters[0].title
        });
        this.getChapterInfo(res.mixToc.chapters[0].link, 0);
      })
      .catch(e => console.log(e));
  }

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  getChapterInfo(chapterLink, index) {
    if (chapterLink) {
      const url =
        "http://chapter2.zhuishushenqi.com/chapter/" +
        encodeURIComponent(chapterLink);
      fetch(url, {
        method: "GET",
        mode: "cors"
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          this.setState({
            currentChapter: this.state.chapterList[index].title,
            chapterInfo: res.chapter.body,
            currentChapterNum: index
          });
        })
        .catch(e => console.log(e));
    }
  }

  fontMenu() {
    return (
      <Menu>
        <Menu.Item>
          <div>
            <span>字号：</span>
            <Icon
              type="plus-square"
              theme="twoTone"
              style={{ paddingRight: 5 }}
              onClick={() => {
                this.setState({
                  contentFontSize: this.state.contentFontSize + 1
                });
              }}
            />
            <Icon
              type="minus-square"
              theme="twoTone"
              onClick={() => {
                this.setState({
                  contentFontSize: this.state.contentFontSize - 1
                });
              }}
            />
          </div>
        </Menu.Item>
        <Menu.Item>
          <div>
            <span>字体：</span>
          </div>
        </Menu.Item>
      </Menu>
    );
  }

  changeChapter(type, index) {
    if (type === "previous" && index <= 0) {
      message.error("已经是第一章啦！");
      return;
    }
    if (type === "next" && index >= this.state.chapterList.length) {
      message.error("已经是最后一章啦！");
      return;
    }
    if (type === "next") {
      this.getChapterInfo(this.state.chapterList[index + 1].link, index + 1);
    }
    if (type === "previous") {
      this.getChapterInfo(this.state.chapterList[index - 1].link, index - 1);
    }
  }

  render() {
    return (
      <div>
        <Dropdown
          overlay={this.fontMenu()}
          visible={this.state.fontSizeVisible}
          onVisibleChange={visible => {
            this.setState({
              fontSizeVisible: visible
            });
          }}
        >
          <Affix className="setting" offsetTop={30}>
            <Icon
              style={{ fontSize: 20, color: "#1890ff" }}
              type="font-colors"
            />
          </Affix>
        </Dropdown>

        <div>
          <h1 style={{ textAlign: "center" }}>
            {this.props.location.state.content.title}
          </h1>
          <h2 style={{ textAlign: "center" }}>{this.state.currentChapter}</h2>
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={() =>
                this.changeChapter("previous", this.state.currentChapterNum)
              }
              style={{ color: "#1890ff", border: 0 }}
            >
              上一章
            </Button>
            <Divider style={{ backgroundColor: "black" }} type="vertical" />
            <Button
              onClick={this.showDrawer}
              style={{ color: "#1890ff", border: 0 }}
            >
              目录
            </Button>
            <Divider style={{ backgroundColor: "black" }} type="vertical" />
            <Button
              onClick={() =>
                this.changeChapter("next", this.state.currentChapterNum)
              }
              style={{ color: "#1890ff", border: 0 }}
            >
              下一章
            </Button>
          </div>
          <Drawer
            title="目录"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            {this.state.chapterList.map((item, index) => {
              return (
                <Button
                  onClick={() => this.getChapterInfo(item.link, index)}
                  style={{ color: "#1890ff", border: 0 }}
                  key={index}
                  block={true}
                >
                  {item.title}
                </Button>
              );
            })}
          </Drawer>
          <p
            style={{
              whiteSpace: "pre-line",
              fontSize: this.state.contentFontSize
            }}
          >
            {this.props.location.state.content.abstract
              ? this.props.location.state.content.abstract
              : this.state.chapterInfo}
          </p>
        </div>
      </div>
    );
  }
}
