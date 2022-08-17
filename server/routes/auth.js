import express from "express";

const router = express.Router();
import { register, login, currentUser } from "../controllers/auth";
import { requireSignin } from "../middlewares/auth";

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", requireSignin, currentUser);

module.exports = router;
