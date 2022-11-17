import React, { useContext, useState, useEffect } from "react";

import { useRouter } from "next/router";

import Post from "./Post";

import { UserContext } from "../../context";

const PostList = ({
  posts,
  newsFeed,
  handleLike,
  handleUnlike,
  handleComment,
  handleDelete,
  visible,
  setVisible,
  comment,
  setComment,
  addComment,
}) => {
  const [state] = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (state && state.token) newsFeed();
  }, [state && state.token]);

  return (
    <>
      {posts &&
        posts.map((post) => (
          <Post key={post._id}
            post={post}
            handleDelete={handleDelete}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            handleComment={handleComment}
            newsFeed={newsFeed}
            visible={visible}
            setComment={setComment}
            addComment={addComment}
            setVisible={setVisible}
            comment={comment}
          />
        ))}
    </>
  );
};

export default PostList;
