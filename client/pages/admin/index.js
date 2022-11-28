import React, { useContext, useState, useEffect } from "react";
import AdminRoutes from "../../components/routes/AdminRoutes";
import { UserContext } from "../../context";
import renderHTML from "react-render-html";
import axios from "axios";

const AdminDashboard = () => {
  const [state, setState] = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (state && state.token) {
      newsFeed();
    }
  }, [state && state.token]);

  const newsFeed = async () => {
    try {
      // console.log(page);
      const { data } = await axios.get(`/posts`);
      //   console.log(data);
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (post) => {
    try {
      const { data } = await axios.delete(`/admin/delete-post/${post._id}`);
      // toast.error("Post Deleted");
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
    <AdminRoutes>
      <div className="container-fluid">
        <div className="row py-5">
          <div className="col">
            <h1 className=" text-center">Admin</h1>
          </div>
        </div>

        <div className="row py-4">
          <div className="col-md-8 offset-md-2 ">
            {posts &&
              posts.map((p) => (
                <div
                  className="d-flex justify-content-between mb-5 border p-2"
                  key={p._id}
                >
                  <div>
                    <b>Content: </b> {renderHTML(p.content)} -{" "}
                    <b>{p.postedBy.name}</b>
                  </div>
                  <div
                    className="text-danger pointer"
                    onClick={() => handleDelete(p)}
                  >
                    Delete
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </AdminRoutes>
  );
};

export default AdminDashboard;
