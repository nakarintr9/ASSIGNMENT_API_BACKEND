
const express = require('express');
const line = require("@line/bot-sdk");
const {
  LINE_MESSAGING_API_ACCESS_TOKEN,
  LINE_MESSAGING_API_SECRET,
} = require("./config/index");

const config = {
  channelAccessToken: LINE_MESSAGING_API_ACCESS_TOKEN,
  channelSecret: LINE_MESSAGING_API_SECRET
};

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

app.listen(3000);