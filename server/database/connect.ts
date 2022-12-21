import mongoose from "mongoose";

mongoose.set('strictQuery', true)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
  } catch (error) {
    console.log(error);
  }
};

export { connectDB };
