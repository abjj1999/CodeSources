import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { imageSrc } from "../../functions";
import moment from "moment";
import PostImage from "../images/PostImage";
import renderHTML from "react-render-html";
const { Meta } = Card;

const HomePost = ({ post }) => (
  <Card
    style={{
      width: 400,
      margin: "10px",
      padding: "5px",
    }}
    cover={post.Image && <PostImage url={post.Image.url} />}
  >
    <Meta
      avatar={<Avatar src={imageSrc(post.postedBy)} />}
      title={post.postedBy.name}
      description={moment(post.createdAt).fromNow()}
    />
    <div className="mt-4">{renderHTML(post.content)}</div>
  </Card>
);
export default HomePost;
