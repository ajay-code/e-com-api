import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import createError, { HttpError } from "http-errors";
import logger from "morgan";
import path from "path";
import indexRouter from "@routes/index";
import usersRouter from "@routes/users";
import apiV1Router from "@routes/api/v1";

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
app.use("/users", usersRouter);
app.use("/api/v1", apiV1Router);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: Function) => {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: Function) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
