import { SearchOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context";
import axios from "axios";
import People from "./People/People";
import { toast } from "react-toastify";
const Search = ({ newsFeed }) => {
  const [state, setState] = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [res, setRes] = useState([]);
  const handleSearch = async (e) => {
    e.preventDefault();
    // console.log(query);
    try {
      const { data } = await axios.get(`/search-user/${query}`);
      //   console.log(data);
      setRes(data);
    } catch (error) {}
  };

  const handleUnfollow = async (user) => {
    // console.log("follow btn clicked");
    try {
      const { data } = await axios.put("/user-unfollow", { _id: user._id });
      console.log(data);
      //localStorage updating user, but keeping the token
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      //uodating the state
      setState({ ...state, user: data });
      // uodate people statuses
      let filtered = res.filter((p) => p._id !== user._id);
      setRes(filtered);
      //reRender post by following array
      newsFeed();
      toast.error(`Unfollowed ${user.name}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFollow = async (user) => {
    // console.log("unfollow btn clicked");
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id });
      console.log("unfollow res coming back from be => ", data);
      //localStorage updating user, but keeping the token
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      //uodating the state
      setState({ ...state, user: data });
      // uodate people statuses
      let filtered = res.filter((p) => p._id !== user._id);
      setRes(filtered);
      //reRender post by following array
      newsFeed();
      toast.success(`Following ${user.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-3">
      <form className=" row" onSubmit={handleSearch}>
        <div className="col-8">
          <input
            type="search"
            className="form-control"
            onChange={(e) => {
              setQuery(e.target.value);
              setRes([]);
            }}
            value={query}
            placeholder="Search"
          />
        </div>
        <div className="col-4">
          <button className="btn btn-outline-primary col-12" type="submit">
            <SearchOutlined />
          </button>
        </div>
      </form>
      {res && (
        <People
          people={res}
          handleFollow={handleFollow}
          handleUnfollow={handleUnfollow}
        />
      )}
    </div>
  );
};

export default Search;
