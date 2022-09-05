import express from "express";
import {
  createPost,
  uploadImage,
  PostByUser,
  userPost,
  updatePost,
  deletePost,
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
module.exports = router;
