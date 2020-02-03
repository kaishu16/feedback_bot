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

async function lineBot(req, res) {
  res.status(200).end();
  // ここから追加
  const events = req.body.events;
  const promises = [];

  events.forEach((event) =>{
    const userMessage = event.message.text;

    let message;
    message = {
        type: "text",
        text: userMessage
    };



    const pro = await client.getProfile(event.source.userId);
    let reply = '';

    if (userMessage == "振り返り"){
      reply = `${pro.displayName}さんお疲れ様です！今日も学習を振り返っていきましょう！`;
      promises.push(client.replyMessage(event.replyToken, {
        type: "text",
        text: reply
      });
  }


  // for (let i = 0, l = events.length; i < l; i++) {
  //   const ev = events[i];
  //   promises.push(
  //     echoman(ev)
  //   );
  // }


  Promise.all(promises).then(console.log("pass"));


}

// 追加
// async function echoman(ev) {
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
//     answer = first_question(ev.source.userId);
//     // next_answer = second_question(ev.source.userId, answer)
//
//     setTimeout(() => {
//       client.pushMessage(ev.source.userId, {
//           type: 'text',
//           text: `また分からない点や悩んでいることがあったら連絡ください！頑張っていきましょうー！`,
//       });
//     },2000);
//   }
//
//   return client.replyMessage(ev.replyToken, {
//     type: "text",
//     text: reply
//   });
// }

// function first_question(userId) {
//   let question =
//   {
//     "type": "template",
//     "altText": "最初の質問",
//     "template": {
//         "type": "confirm",
//         "text": "本日も予定通り学習できましたか？",
//         "actions": [
//             {
//                 "type": "message",
//                 "label": "はい",
//                 "text": "はい"
//             },
//             {
//                 "type": "message",
//                 "label": "いいえ",
//                 "text": "いいえ"
//             }
//         ]
//     }
//   };
//   setTimeout(() => {
//     client.pushMessage(userId, question);
//   },2000);
//
//   return question.template.actions.text;
//
// }
//
// function second_question(userId, ans) {
//   if (ans == "はい"){
//   let yes_question =
//   {
//     "type": "template",
//     "altText": "2個目の質問",
//     "template": {
//         "type": "confirm",
//         "text": "さすがです！上手く進められた要因として何があげられますか？",
//         "actions": [
//             {
//                 "type": "message",
//                 "label": "はい",
//                 "text": "はい"
//             },
//             {
//                 "type": "message",
//                 "label": "いいえ",
//                 "text": "いいえ"
//             }
//         ]
//     }
//   };
//   setTimeout(() => {
//     client.pushMessage(userId, yes_question);
//   },2000);
//
//   return yes_question.template.actions.text;
//
//   };
//
//   if (ans == "いいえ"){
//   let no_question =
//   {
//     "type": "template",
//     "altText": "2個目の質問",
//     "template": {
//         "type": "confirm",
//         "text": "なるほど！予定通り進まなかった要因として何があげられますか？",
//         "actions": [
//             {
//                 "type": "message",
//                 "label": "はい",
//                 "text": "はい"
//             },
//             {
//                 "type": "message",
//                 "label": "いいえ",
//                 "text": "いいえ"
//             }
//         ]
//     }
//   };
//   setTimeout(() => {
//     client.pushMessage(userId, no_question);
//   },2000);
//
//   return no_question.template.actions.text;
//   };
//
// }
// //
// // function third_question(userId, answer) {
// //   if (answer == "yes"){
// //   let yes_question =
// //   {
// //     "type": "template",
// //     "altText": "3個目の質問",
// //     "template": {
// //         "type": "confirm",
// //         "text": "なるほど！より質の高い学習をするにはどうすれば良いでしょうか？",
// //         "actions": [
// //             {
// //                 "type": "message",
// //                 "label": "はい",
// //                 "text": "はい"
// //             },
// //             {
// //                 "type": "message",
// //                 "label": "いいえ",
// //                 "text": "いいえ"
// //             }
// //         ]
// //     }
// //   };
// //   setTimeout(() => {
// //     client.pushMessage(userId, yes_question);
// //   },2000);
// //   };
// //
// //   if (answer == "no"){
// //   let no_question =
// //   {
// //     "type": "template",
// //     "altText": "3個目の質問",
// //     "template": {
// //         "type": "confirm",
// //         "text": "なるほど！予定通り進まなかった要因として何があげられますか？",
// //         "actions": [
// //             {
// //                 "type": "message",
// //                 "label": "はい",
// //                 "text": "はい"
// //             },
// //             {
// //                 "type": "message",
// //                 "label": "いいえ",
// //                 "text": "いいえ"
// //             }
// //         ]
// //     }
// //   };
// //   setTimeout(() => {
// //     client.pushMessage(userId, no_question);
// //   },2000);
// //   };
// //
// // }
// //
// //
// // function last_question(userId, answer) {
// //   let default = {
// //     type: 'text',
// //     text: `それではスケジュールノートをもとに明日の学習計画を見直していきましょう！`,
// //   }
// //   setTimeout(() => {
// //     client.pushMessage(userId, default);
// //   },2000);
// //
// //   if (answer == "yes"){
// //   let yes_question =
// //   {
// //     "type": "template",
// //     "altText": "最後の質問",
// //     "template": {
// //         "type": "confirm",
// //         "text": "明日の学習計画は変更しなくても良さそうですか？",
// //         "actions": [
// //             {
// //                 "type": "message",
// //                 "label": "はい",
// //                 "text": "はい"
// //             },
// //             {
// //                 "type": "message",
// //                 "label": "いいえ",
// //                 "text": "いいえ"
// //             }
// //         ]
// //     }
// //   };
// //   setTimeout(() => {
// //     client.pushMessage(userId, yes_question);
// //   },2000);
// //   };
// //
// //   if (answer == "no")
// //   let no_question =
// //   {
// //     "type": "template",
// //     "altText": "最後の質問",
// //     "template": {
// //         "type": "confirm",
// //         "text": "明日の学習計画は変更した方が良さそうですか？",
// //         "actions": [
// //             {
// //                 "type": "message",
// //                 "label": "はい",
// //                 "text": "はい"
// //             },
// //             {
// //                 "type": "message",
// //                 "label": "いいえ",
// //                 "text": "いいえ"
// //             }
// //         ]
// //     }
// //   };
// //   setTimeout(() => {
// //     client.pushMessage(userId, no_question);
// //   },2000);
// //   };
// //
// // }
