import { config } from "dotenv";

config();

export const PORT = process.env.PORT || "3000";
export const DB_URL = process.env.DB_URL || "mongodb://localhost:27017";
export const APP_URL = process.env.APP_URL || "http://localhost:3000";
export const NODE_ENV = process.env.NODE_ENV || "development";
export const APP_SECRET = process.env.APP_SECRET || "secret";
export const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID || "";
export const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET || "";

export default {
  PORT,
  DB_URL,
  APP_URL,
  NODE_ENV,
  APP_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
};
