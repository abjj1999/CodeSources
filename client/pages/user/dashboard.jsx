import React, { useContext, useState, useEffect } from "react";
import UserRoutes from "../../components/routes/UserRoutes";
import { UserContext } from "../../context";
import CreatePostForm from "../../components/forms/CreatePostForm";
import PostList from "../../components/cards/PostList";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import People from "../../components/People/People";
import Link from "next/link";
import { Modal } from "antd";
import CommentForm from "../../components/forms/CommentForm";

const Dashboard = () => {
  const [state, setState] = useContext(UserContext);
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  //state,
  const [content, setContent] = useState("");
  const router = useRouter();
  const [people, setPeople] = useState([]);
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  useEffect(() => {
    if (state && state.token) {
      newsFeed();
      findPeople();
    }
  }, [state && state.token]);

  const findPeople = async () => {
    try {
      const { data } = await axios.get("/find-people");
      setPeople(data);
    } catch (error) {
      console.log(error);
    }
  };
  const newsFeed = async () => {
    try {
      const { data } = await axios.get("/newsfeed");
      // console.log(data);
      setPosts(data);
    } catch (error) {}
  };

  const handleFollow = async (user) => {
    // console.log(user);
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id });
      // console.log("follow res coming back from be => ", data);
      //localStorage updating user, but keeping the token
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      //uodating the state
      setState({ ...state, user: data });
      // uodate people statuses
      let filtered = people.filter((p) => p._id !== user._id);
      setPeople(filtered);
      //reRender post by following array
      newsFeed();
      toast.success(`Following ${user.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log(content);
    try {
      const { data } = await axios.post("/create-post", {
        content,
        image,
      });
      // console.log("Created post", data);
      if (data.error) {
        toast.error(data.error);
      } else {
        newsFeed();
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
  const updateCounters = () => {
    if (!state.user.following) {
      return 0;
    } else {
      return state.user.following.length;
    }
  };

  const handleLike = async (_id) => {
    // console.log("like this post => ", _id);
    try {
      const { data } = await axios.put("/like-post", { _id });
      // console.log("liked post ", data);
      newsFeed();
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnlike = async (_id) => {
    try {
      const { data } = await axios.put("/unlike-post", { _id });
      // console.log("unliked post ", data);
      newsFeed();
    } catch (error) {
      console.log(error);
    }
  };

  //comment functions
  const handleComment = (post) => {
    setCurrentPost(post);
    setVisible(true);
    // console.log(post);
  };

  const addComment = async (e) => {
    e.preventDefault();
    // console.log("add comment to this post", currentPost._id);
    // console.log(comment);
    try {
      const { data } = await axios.put("/add-comment", {
        postId: currentPost._id,
        comment,
      });
      // console.log("added comment ", data);
      setComment("");
      setVisible(false);
      newsFeed();
    } catch (error) {
      console.log(error);
    }
  };
  const RemoveComment = async () => {};

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
            <PostList
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              posts={posts}
              newsFeed={newsFeed}
              handleComment={handleComment}
            />
          </div>
          {/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}
          <div className="col-md-4 border">
            {state && state.user && updateCounters() > 0 ? (
              <Link href={`/user/following`} className="btn ">
                <a className=" ">
                  <h4 className="text-muted text-center ">You Have </h4>
                  <h5 className="text-center text-light rounded bg-dark p-2">
                    <span className="font-weight-bold font-italic">
                      {updateCounters()}
                    </span>{" "}
                    Followings
                  </h5>
                </a>
              </Link>
            ) : (
              <>
                <h5 className="text-center text-dark">You have 0 followings</h5>

                <h6 className="text-center text-dark mb-4 ">
                  Add people you know
                </h6>
              </>
            )}
            <People people={people} handleFollow={handleFollow} />
          </div>
        </div>
        <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          title="Comment"
          footer={null}
        >
          <CommentForm
            comment={comment}
            setComment={setComment}
            addComment={addComment}
          />
        </Modal>
      </div>
    </UserRoutes>
  );
};

export default Dashboard;
