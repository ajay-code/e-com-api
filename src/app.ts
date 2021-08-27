import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import createError, { HttpError } from "http-errors";
import logger from "morgan";
import path from "path";
import indexRouter from "@routes/index";
import apiV1Router from "@routes/api/v1";
import errorHandler from "@middleware/errorHandler";
import notFound from "@middleware/notFound";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1", apiV1Router);

// catch 404
app.use(notFound);

// error handler
app.use(errorHandler);

export default app;
