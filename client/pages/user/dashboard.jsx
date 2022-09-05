import React, { useContext, useState, useEffect } from "react";
import UserRoutes from "../../components/routes/UserRoutes";
import { UserContext } from "../../context";
import CreatePostForm from "../../components/forms/CreatePostForm";
import PostList from "../../components/cards/PostList";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [state, setState] = useContext(UserContext);
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  //state,
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (state && state.token) fetchUserpost();
  }, [state && state.token]);

  const fetchUserpost = async () => {
    try {
      const { data } = await axios.get("/getAllposts");
      // console.log(data);
      setPosts(data);
    } catch (error) {}
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log(content);
    try {
      const { data } = await axios.post("/create-post", {
        content,
        image,
      });
      console.log("Created post", data);
      if (data.error) {
        toast.error(data.error);
      } else {
        fetchUserpost();
        toast.success("Post Created");
        setContent("");
        setImage({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = async (e) => {
    // e.preventDefault()
    const file = e.target.files[0];

    let formData = new FormData();
    formData.append("image", file);
    // formData.append("content", content);
    // console.log([...formData]);

    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      // console.log("uploaded image data", data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
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
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
            <br />
            <PostList posts={posts} fetchUserpost={fetchUserpost} />
          </div>
          {/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}
          <div className="col-md-4 border">Sidebar</div>
        </div>
      </div>
    </UserRoutes>
  );
};

export default Dashboard;
