import jwt from "jsonwebtoken";
import { Schema } from "mongoose";
import { Types } from "mongoose";

const generateToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};

export { generateToken };
