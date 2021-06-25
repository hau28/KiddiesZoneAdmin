import React, { useState, useEffect, useCallback, useContext } from "react";
import { Form, Input, Button, Checkbox, Row, Typography, message } from "antd";
import firebase from "../Firestore";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import { AuthContext } from "../App";

const { Title } = Typography;

const LoginPage = ({ history }) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onFinish = async () => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(form?.email, form?.password);
      history.push("/dashboard");
    } catch (err) {
      message.error(err.message);
    }
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    console.log("current user", currentUser);
    return <Redirect to="/dashboard" />;
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className="center full d-flex align-items-center justify-content-center jungle"
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "whitesmoke",
      }}
    >
      <img
        height="100"
        src="https://i.ibb.co/3rf3j7N/Light-Logo.png"
        alt="Kiddies Zone Logo"
        style={{ marginBottom: 30 }}
      />
      <div
        className="shadow"
        style={{
          width: 400,
          backgroundColor: "white",
          padding: 30,
          paddingBottom: 15,
        }}
      >
        <Form
          name="basic"
          initialValues={{
            remember: false,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          requiredMark={false}
        >
          <Form.Item
            // label="Username"
            name="email"
            style={{ marginBottom: 20 }}
          >
            <h6 style={{ marginBottom: 10 }}>Email</h6>
            <Input
              prefix={<UserOutlined style={{ marginRight: 5 }} />}
              onChange={handleChange}
              name="email"
              placeholder="example@email.com"
              size="large"
            />
          </Form.Item>

          <Form.Item
            // label="Password"
            style={{ marginBottom: 20 }}
            name="password"
          >
            <h6 style={{ marginBottom: 10 }}>Mật khẩu</h6>
            <Input.Password
              prefix={<LockOutlined style={{ marginRight: 5 }} />}
              onChange={handleChange}
              name="password"
              placeholder="************"
              size="large"
            />
          </Form.Item>
          <Row style={{ justifyContent: "space-between" }}>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox size="large">Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button size="large" type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default withRouter(LoginPage);
