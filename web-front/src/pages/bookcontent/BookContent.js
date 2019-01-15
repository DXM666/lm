import { Divider, Drawer } from "antd";
import React, { Component } from "react";

import { SiteConf } from "../../common/config";

export class BookContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      chapterList: [],
      chapterInfo: ""
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
        this.setState({ chapterList: res.mixToc.chapters });
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

  getChapterInfo(chapterLink) {
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
        this.setState({ chapterInfo: res.chapter.body });
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>
          {this.props.location.state.content.title}
        </h1>
        <div style={{ textAlign: "center" }}>
          <span onClick={this.onClose} style={{ color: "#1890ff" }}>
            上一章
          </span>
          <Divider style={{ backgroundColor: "black" }} type="vertical" />
          <span onClick={this.showDrawer} style={{ color: "#1890ff" }}>
            目录
          </span>
          <Divider style={{ backgroundColor: "black" }} type="vertical" />
          <span href="true" style={{ color: "#1890ff" }}>
            下一章
          </span>
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
              <p onClick={() => this.getChapterInfo(item.link)} key={index}>
                {item.title}
              </p>
            );
          })}
        </Drawer>
        <p style={{ whiteSpace: "pre-line" }}>
          {this.props.location.state.content.abstract
            ? this.props.location.state.content.abstract
            : this.state.chapterInfo}
        </p>
      </div>
    );
  }
}
