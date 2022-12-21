import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOptions } from "./configs/corsOptions";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import mongoose from "mongoose";
import { logEvents } from "./middlewares/logger";
import { connectDB } from "./database/connect";
import userRoute from "./routes/user.route";
import goalRoute from "./routes/goal.route";

config();
connectDB();

const PORT = process.env.PORT || 5000;

const app: Application = express();

app.use(logger);
app.use(cors<Request>(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/users", userRoute);
app.use("/goals", goalRoute);

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("💡 Connected to MongoDB");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
