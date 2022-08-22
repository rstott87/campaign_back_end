require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var compression = require("compression");
var helmet = require("helmet");
var mongoose = require("mongoose");
var cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const AdminModel = require("./models/admin");

var app = express();

var mongoDB = process.env.MONGO_DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

require("./auth/auth");

app.use(function (req, res, next) {
  res.locals.token = req.token;
  next();
});

var secureRoute = require("./routes/privateRoute");
var publicRoute = require("./routes/publicRoute");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());

app.use("/", publicRoute);
app.use(
  "/private",
  passport.authenticate("jwt", { session: false }),
  secureRoute
);

// app.get("/", function (req, res, next) {
//   res.json({ msg: "This is CORS-enabled for all origins!" });
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
