var jwt = require("express-jwt");
import Post from "../models/Post";
import User from "../models/User";
export const requireSignin = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const canEditDeletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);
    // console.log("edit delete middleware", post);
    if (req.user._id != post.postedBy) {
      // console.log("error");
      return res.status(400).send("You can not edit");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const admin = await User.findById(req.user._id);
    if (admin.role !== "admin") {
      return res.status(400).send("Admin resource. Access denied.");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
