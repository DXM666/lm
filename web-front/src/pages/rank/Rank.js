import "./Rank.css";

import { Card, Spin } from "antd";
import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
class Rank extends Component {
  constructor(props) {
    super();
    this.state = { books: [], url: "" };
  }

  componentDidMount() {
    this.props.store.rankStore.getBookList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.props.store.rankStore.getBookList(nextProps);
  }

  render() {
    // let data = this.props.store.rankStore.books.slice();
    return (
      <div>
        {this.props.store.rankStore.requestStatus === "success" ? (
          this.props.store.rankStore.books.map((bookItem, index) => {
            return (
              <div
                className="bookCard"
                onClick={() =>
                  this.props.history.push({
                    pathname: "/bookdetail",
                    state: { content: JSON.parse(JSON.stringify(bookItem)) }
                  })
                }
                key={index}
              >
                <Card
                  hoverable
                  cover={
                    <img
                      alt="example"
                      src={
                        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      }
                    />
                  }
                >
                  <Card.Meta title={bookItem.title} />
                </Card>
              </div>
            );
          })
        ) : (
          <div className="loading">
            <Spin size="large" tip="Loading..." />
          </div>
        )}
      </div>
    );
  }
}

export default Rank;
