import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";
import path from "path";
import indexRouter from "@routes/index";
import apiV1Router from "@routes/api/v1";
import errorHandler from "@middleware/errorHandler";
import notFound from "@middleware/notFound";
import { JWT_SECRET } from "@config/env";
import fileUpload from "express-fileupload";
import rateLimiter from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import cors from "cors";

const app = express();

// security middleware
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

// view engine setup
app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("tiny"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(JWT_SECRET));

// serving static files
app.use(express.static(path.join(__dirname, "../public")));

app.use(fileUpload());
app.use("/", indexRouter);
app.use("/api/v1", apiV1Router);

// catch 404
app.use(notFound);

// error handler
app.use(errorHandler);

export default app;
