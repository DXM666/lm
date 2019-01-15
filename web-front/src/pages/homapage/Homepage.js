import "./Homepage.css";

import { Card, Divider } from "antd";
import React, { Component } from "react";
import { dec, inject, observer } from "mobx-react";

import { SiteConf } from "../../common/config";

@inject("store", "actions")
@observer
class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  getBookDetailContent = index => {
    const url = SiteConf.apiHost + "bookdetail";
    fetch(url, {
      method: "GET",
      mode: "cors"
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          data: res
        });
        // this.props.history.push({
        //   pathname: "/bookdetail",
        //   state: { content: res, num: index }
        // });
      });
  };

  async componentDidMount() {
    await this.getBookDetailContent();
  }

  render() {
    return (
      <div>
        {this.state.data.map((bookItem, index) => {
          return (
            <div
              className="bookCard"
              onClick={() =>
                this.props.history.push({
                  pathname: "/bookdetail",
                  state: { content: bookItem }
                })
              }
              key={index}
            >
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    src={require("../Image/" + index + ".jpg")}
                  />
                }
              >
                <Card.Meta title={bookItem.title[0]} />
              </Card>
            </div>
          );
        })}
        <Divider className="bookDivider" />
      </div>
    );
  }
}

export default Homepage