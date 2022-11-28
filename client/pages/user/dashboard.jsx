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
import Pagination from "@mui/material/Pagination";
import CommentForm from "../../components/forms/CommentForm";
import CommentM from "../../components/popUps/CommentM";
import Search from "../../components/Search";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
  reconnection: true,
});

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
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (state && state.token) {
      newsFeed();
      findPeople();
    }
  }, [state && state.token, page]);

  useEffect(() => {
    try {
      axios.get("/total-posts").then(({ data }) => {
        console.log(data);
        setTotalPosts(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

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
      // console.log(page);
      const { data } = await axios.get(`/newsfeed/${page}`);
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
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
        setPage(1);
        //socket emitting
        socket.emit("new-post", data);
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

  const handleDelete = async (post) => {
    try {
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      // toast.error("Post Deleted");
      newsFeed();
    } catch (error) {
      console.log(error);
    }
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

  const paginate = (e, value) => {
    // setCurrentPage(value);
    console.log(value);
    setPage(value);
    // window.scrollTo({ top: 1800, behavior: "smooth" });
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
            <div className="d-flex justify-content-center mb-2">
              <Pagination
                color="standard"
                shape="rounded"
                defaultPage={page}
                count={Math.ceil(totalPosts / 3)}
                page={page}
                onChange={paginate}
                size="large"
                disabled
              />
            </div>
            <PostList
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              posts={posts}
              newsFeed={newsFeed}
              handleComment={handleComment}
              handleDelete={handleDelete}
              visible={visible}
              setComment={setComment}
              addComment={addComment}
              setVisible={setVisible}
              comment={comment}
            />
            <div className="d-flex justify-content-center mb-3">
              <Pagination
                color="standard"
                shape="rounded"
                defaultPage={page}
                count={Math.ceil(totalPosts / 3)}
                page={page}
                onChange={paginate}
                size="large"
              />
            </div>
          </div>
          {/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}
          <div className="col-md-4 border">
            <Search newsFeed={newsFeed} />
            <br />
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
        <CommentM
          visible={visible}
          setComment={setComment}
          addComment={addComment}
          setVisible={setVisible}
          comment={comment}
        />
      </div>
    </UserRoutes>
  );
};

export default Dashboard;
