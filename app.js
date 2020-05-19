const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const line = require("@line/bot-sdk");
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

// create LINE SDK client
const client = new line.Client(configLineMessaging);

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(configLineMessaging), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

module.exports = app;
