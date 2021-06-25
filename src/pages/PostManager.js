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
import { calcTimeRangeUntilNow } from "../utils/string";

export const PostManger = () => {
  const columns = [
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (text) => (
        <a className="link" href={text} target="_blank">
          {text}
        </a>
      ),
    },
    {
      title: "Đăng lúc",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <a>{calcTimeRangeUntilNow(text)}</a>;
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a className="link-danger">Xóa bài viết</a>
        </Space>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const rawData = useRef([]);

  const fetchPosts = () => {
    firebase
      .firestore()
      .collection(CollectionName.POSTS)
      .orderBy("createdAt", "desc")
      // .get()
      // .then((qry) => {
      //   let temp = [];
      //   qry.forEach((doc, index) => {
      //     temp.push({
      //       url: doc.data().url,
      //       createdAt: doc.data().createdAt.toDate(),
      //     });
      //   });
      .onSnapshot((qry) => {
        let temp = [];
        qry.forEach((doc, index) => {
          temp.push({
            url: doc.data().url,
            createdAt: doc.data().createdAt?.toDate(),
          });
        });
        setData(temp);
      });
  };

  const pushPost = async () => {
    await firebase.firestore().collection(CollectionName.POSTS).add({
      countLovedUsers: 0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lovedUsers: [],
      url: newUrl,
    });
    setNewUrl("");

    // .doc("poH9MDxOwYT2cA7G9piH")
    // .update({
    //   videos: [...rawData.current, url],
    // })
    // .then(() => fetchPosts());
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const [newUrl, setNewUrl] = useState("");

  const handleChange = (e) => {
    setNewUrl(e.target.value);
  };

  const handleAdd = () => {
    pushPost(newUrl);
  };

  return (
    <div>
      <h6 style={{ marginBottom: 10 }}>Thêm bài viết</h6>
      <Row style={{ marginBottom: 24 }}>
        <Input
          style={{ flex: 1, marginRight: 24 }}
          prefix={<LinkOutlined style={{ marginRight: 10 }} />}
          onChange={handleChange}
          placeholder="https://www.website.com/url"
          size="large"
          value={newUrl}
        />
        <Button
          onClick={handleAdd}
          size="large"
          type="primary"
          htmlType="submit"
          style={{ paddingLeft: 40, paddingRight: 40 }}
        >
          Thêm
        </Button>
      </Row>
      {/* <Row style={{ flexDirection: "row-reverse" }}>
        <p>
          Tổng cộng: <b>{data.length}</b>
        </p>
      </Row> */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 7 }}
        showTotal={(total) => `Total ${total} items`}
      />
    </div>
  );
};
