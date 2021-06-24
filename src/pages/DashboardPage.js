import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router";
import {
  Layout,
  Menu,
  Avatar,
  Row,
  Button,
  Table,
  Tag,
  Space,
  Input,
} from "antd";
import {
  HeartOutlined,
  VideoCameraOutlined,
  ReadOutlined,
  UserOutlined,
  LinkOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import firebase from "../Firestore";
import { CollectionName } from "../utils/enum";
import Iframe from "react-iframe";
import { VideoManager } from "./VideoManager";
import { PostManger } from "./PostManager";

const { Header, Content, Footer, Sider } = Layout;

const StoryManager = () => {
  return <div>Developing...</div>;
};

const Statistics = () => {
  return <div>Developing...</div>;
};

const scheme = "#1890ff";
const DashboardPage = () => {
  const [currentPage, setCurrentPage] = useState("1");
  const handleSelectPage = (e) => {
    setCurrentPage(e.key);
  };
  const page = () => {
    switch (currentPage) {
      case "1":
        return <VideoManager />;
      case "2":
        return <PostManger />;
      case "3":
        return <StoryManager />;
      case "4":
        return <Statistics />;
      default:
        return <VideoManager />;
    }
  };
  const pageName = () => {
    switch (currentPage) {
      case "1":
        return "Quản lý video";
      case "2":
        return "Quản lý bài viết";
      case "3":
        return "Quản lý truyện";
      case "4":
        return "Thống kê";
      default:
        return "Quản lý video";
    }
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        width={250}
        theme="dark"
        style={{ backgroundColor: "#333333" }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {}}
        onCollapse={(collapsed, type) => {}}
      >
        <div
          style={{
            backgroundColor: "#262626",
            padding: 15,
            paddingTop: 40,
            paddingBottom: 40,
          }}
        >
          <Row style={{ alignItems: "center" }}>
            <Avatar size="large" icon={<UserOutlined />} />
            <div style={{ marginLeft: 10 }}>
              <p
                style={{
                  color: "white",
                  marginBottom: 0,
                  fontWeight: "bold",
                }}
              >
                Admin
              </p>
              <p style={{ color: "white", marginBottom: 0 }}>Ngô Công Hậu</p>
            </div>
          </Row>
          <div style={{ marginTop: 20, paddingRight: 10, paddingLeft: 10 }}>
            <Button
              block
              style={{
                backgroundColor: scheme,
                borderColor: scheme,
                color: "white",
                marginBottom: 10,
              }}
            >
              Tùy chọn
            </Button>
            <Button
              block
              style={{
                backgroundColor: "#333333",
                borderColor: "#333333",
                color: scheme,
              }}
            >
              Đăng xuất
            </Button>
          </div>
        </div>
        <Menu
          onClick={handleSelectPage}
          theme="dark"
          style={{ backgroundColor: "#333333" }}
          mode="inline"
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item
            style={{ marginTop: 0 }}
            key="1"
            icon={<VideoCameraOutlined />}
          >
            Quản lý video
          </Menu.Item>
          <Menu.Item key="2" icon={<HeartOutlined />}>
            Quản lý bài viết
          </Menu.Item>
          <Menu.Item key="3" icon={<ReadOutlined />}>
            Quản lý truyện
          </Menu.Item>
          <Menu.Item key="4" icon={<LineChartOutlined />}>
            Thống kê
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ backgroundColor: "#efefef" }}>
        <Content
          className="content"
          style={{ margin: "24px 16px 0", marginBottom: "20px" }}
        >
          <Title level={4} style={{ fontWeight: "bold" }}>
            {pageName()}
          </Title>
          <div className="site-layout-background" style={{ padding: 24 }}>
            {page()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(DashboardPage);
