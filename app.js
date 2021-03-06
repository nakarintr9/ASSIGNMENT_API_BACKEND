const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const bodyParser = require('body-parser')
const request = require('request')

//require config
const config = require("./config/index");

const indexRouter = require("./routes/index");
const DOSCGRouter = require("./routes/DOSCG");
const authenRouter = require("./routes/authen");

//import middleware
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 วินาที
  max: 20, // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

app.use(helmet());

app.use(logger("dev"));
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/DOSCG", DOSCGRouter);
app.use("/authen", authenRouter);
app.use("/", errorHandler);

module.exports = app;