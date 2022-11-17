import React, { useContext } from "react";
import { Avatar, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import { imageSrc } from "../../functions";
const People = ({ people, handleFollow, handleUnfollow }) => {
  const [state] = useContext(UserContext);

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
                  {state &&
                  state.user &&
                  p.followers &&
                  p.followers.includes(state.user._id) ? (
                    <span
                      onClick={() => handleUnfollow(p)}
                      className="text-primary pointer"
                    >
                      Unfollow
                    </span>
                  ) : (
                    <span
                      onClick={() => handleFollow(p)}
                      className="text-primary pointer"
                    >
                      Follow
                    </span>
                  )}
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
