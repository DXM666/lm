import "./MainLayout.css";

import { Avatar, Dropdown, Icon, Layout, Menu } from "antd";
import { Link, Route, Switch } from "react-router-dom";
import React, { Component } from "react";

import { SiteConf } from "../../common/config";
import { headermenus } from "./menus";

export class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { rankSidermenus: [] };
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

  getMenuItems(menusData, menuType) {
    if (!menusData) {
      return [];
    }
    return menusData.map(item => {
      if (!item.name) {
        return null;
      }
      if (menuType === "headerMenus") {
        return (
          <Menu.Item key={item.key}>
            <Link to={{ pathname: item.path }}>{item.name}</Link>
          </Menu.Item>
        );
      }
      if (menuType === "siderMenus") {
        return (
          <Menu.Item key={item.key}>
            <Link to={{ pathname: "/rank", state: { bookPath: item.path } }}>
              {item.name}
            </Link>
          </Menu.Item>
        );
      }
      return null;
    });
  }

  usermenu() {
    return (
      <Menu>
        <Menu.Item>
          <Icon type="user" />
          <span>{sessionStorage.getItem("account")}</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Icon type="book" theme="filled" />
          <span>我的书架</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Icon type="logout" style={{ display: "inline-block" }} />
          <Link
            style={{ display: "inline-block" }}
            to={{
              pathname: "/login"
            }}
          >
            注销
          </Link>
        </Menu.Item>
      </Menu>
    );
  }

  getSideMenuStatus(routes) {
    for (var i = 0; i < routes.length; i++) {
      if (routes[i].path === this.props.location.pathname) {
        return routes[i].isShowSideMenu;
      }
    }
    return false;
  }

  getCurrentMenuSelectedKeys() {
    const {
      location: { pathname }
    } = this.props;
    const keys = pathname.split("/").slice(1);
    return keys;
  }

  componentDidMount() {
    const url = SiteConf.apiHost + "sidermenu";
    fetch(url, {
      method: "get",
      mode: "cors"
    })
      .then(res => res.json())
      .then(res => {
        const rankSidermenus = [];
        for (var i = 0; i < res.male.length; i++) {
          const item = {};
          item.name = res.male[i].title;
          item.key = res.male[i]._id;
          item.path = res.male[i]._id;
          rankSidermenus.push(item);
        }
        this.setState({
          rankSidermenus: rankSidermenus
        });
        return this.state.rankSidermenus;
      })
      .catch(e => console.log(e));
  }

  render() {
    const routes = this.props.routes || [];
    const isShowSideMenu = this.getSideMenuStatus(routes);
    return (
      <Layout className="outer">
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
          <div style={{ float: "right" }}>
            <Dropdown overlay={this.usermenu()}>
              <Avatar icon="user" />
            </Dropdown>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={this.getCurrentMenuSelectedKeys()}
            style={{ lineHeight: "64px" }}
          >
            {this.getMenuItems(headermenus, "headerMenus")}
          </Menu>
        </Layout.Header>
        <Layout>
          {isShowSideMenu ? (
            <Layout.Sider width={200} style={{ background: "#fff" }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["54d42d92321052167dfb75e3"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                {this.getMenuItems(this.state.rankSidermenus, "siderMenus")}
              </Menu>
            </Layout.Sider>
          ) : null}
          <Layout style={{ padding: "24px 24px 24px 24px" }}>
            <Layout.Content className="layoutContent">
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
