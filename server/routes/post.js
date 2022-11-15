import express from "express";
import {
  createPost,
  uploadImage,
  PostByUser,
  userPost,
  updatePost,
  deletePost,
  newsFeed,
  likePost,
  unlikePost,
  addComment,
  removeComment,
} from "../controllers/post";
import formidable from "express-formidable";
const router = express.Router();
import { canEditDeletePost, requireSignin } from "../middlewares/auth";

router.post("/create-post", requireSignin, createPost);
router.post(
  "/upload-image",
  requireSignin,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);

router.get("/getAllposts", requireSignin, PostByUser);

router.get("/user-post/:_id", requireSignin, userPost);

router.put("/update-post/:_id", requireSignin, canEditDeletePost, updatePost);
router.delete(
  "/delete-post/:_id",
  requireSignin,
  canEditDeletePost,
  deletePost
);

router.get("/newsfeed", requireSignin, newsFeed);
router.put("/like-post", requireSignin, likePost);
router.put("/unlike-post", requireSignin, unlikePost);
router.put("/add-comment", requireSignin, addComment);
router.delete("/remove-comment", requireSignin, removeComment);

module.exports = router;
