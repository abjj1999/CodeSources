var jwt = require("express-jwt");
import Post from "../models/Post";
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
