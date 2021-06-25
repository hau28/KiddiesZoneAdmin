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

export const VideoManager = () => {
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
      title: "Xem trước",
      dataIndex: "url",
      key: "preview",
      render: (text) => (
        <Iframe
          url={`https://www.youtube.com/embed/${processUrl(text)}`}
          width="175"
          height="98"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
      ),
    },

    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a className="link-danger">Xóa video</a>
        </Space>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const rawData = useRef([]);

  const fetchMovies = () => {
    firebase
      .firestore()
      .collection(CollectionName.GAMES)
      .where("key", "==", "Movies")
      .get()
      .then((querySnapshot) => {
        const doc = querySnapshot.docs[0];
        const res = { ...doc.data(), _id: doc.id };
        rawData.current = res.videos;
        let movieObject = [];
        res.videos.map((vid) => {
          movieObject.push({ url: `https://www.youtube.com/watch?v=${vid}` });
        });
        setData(movieObject.reverse());
      });
  };

  const pushMovie = (url) => {
    firebase
      .firestore()
      .collection(CollectionName.GAMES)
      .doc("poH9MDxOwYT2cA7G9piH")
      .update({
        videos: [...rawData.current, url],
      })
      .then(() => fetchMovies());
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const [newUrl, setNewUrl] = useState("");

  const processUrl = (url) => {
    for (let i = 0; i < url.length; i++) {
      if (url[i] === "=") {
        return url.slice(i + 1);
      }
    }
  };

  const handleChange = (e) => {
    setNewUrl(e.target.value);
  };

  const handleAdd = () => {
    const final = processUrl(newUrl);
    pushMovie(final);
  };

  return (
    <div>
      <h6 style={{ marginBottom: 10 }}>Thêm video</h6>
      <Row style={{ marginBottom: 24 }}>
        <Input
          style={{ flex: 1, marginRight: 24 }}
          prefix={<LinkOutlined style={{ marginRight: 10 }} />}
          onChange={handleChange}
          placeholder="https://www.youtube.com/watch?v=mm1mcwu3c3A"
          size="large"
        />
        <Button
          disabled={!newUrl}
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
        pagination={{ pageSize: 3 }}
        showTotal={(total) => `Total ${total} items`}
      />
    </div>
  );
};
