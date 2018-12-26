import "./MainLayout.css";

import { Breadcrumb, Button, Icon, Layout, Menu } from "antd";
import React, { Component } from "react";
import { headermenus, sidermenus } from "./menus";

import { SiteConf } from "../../common/config";

export class MainLayout extends Component {
  constructor(props) {
    super();
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

  getMenuItems(menusData, menusName = "") {
    if (!menusData) {
      return [];
    }
    return menusData.map(item => {
      if (!item.name) {
        return null;
      }
      return <Menu.Item key={item.key}>{item.name}</Menu.Item>;
    });
  }

  getCurrentMenuSelectedKeys() {
    const {
      location: { pathname }
    } = this.props;
    const keys = pathname.split('/').slice(1);
    return keys
  }

  render() {
    console.log(this.props)
    return (
      <Layout>
        <Layout.Header className="header">
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={this.getCurrentMenuSelectedKeys()}
            style={{ lineHeight: "64px" }}
          >
            {this.getMenuItems(headermenus, "headermenus")}
          </Menu>
        </Layout.Header>
        <Layout>
          <Layout.Sider width={200} style={{ background: "#fff" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    subnav 1
                  </span>
                }
              >
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="laptop" />
                    subnav 2
                  </span>
                }
              >
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="notification" />
                    subnav 3
                  </span>
                }
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Layout.Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Layout.Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              Content
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
