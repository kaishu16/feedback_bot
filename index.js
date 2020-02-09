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
  .post("/hook/", line.middleware(config), (req, res) => lineBot(req, res))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

  let study;
  let cause;
  let better;
  let final;

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

    if (event.type == 'postback'){
      if (event.postback.data == 'question2_yes')
      {
        study = 'question2_yes';
        promises.push(
          getAnswerObj(event, jsonFile)
        )
        console.log(study);
      }
     else if (event.postback.data == 'question2_no')
      {
        study = 'question2_no';
        promises.push(
          getAnswerObj(event, jsonFile)
        )
        console.log(study);
      }
      else if (event.postback.data == 'additional_question') {
          better = 'additional_question';
        promises.push(
          getAdditionalMessageObj(event, jsonFile)
        )
      }
      else if (event.postback.data == 'last_message') {
        final = 'complete';
        promises.push(
          getLastMessageObj(event, jsonFile)
        )
        console.log(final);
      }
    }

    if (event.type == 'message'){
      if (event.message.text == '振り返り')
      {
        study = '';
        cause = '';
        better = '';
        final = '';
        console.log(study);
        console.log(cause);
        console.log(better);
        console.log(final);
      }
    }

    console.log(study);
    console.log(cause);
    console.log(better);
    console.log(final);
    if (study == 'question2_yes' && event.type == 'message' && cause == '')
      {
        cause = 'last_question_yes'
        promises.push(
          getQuestion3_Yes2_Obj(event, jsonFile).then(function(){
            getLastQuestionYesObj(event, jsonFile)
          })
        console.log(cause);
      }
    else if(study == 'question2_no' && event.type == 'message' && cause == '')
      {
        cause = 'last_question_no'
        promises.push(
          getLastQuestionNoObj(event, jsonFile)
        )
        console.log(cause);
      }
    else if(study !== null && cause !== null && better == 'additional_question' && final == '' && event.type == 'message')
      {
        console.log('今ここ');
        final = 'complete';
        promises.push(
          getLastMessageObj(event, jsonFile)
        )
        console.log(final);
      }
    else if(study == '' && event.type == 'message' && event.message.text !== '振り返り'){
      promises.push(
    )
    }
    else if(study == '' && event.type == 'message' && event.message.text == '振り返り'){
      promises.push(
      getAnswerObj(event, jsonFile)
    )
    }
    else if (study !== null && cause !== null && final == 'complete' && event.type == "messsage")
    {
      console.log('もう終わり');
      promises.push()
    }
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

async function getQuestion3_No1_Obj(data, jsonFile){
    let reply = jsonFile.question3_no1;
    let message = JSON.stringify(reply);
    let send = JSON.parse(message);
    return client.replyMessage(data.replyToken, send);
}

async function getQuestion3_No2_Obj(data, jsonFile){
    let reply = jsonFile.question3_no2;
    let message = JSON.stringify(reply);
    let send = JSON.parse(message);
    return client.replyMessage(data.replyToken, send);
}

async function getQuestion3_Yes2_Obj(data, jsonFile){
    let reply = jsonFile.question3_yes;
    let message = JSON.stringify(reply);
    let send = JSON.parse(message);
    return client.replyMessage(data.replyToken, send);
}

async function getLastQuestionYesObj(data, jsonFile){
  if (data.type == 'message') {
    // let reply1 = jsonFile.question3_yes;
    let reply2 = jsonFile.last_question_yes;
    // let message1 = JSON.stringify(reply1);
    let message2 = JSON.stringify(reply2);
    // let send = JSON.parse(message1);
    let question = JSON.parse(message2);
    // let ok = [];
    // ok.push(send, question);
    return client.replyMessage(data.replyToken, question);
  }
}

async function getLastQuestionNoObj(data, jsonFile){
  if (data.type == 'message') {
    // let reply1 = jsonFile.question3_no1;
    // let reply1_1 = jsonFile.question3_no2;
    let reply2 = jsonFile.last_question_no;
    // let message1 = JSON.stringify(reply1);
    // let message1_1 = JSON.stringify(reply1_1);
    let message2 = JSON.stringify(reply2);
    // let send1 = JSON.parse(message1);
    // let send2 = JSON.parse(message1_1)
    let question = JSON.parse(message2);
    // let ok = [];
    // ok.push(send1, send2, question);
    return client.replyMessage(data.replyToken, question);
  }
}

async function getLastMessageObj(data, jsonFile){
      let reply = jsonFile.last_message;
      let message = JSON.stringify(reply);
      let send = JSON.parse(message);
      return client.replyMessage(data.replyToken, send);
}


async function getAdditionalMessageObj(data, jsonFile){
  if (data.type == 'postback') {
      let reply = jsonFile.additional_question;
      let message = JSON.stringify(reply);
      let send = JSON.parse(message);
      return client.replyMessage(data.replyToken, send);
  }
}
