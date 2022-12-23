import { config } from "dotenv";

config();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
export { allowedOrigins };
