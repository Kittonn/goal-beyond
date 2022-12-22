import asyncHandler from "express-async-handler";
import Goal from "../models/goal.model";
import { RequestWithUser } from "../interfaces/auth.interface";
import { goalSchema } from "../validations/goal.validation";

// @desc Get all goals
// @route GET /goals
// @access Private
const getGoals = asyncHandler(async (req: RequestWithUser, res) => {
  const goals = await Goal.find({ user: req.user._id });

  res.status(200).json(goals);
});

// @desc Set a goal
// @route POST /goals
// @access Private
const setGoal = asyncHandler(async (req: RequestWithUser, res) => {
  if (goalSchema.validate(req.body).error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
  const goal = await Goal.create({ text: req.body.text, user: req.user._id });

  res.status(200).json(goal);
});

// @desc Update a goal
// @route PATCH /goals/:id
// @access Private
const updateGoal = asyncHandler(async (req: RequestWithUser, res) => {
  if (goalSchema.validate(req.body).error) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  if (goal.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateGoal);
});

// @desc Delete a goal
// @route DELETE /goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req: RequestWithUser, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  if (goal.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await Goal.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});

export { getGoals, setGoal, updateGoal, deleteGoal };
