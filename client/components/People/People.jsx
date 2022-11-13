import React, { useContext } from "react";
import { Avatar, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";

const People = ({ people, handleFollow }) => {
  const [state] = useContext(UserContext);
  const imageSrc = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "/images/logo.png";
    }
  };
  const router = useRouter();

  return (
    <div>
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
                    className="text-primary pointer"
                    onClick={() => handleFollow(p)}
                  >
                    Follow
                  </span>
                </div>
              }
              description={p.name}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default People;
