const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const line = require("@line/bot-sdk");
const config = {
  channelAccessToken: "idO248feFxuqcKrdEpIKMV0AMZreWQMaXpz7WCSZk4iyHUXRctIVPEs/87GHnJZqY7mdIwrZNcBapHOXdIRbKAEy6YWjFxbpgXoletiR61b7IohW+e/uKYUPqIdehm+wgiwwKO+en+5B+j8bk/ZJmgdB04t89/1O/w1cDnyilFU=",
  // process.env.ACCESS_TOKEN,
  channelSecret: "8782f465b4470116493504cbdaca3e30"
  // process.env.SECRET_KEY
};
const client = new line.Client(config);

let jsonFile = require("./question.json");

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

  let answerObj;
  let replyToken;
  let replyData;

  res.status(200).end();

  const events = req.body.events;
  const promises = [];

  events.forEach((event) => {
    replyToken = event.replyToken;
    //入力メッセージ
    console.log(event);



    //返信データ作成
    // console.log('データ作成');


    promises.push(
      getAnswerObj(event, jsonFile).then(value =>{
        if (value.postback.data == 'question2_yes'){
          getAnswerObj(value, jsonFile).then(value =>{
            getQuestion3YesObj(value, jsonFile)
          });
        }
        else {
          getAnswerObj(value, jsonFile);
        }
      })

    );
  });
  Promise.all(promises).then(console.log("pass"));


}

async function getAnswerObj(data, jsonFile){
  switch (data.type){
        case 'message':
          console.log('メッセージの場合');
              // テキストメッセージの場合、入力された文字列に応じて分岐
              if (data.message.text == '振り返り') {
                  const pro = await client.getProfile(data.source.userId);
                  let reply1 = jsonFile.first_message;
                  let reply2 = jsonFile.question1;
                  let message1 = JSON.stringify(reply1);
                  let message2 = JSON.stringify(reply2);
                  let send = JSON.parse(message1);
                  let question = JSON.parse(message2);
                  send.text = pro.displayName + send.text
                  let ok = [];
                  ok.push(send, question);
                  return client.replyMessage(data.replyToken, ok);
              }
        case 'postback':
            console.log('postbackの場合');
            let reply = jsonFile[data.postback.data];
            let message = JSON.stringify(reply);
            let question = JSON.parse(message);
            return client.replyMessage(data.replyToken, question);
          }
};

async function getQuestion3YesObj(data, jsonFile){
  if (data.type == 'message') {
      let reply = jsonFile.question3_yes;
      let message = JSON.stringify(reply);
      let send = JSON.parse(message);
      return client.replyMessage(data.replyToken, send);
  }
}


// case 'postback':
//     console.log('postbackの場合');
//     return jsonFile[data.postback.data];
