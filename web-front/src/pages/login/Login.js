import "./Login.css";

import { Button, Checkbox, Form, Icon, Input } from "antd";
import React, { Component } from "react";

import { SiteConf } from "../../common/config";

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let formData = new FormData();
        formData.append("username", values.username);
        formData.append("password", values.password);
        fetch(SiteConf.apiHost, {
          method: "POST",
          mode: "cors",
          body: formData
        })
          .then(res => {
            return res.json();
          })
          .then(res => {
            if (res.status) {
              sessionStorage.setItem("token", res.token);
              sessionStorage.setItem("account", values.username);
              sessionStorage.setItem("password", values.password);
              this.props.history.push({
                pathname: "/main",
                state: {
                  username: values.username
                }
              });
            }
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-box">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="https://www.zhihu.com/">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="https://www.zhihu.com/">register now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);
