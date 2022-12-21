import express from "express";
import {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goal.controller";
import { auth } from "../middlewares/auth.middleware";
const router = express.Router();

router.route("/").get(auth, getGoals).post(auth, setGoal);

router.route("/:id").patch(auth, updateGoal).delete(auth, deleteGoal);

export default router;
