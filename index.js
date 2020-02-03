const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const line = require("@line/bot-sdk");
const config = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET_KEY
};
const client = new line.Client(config);

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  // .get('/', (req, res) => res.render('pages/index'))
  // .get('/g/', (req, res) => res.json({method: "こんにちは、getさん"}))
  // .post('/p/', (req, res) => res.json({method: "こんにちは、postさん"}))
  .post("/hook/", line.middleware(config), (req, res) => lineBot(req, res))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

function lineBot(req, res) {
  res.status(200).end();
  // ここから追加
  const events = req.body.events;
  const promises = [];
  for (let i = 0, l = events.length; i < l; i++) {
    const ev = events[i];
    promises.push(
      echoman(ev)
    );
  }
  Promise.all(promises).then(console.log("pass"));


}

// 追加
async function echoman(ev) {

  const userMessage = ev.message.text;

  let message;
  message = {
      type: "text",
      text: userMessage
  };

  const pro = await client.getProfile(ev.source.userId);

  if (userMessage == "振り返り"){
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: `${pro.displayName}さんお疲れ様です！今日も学習を振り返っていきましょう！`
    })
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: `本日も予定通り学習できましたか？`
    })
  }
}
