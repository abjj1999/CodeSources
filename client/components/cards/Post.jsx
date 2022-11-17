import React, { useContext, useState, useEffect } from "react";
import renderHTML from "react-render-html";
import moment from "moment";

import { Avatar } from "antd";
import PostImage from "../images/PostImage";
import { useRouter } from "next/router";

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
import Link from "next/link";
import CommentM from "../popUps/CommentM";
const Post = ({
  post,

  handleLike,
  handleUnlike,
  handleComment,
  handleDelete,
  commentCount = 2,
  visible,
  setVisible,
  comment,
  setComment,
  addComment,
  removeComment,
}) => {
  const [state] = useContext(UserContext);
  const [open, setOpen] = useState(false);
  //for deleted post;
  const [dPost, setDPost] = useState({});
  const router = useRouter();

  return (
    <>
      {post && post.postedBy && (
        <div className="card mb-5" key={post._id}>
          <div className="card-header">
            <Avatar size={40} className="mb-2" src={imageSrc(post.postedBy)} />

            <span className="p-2 ml-5">{post.postedBy.name}</span>
            <span className="p-2 ml-5">{moment(post.createdAt).fromNow()}</span>
          </div>
          <div className="card-body">{renderHTML(post.content)}</div>
          <div className="pt-3 ">
            {post.Image && <PostImage url={post.Image.url} />}
          </div>
          <div className="card-footer d-flex pt-2 justify-content-between">
            <div className="likesContainer d-flex">
              {state &&
              state.user &&
              post.likes &&
              post.likes.includes(state.user._id) ? (
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
              <CommentOutlined
                onClick={() => handleComment(post)}
                className="text-danger pt-2 h5"
              />
              <div className="p-2">
                <Link href={`/post/${post._id}`}>
                  <a>{post.comments.length} Comments</a>
                </Link>
              </div>
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

          {/* comments */}
          {post.comments && post.comments.length > 0 && (
            <ol className="list-group">
              {post.comments.slice(0, commentCount).map((comment) => (
                <li
                  key={comment._id}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="d-flex ">
                      <Avatar
                        size={20}
                        className="mb-1 mr-3"
                        src={imageSrc(comment.postedBy)}
                      />
                      <h6 className="m-1">{comment.postedBy.name}</h6>
                    </div>
                    <div>{comment.text}</div>
                  </div>
                  <span className="badge text-muted rounded-pill">
                    {moment(comment.created).fromNow()}
                    {state &&
                      state.user &&
                      state.user._id === comment.postedBy._id && (
                        <div className="ml-auto mt-1">
                          <DeleteOutlined
                            onClick={() => removeComment(post._id, comment)}
                            className="pl-3 text-danger"
                          />
                        </div>
                      )}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      <DeletePostModel
        open={open}
        setOpen={setOpen}
        setDPost={setDPost}
        dPost={dPost}
        handleDelete={handleDelete}
      />
      <CommentM
        visible={visible}
        setComment={setComment}
        addComment={addComment}
        setVisible={setVisible}
        comment={comment}
      />
    </>
  );
};

export default Post;
