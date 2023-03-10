import asyncHandler from "express-async-handler";
import User from "../models/user.model";
import { generateToken } from "../utils/token";
import { registerSchema, loginSchema } from "../validations/user.validation";
import bcrypt from "bcryptjs";
import { RequestWithUser } from "../interfaces/auth.interface";
import { NextFunction } from "express";

// @desc    Register user
// @route   POST /users
// @access  Public
const register = asyncHandler(async (req, res) => {
  if (registerSchema.validate(req.body).error) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  const { name, email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({ name, email, password: hashedPassword });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Login user
// @route   POST /users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  if (loginSchema.validate(req.body).error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   GET /users/me
// @access  Private
const getMe = asyncHandler(async (req: RequestWithUser, res) => {
  res.status(200).json(req.user);
});

export { register, login, getMe };
