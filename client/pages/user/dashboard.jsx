import React, { useContext, useState } from "react";
import UserRoutes from "../../components/routes/UserRoutes";
import { UserContext } from "../../context";
import CreatePostForm from "../../components/forms/CreatePostForm";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [state, setState] = useContext(UserContext);
  //state,
  const [content, setContent] = useState("");
  const router = useRouter();

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log(content);
    try {
      const { data } = await axios.post("/create-post", {
        content,
      });
      console.log("Created post", data);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Post Created");
        setContent("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserRoutes>
      <div className="container-fluid">
        <div className="row py-5">
          <div className="col">
            <h1 className="display-1 text-center">feed</h1>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-md-8">
            <CreatePostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
            />
          </div>
          <div className="col-md-4 border">Sidebar</div>
        </div>
      </div>
    </UserRoutes>
  );
};

export default Dashboard;
