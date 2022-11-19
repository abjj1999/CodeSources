import React, { useContext, useEffect, useState } from "react";
import { Avatar, Card } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { ArrowLeftOutlined, RollbackOutlined } from "@ant-design/icons";

const Username = () => {
  const [state, setState] = useContext(UserContext);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  //to fetch followings we have to use UseEffect
  useEffect(() => {
    if (router.query.username) {
      fetchUser();
      //   fetchPosts();
    }
  }, [router.query.username]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/user/${router.query.username}`);
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  //   finish later
  const fetchPosts = async (req, res) => {
    try {
      const { data } = await axios.get(`/posts/${router.query.username}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const imageSrc = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "/images/logo.png";
    }
  };

  return (
    <div className="row col-md-6 offset-md-3">
      <Link href={`/user/dashboard`}>
        <a class=" w-25 text-secondary  d-flex justify-content-start pt-2 backBtn mt-3">
          <ArrowLeftOutlined style={{ fontSize: "150%" }} className="p-1" />
        </a>
      </Link>
      <div className="pt-5 pb-5">
        <Card hoverable cover={<img src={imageSrc(user)} />}>
          <Card.Meta title={user.name} description={user.about} />
          <p className="pt-2 text-muted">
            Joined: {moment(user.createdAt).fromNow()}
          </p>
          <div className="d-flex justify-content-between">
            <span className="btn btn-sm">
              {user.followers && user.followers.length} Followers
            </span>
            <span className="btn btn-sm">
              {user.following && user.following.length} Followering
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Username;
