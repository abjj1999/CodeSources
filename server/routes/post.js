import express from "express";
import { createPost } from "../controllers/post";
const router = express.Router();
import { requireSignin } from "../middlewares/auth";

router.post("/create-post", requireSignin, createPost);

module.exports = router;
