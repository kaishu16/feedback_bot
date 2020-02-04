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
    res.status(200).end();
    // ここから追加
    const events = req.body.events;
    const promises = [];
    for (let i = 0, l = events.length; i < l; i++) {
      const ev = events[i];
      promises.push(
        echoman(ev)
      );
      console.log(promises);
    }
    Promise.all(promises).then(console.log("pass"));
  }

  // 追加
  async function echoman(ev) {
    const pro =  await client.getProfile(ev.source.userId);
    console.log(pro);
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: `${pro.displayName}さん、今「${ev.message.text}」って言いました？`
    })
  }

// function lineBot(req, res) {
//
//   let answerObj;
//   let replyToken;
//   let replyData;
//
//   res.status(200).end();
//
//   const events = req.body.events;
//   const promises = [];
//
//   events.forEach((event) => {
//     replyToken = event.replyToken;
//     //入力メッセージ
//     console.log(event);
//
//
//
//     //返信データ作成
//     // console.log('データ作成');
//
//
//     promises.push(
//       getAnswerObj(event, jsonFile)
//     );
//     console.log(promises);
//   });
//   Promise.all(promises).then(console.log("pass"));
//
//
// }
//
// function getAnswerObj(data, jsonFile){
//   switch (data.type){
//       case 'message':
//           console.log('メッセージの場合');
//               // テキストメッセージの場合、入力された文字列に応じて分岐
//               if (data.message.text == '振り返り') {
//                   const pro = client.getProfile(data.source.userId);
//                   console.log(data.source.userId);
//                   console.log(pro);
//                   pro.then(res => {console.log(res);})
//                   let reply = jsonFile.first_message;
//                   message = JSON.stringify(reply);
//                   console.log(message);
//                   return client.replyMessage(data.replyToken, message);
//               }
//       case 'postback':
//           console.log('postbackの場合');
//           return jsonFile[data.postback.data];
//       // default :
//       //     console.log('それ以外の場合');
//       //     console.log(data);
//       //     return jsonFile.otherType;
//   }
// };

//
//   const userMessage = ev.message.text;
//
//   let message;
//   message = {
//       type: "text",
//       text: userMessage
//   };
//
//
//
//   const pro = await client.getProfile(ev.source.userId);
//   let reply = '';
//
//   if (userMessage == "振り返り"){
//     reply = `${pro.displayName}さんお疲れ様です！今日も学習を振り返っていきましょう！`;
//     // answer = first_question(ev.source.userId);
//     // userMessage = answer;
//
//     // setTimeout(() => {
//     //   client.pushMessage(ev.source.userId, {
//     //       type: 'text',
//     //       text: `また分からない点や悩んでいることがあったら連絡ください！頑張っていきましょうー！`,
//     //   });
//     // },2000);
//   }
//
//
// }
