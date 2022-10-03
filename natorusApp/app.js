const express = require("express");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();

//Middlewares here will apply to all routes
app.use(express.json());
app.use((req, res, next) => {
  req.date;
  console.log("Hello from middleware");
  next();
});

const APPVERSION = "v1";

//Routes
//This are also middlewares but applied just to the resource/URL that I'm espicifying
app.use(`/api/${APPVERSION}/tours`, tourRouter);
app.use(`/api/${APPVERSION}/users`, userRouter);

module.exports = app;
