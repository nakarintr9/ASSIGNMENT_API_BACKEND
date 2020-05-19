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

app.use('/webhook',bodyParser.urlencoded({ extended: false }));
app.use('/webhook',bodyParser.json());
app.post('/webhook', (req, res) => {
    console.log(req.body);
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    reply(reply_token, msg)
    res.sendStatus(200)
});

function reply(reply_token, msg) {
  let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer {xxxxxxx}'
  }
  let body = JSON.stringify({
      replyToken: reply_token,
      messages: [{
          type: 'text',
          text: msg
      }]
  })
  request.post({
      url: 'https://api.line.me/v2/bot/message/reply',
      headers: headers,
      body: body
  }, (err, res, body) => {
      console.log('status = ' + res.statusCode);
  });
}

module.exports = app;