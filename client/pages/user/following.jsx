import React, { useContext, useEffect, useState } from "react";
import { Avatar, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import axios from "axios";
import Link from "next/link";
import { ArrowLeftOutlined, RollbackOutlined } from "@ant-design/icons";
const Following = () => {
  const [state] = useContext(UserContext);
  const [people, setPeople] = useState([]);

  //to fetch followings we have to use UseEffect
  useEffect(() => {
    if (state && state.token) {
      fetchFollowings();
    }
  }, [state && state.token]);

  const fetchFollowings = async () => {
    try {
      const { data } = await axios.get("/user-following");
      // console.log(data);
      setPeople(data);
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
  const router = useRouter();

  const handleFollow = async () => {};

  return (
    <div className="row col-md-6 offset-md-3">
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(p) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={imageSrc(p)} />}
              title={
                <div className="d-flex justify-content-between">
                  {p.username}{" "}
                  <span
                    className="text-danger pointer"
                    onClick={() => handleFollow(p)}
                  >
                    UnFollow
                  </span>
                </div>
              }
              description={p.name}
            />
          </List.Item>
        )}
      />
      <Link href={`/user/dashboard`}>
        <a class=" w-25 text-secondary  d-flex justify-content-start pt-2 backBtn">
          <ArrowLeftOutlined style={{ fontSize: "120%" }} className="p-1" />
        </a>
      </Link>
    </div>
  );
};

export default Following;
