import "./Homepage.css";

import { Card, Divider, Spin } from "antd";
import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    this.props.store.homePageStore.getBookDetailContent();
  }

  render() {
    return (
      <div>
        {this.props.store.homePageStore.requestStatus === "success" ? (
          this.props.store.homePageStore.homePageData.map((bookItem, index) => {
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
          })
        ) : (
          <div className="loading">
            <Spin size="large" tip="Loading..." />
          </div>
        )}
        <Divider className="bookDivider" />
      </div>
    );
  }
}

export default Homepage;
