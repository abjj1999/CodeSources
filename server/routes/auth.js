import express from "express";

const router = express.Router();
import {
  register,
  login,
  currentUser,
  forgotPW,
  profileUpdate,
  findPeople,
  addFollower,
  userFollow,
  getFollowings,
  userUnfollow,
  removeFollower,
  searchUser,
  getUser,
} from "../controllers/auth";
import { isAdmin, requireSignin } from "../middlewares/auth";

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPW);
router.get("/current-user", requireSignin, currentUser);

router.put("/profile-update", requireSignin, profileUpdate);
router.get("/find-people", requireSignin, findPeople);
router.put("/user-follow", requireSignin, addFollower, userFollow);
router.get("/user-following", requireSignin, getFollowings);
router.put("/user-unfollow", requireSignin, removeFollower, userUnfollow);

router.get("/search-user/:query", requireSignin, searchUser);
router.get("/user/:username", getUser);

router.get("/current-admin", requireSignin, isAdmin, currentUser);
module.exports = router;
