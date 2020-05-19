const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const line = require("@line/bot-sdk");
const middleware = require('@line/bot-sdk').middleware
const JSONParseError = require('@line/bot-sdk').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed
//require config
const config = require("./config/index");

const indexRouter = require("./routes/index");
const DOSCGRouter = require("./routes/DOSCG");

//import middleware
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 วินาที
  max: 5, // limit each IP to 100 requests per windowMs
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
app.use("/", errorHandler);

const configLineMessaging = {
  channelAccessToken: config.LINE_MESSAGING_API_ACCESS_TOKEN,
  channelSecret: config.LINE_MESSAGING_API_SECRET,
};

app.use(middleware(configLineMessaging));

app.post('/webhook', (req, res) => {
  res.json(req.body.events) // req.body will be webhook event object
})

app.use((err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    res.status(401).send(err.signature)
    return
  } else if (err instanceof JSONParseError) {
    res.status(400).send(err.raw)
    return
  }
  next(err) // will throw default 500
})

module.exports = app;