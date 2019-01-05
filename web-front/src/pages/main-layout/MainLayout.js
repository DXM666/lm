import "./MainLayout.css";

import { Breadcrumb, Layout, Menu } from "antd";
import { Link, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import { headermenus, rankSidermenus } from "./menus";

import { SiteConf } from "../../common/config";

export class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.getToken = this.getToken.bind(this);
  }
  getToken() {
    const headers = new Headers({
      Authorization: "bearer " + this.props.location.state.token,
      "Content-Type": "text/plain"
    });
    const url = SiteConf.apiHost + "main";
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: headers
    })
      .then(res => {
        return res.json();
      })
      .then(res => console.log(res));
  }

  getMenuItems(menusData) {
    if (!menusData) {
      return [];
    }
    return menusData.map(item => {
      if (!item.name) {
        return null;
      }
      return (
        <Menu.Item key={item.key}>
          <Link to={{ pathname: item.path }}>{item.name}</Link>
        </Menu.Item>
      );
    });
  }

  getCurrentMenuSelectedKeys() {
    const {
      location: { pathname }
    } = this.props;
    const keys = pathname.split("/").slice(1);
    return keys;
  }

  render() {
    console.log(this.props.isShowSideMenu);
    const routes = this.props.routes || [];
    return (
      <Layout>
        <Layout.Header className="header">
          <div
            style={{
              color: "white",
              fontSize: 20,
              marginRight: 50,
              float: "left",
              backgroundColor: "#001529"
            }}
          >
            DXMの书架
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={this.getCurrentMenuSelectedKeys()}
            style={{ lineHeight: "64px" }}
          >
            {this.getMenuItems(headermenus)}
          </Menu>
        </Layout.Header>
        <Layout>
          {this.props.isShowSideMenu ? (
            <Layout.Sider width={200} style={{ background: "#fff" }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                {this.getMenuItems(rankSidermenus, "rankSidermenus")}
              </Menu>
            </Layout.Sider>
          ) : null}
          <Layout style={{ padding: "24px 24px 24px 24px" }}>
            <Layout.Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              <Switch>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    render={props => (
                      <route.component
                        {...props}
                        isShowSideMenu={route.isShowSideMenu}
                      />
                    )}
                  />
                ))}
              </Switch>
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
