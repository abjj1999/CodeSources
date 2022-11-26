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
const { Meta } = Card;
const HomePost = ({ post }) => (
  <Card
    style={{
      width: 500,
      margin: "10px",
      padding: "10px",
    }}
    cover={post.Image && <PostImage url={post.Image.url} />}
  >
    <Meta
      avatar={<Avatar src={imageSrc(post.postedBy)} />}
      title={post.postedBy.name}
      description={moment(post.createdAt).fromNow()}
    />
  </Card>
);
export default HomePost;
