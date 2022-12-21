import express from "express";
import { register, login, getMe } from "../controllers/user.controller";
const router = express.Router();

router.route("/").post(register);

router.route("/login").post(login);

router.route("/me").get(getMe);

export default router;
