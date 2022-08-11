import express from "express";

const router = express.Router();

import { getAllUsers } from "../controllers/user";

router.get("/users", getAllUsers);

module.exports = router;
