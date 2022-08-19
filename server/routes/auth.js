import express from "express";

const router = express.Router();
import { register, login, currentUser, forgotPW } from "../controllers/auth";
import { requireSignin } from "../middlewares/auth";

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPW);
router.get("/current-user", requireSignin, currentUser);

module.exports = router;
