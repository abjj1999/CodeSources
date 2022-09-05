import React, { useContext } from "react";
import renderHTML from "react-render-html";
import moment from "moment";
import { Avatar } from "antd";
import PostImage from "../images/PostImage";
import { useRouter } from "next/router";
import {
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { UserContext } from "../../context";

const PostList = ({ posts }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();
  return (
    <>
      {posts &&
        posts.map((post) => (
          <div className="card mb-5" key={post._id}>
            <div className="card-header">
              <Avatar size={40} className="mb-2">
                {post.postedBy.name[0]}
              </Avatar>
              <span className="p-2 ml-5">{post.postedBy.name}</span>
              <span className="p-2 ml-5">
                {moment(post.createdAt).fromNow()}
              </span>
            </div>
            <div className="card-body">{renderHTML(post.content)}</div>
            <div className="pt-3 ">
              {post.Image && <PostImage url={post.Image.url} />}
            </div>
            <div className="card-footer d-flex pt-2 justify-content-between">
              <div className="likesContainer d-flex">
                <HeartOutlined className="text-danger pt-2 h5" />
                <div className="p-2">3 likes</div>
                <CommentOutlined className="text-danger pt-2 h5" />
                <div className="p-2">3 Comments</div>
              </div>

              {state && state.user && state.user._id === post.postedBy._id && (
                <div className="editandDeleteCont d-flex  justify-content-between">
                  <DeleteOutlined className="text-danger p-2 h5 mx-auto" />
                  <EditOutlined
                    onClick={() => router.push(`/user/post/${post._id}`)}
                    className="text-danger p-2 h5 mx-auto"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export default PostList;
