import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import UserRoutes from "../../components/routes/UserRoutes";
import { toast } from "react-toastify";
import Post from "../../components/cards/Post";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
const PostComments = () => {
  const router = useRouter();
  const _id = router.query._id;
  const [post, setPost] = useState({});
  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      console.log(data);
      setPost(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeComment = async (postId, comment) => {
    // console.log(postId, comment);
    let answer = window.confirm("are you sure");
    if (!answer) {
      return;
    }
    try {
      const { data } = await axios.put("/remove-comment", {
        postId,
        comment,
      });
      console.log(data);
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="">
        <div className="row py-5">
          <div className="col">
            <h1 className="display-3 text-center">Post</h1>
          </div>
        </div>
        <div className="container pt-5 col-md-8 offset-md-2">
          <Link href={`/user/dashboard`}>
            <a class=" w-25 text-secondary  d-flex justify-content-start pt-2 backBtn mb-3">
              <ArrowLeftOutlined style={{ fontSize: "150%" }} className="p-1" />
            </a>
          </Link>
          <Post post={post} commentCount={100} removeComment={removeComment} />
        </div>
      </div>
    </>
  );
};

export default PostComments;
