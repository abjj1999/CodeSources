import express from "express";
import { createPost, uploadImage, PostByUser } from "../controllers/post";
import formidable from "express-formidable";
const router = express.Router();
import { requireSignin } from "../middlewares/auth";

router.post("/create-post", requireSignin, createPost);
router.post(
  "/upload-image",
  requireSignin,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);

router.get("/getAllposts", requireSignin, PostByUser);
PostByUser;
module.exports = router;
