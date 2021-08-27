import { config } from "dotenv";

config();

export const PORT = process.env.PORT || "3000";
export const DB_URL = process.env.DB_URL || null;
export const APP_URL = process.env.APP_URL || `http://localhost:${PORT}`;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const APP_SECRET = process.env.APP_SECRET || null;

export default {
  PORT,
  DB_URL,
  APP_URL,
  NODE_ENV,
  APP_SECRET,
};
