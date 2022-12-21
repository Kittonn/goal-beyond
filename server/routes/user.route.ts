import express from "express";
import { register, login, getMe } from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";
const router = express.Router();

router.route("/").post(register);

router.route("/login").post(login);

router.route("/me").get(auth, getMe);

export default router;
