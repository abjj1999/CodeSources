import React, { useContext, useState, useEffect } from "react";
import renderHTML from "react-render-html";
import moment from "moment";
import axios from "axios";
import { Avatar } from "antd";
import PostImage from "../images/PostImage";
import { useRouter } from "next/router";
import { Modal } from "antd";
import { toast } from "react-toastify";
import DeletePostModel from "../popUps/DeletePostModel";
import {
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { UserContext } from "../../context";
import { imageSrc } from "../../functions";

const PostList = ({ posts, newsFeed, handleLike, handleUnlike }) => {
  const [state] = useContext(UserContext);
  const [open, setOpen] = useState(false);
  //for deleted post;
  const [dPost, setDPost] = useState({});
  const router = useRouter();
  useEffect(() => {
    if (state && state.token) newsFeed();
  }, [state && state.token]);
  const handleDelete = async (post) => {
    try {
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      toast.error("Post Deleted");
      newsFeed();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {posts &&
        posts.map((post) => (
          <div className="card mb-5" key={post._id}>
            <div className="card-header">
              {/* <Avatar size={40} className="mb-2">
                {post.postedBy.name[0]}
              </Avatar> */}
              <Avatar
                size={40}
                className="mb-2"
                src={imageSrc(post.postedBy)}
              />

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
                {post.likes.includes(state.user._id) ? (
                  <HeartFilled
                    onClick={() => handleUnlike(post._id)}
                    className="text-danger pt-2 h5"
                  />
                ) : (
                  <HeartOutlined
                    onClick={() => handleLike(post._id)}
                    className="text-danger pt-2 h5"
                  />
                )}
                <div className="p-2">{post.likes.length} likes</div>
                <CommentOutlined className="text-danger pt-2 h5" />
                <div className="p-2">3 Comments</div>
              </div>

              {state && state.user && state.user._id === post.postedBy._id && (
                <div className="editandDeleteCont d-flex  justify-content-between">
                  <DeleteOutlined
                    onClick={() => {
                      setOpen(true);
                      setDPost(post);
                    }}
                    className="text-danger p-2 h5 mx-auto"
                  />
                  <EditOutlined
                    onClick={() => router.push(`/user/post/${post._id}`)}
                    className="text-danger p-2 h5 mx-auto"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      <DeletePostModel
        open={open}
        setOpen={setOpen}
        setDPost={setDPost}
        dPost={dPost}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default PostList;
