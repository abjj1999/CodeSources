import React, { useContext } from "react";
import { Avatar, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";

const People = ({ people }) => {
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
              title={
                <div className="d-flex justify-content-between">
                  {p.username} <span className="text-primary">Follow</span>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default People;
