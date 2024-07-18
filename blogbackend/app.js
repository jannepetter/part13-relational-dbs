const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const readingListRouter = require("./controllers/readingList")
const logoutRouter = require("./controllers/logout")
const middleware = require("./utils/middleware");

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use("/api/login",loginRouter)
app.use("/api/logout",middleware.userExtractor,logoutRouter)
app.use("/api/blogs", middleware.userExtractor, blogRouter);
app.use("/api/readinglist", middleware.userExtractor, readingListRouter);
app.use("/api/users", userRouter)

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
