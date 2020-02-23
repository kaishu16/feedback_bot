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
      if (event.postback.data == 'question2_yes_sun' || event.postback.data == 'question2_yes_mon' || event.postback.data == 'question2_yes_tue' || event.postback.data == 'question2_yes_wed' || event.postback.data == 'question2_yes_thu' || event.postback.data == 'question2_yes_fri' || event.postback.data == 'question2_yes_sat')
      {
        study = 'question2_yes';
        promises.push(
          getAnswerObj(event, jsonFile)
        )
        console.log(study);
      }
     else if (event.postback.data == 'question2_no_sun' || event.postback.data == 'question2_no_mon' || event.postback.data == 'question2_no_tue' || event.postback.data == 'question2_no_wed' || event.postback.data == 'question2_no_thu' || event.postback.data == 'question2_no_fri' || event.postback.data == 'question2_no_sat')
      {
        study = 'question2_no';
        promises.push(
          getAnswerObj(event, jsonFile)
        )
        console.log(study);
      }
      else if (event.postback.data == 'additional_question_sun' || event.postback.data == 'additional_question_mon' || event.postback.data == 'additional_question_tue' || event.postback.data == 'additional_question_wed' || event.postback.data == 'additional_question_thu' || event.postback.data == 'additional_question_fri' || event.postback.data == 'additional_question_sat' ) {
          better = 'additional_question';
        promises.push(
          getAdditionalMessageObj(event, jsonFile)
        )
      }
      else if (event.postback.data == 'last_message_sun' || event.postback.data == 'last_message_tue' || event.postback.data == 'last_message_wed' || event.postback.data == 'last_message_thu' || event.postback.data == 'last_message_fri' || event.postback.data == 'last_message_sat') {
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
          getLastQuestionYesObj(event, jsonFile)
        )
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
              var today = new Date();
              var weekday = today.getDay();
              weekday = weekday + 1;

              switch(weekday){

                case 0:
                if (data.message.text == '振り返り') {
                  const pro = await client.getProfile(data.source.userId);
                  let reply1 = jsonFile.first_message;
                  let reply2 = jsonFile.question1_sun;
                  let message1 = JSON.stringify(reply1);
                  let message2 = JSON.stringify(reply2);
                  let send = JSON.parse(message1);
                  let question = JSON.parse(message2);
                  send.text = pro.displayName + send.text
                  setTimeout(() => {client.pushMessage(data.source.userId, question)}, 6000);
                  return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000);    
                }

                case 1:
                  if (data.message.text == '振り返り') {
                    console.log('月曜出てます');
                    
                    pro = await client.getProfile(data.source.userId);
                    reply1 = jsonFile.first_message;
                    reply2 = jsonFile.question1_mon;
                    message1 = JSON.stringify(reply1);
                    message2 = JSON.stringify(reply2);
                    send = JSON.parse(message1);
                    console.log('ここまで来てます');
                    
                    let question_mon = JSON.parse(message2);
                    console.log('通りました');
                    
                    send.text = pro.displayName + send.text
                    setTimeout(() => {client.pushMessage(data.source.userId, question_mon)}, 6000);
                    return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000);    
                  }

                case 2:
                  if (data.message.text == '振り返り') {
                    pro = await client.getProfile(data.source.userId);
                    reply1 = jsonFile.first_message;
                    reply2 = jsonFile.question1_tue;
                    message1 = JSON.stringify(reply1);
                    message2 = JSON.stringify(reply2);
                    send = JSON.parse(message1);
                    question_tue = JSON.parse(message2);
                    send.text = pro.displayName + send.text
                    setTimeout(() => {client.pushMessage(data.source.userId, question)}, 6000);
                    return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000);    
                  }  
                 
                case 3:
                  if (data.message.text == '振り返り') {
                    pro = await client.getProfile(data.source.userId);
                    reply1 = jsonFile.first_message;
                    reply2 = jsonFile.question1_wed;
                    message1 = JSON.stringify(reply1);
                    message2 = JSON.stringify(reply2);
                    send = JSON.parse(message1);
                    question = JSON.parse(message2);
                    send.text = pro.displayName + send.text
                    setTimeout(() => {client.pushMessage(data.source.userId, question)}, 6000);
                    return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000);    
                  }  

                case 4:
                  if (data.message.text == '振り返り') {
                    pro = await client.getProfile(data.source.userId);
                    reply1 = jsonFile.first_message;
                    reply2 = jsonFile.question1_thu;
                    message1 = JSON.stringify(reply1);
                    message2 = JSON.stringify(reply2);
                    send = JSON.parse(message1);
                    question = JSON.parse(message2);
                    send.text = pro.displayName + send.text
                    setTimeout(() => {client.pushMessage(data.source.userId, question)}, 6000);
                    return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000);    
                  }  

                case 5:
                  if (data.message.text == '振り返り') {
                    pro = await client.getProfile(data.source.userId);
                    reply1 = jsonFile.first_message;
                    reply2 = jsonFile.question1_fri;
                    message1 = JSON.stringify(reply1);
                    message2 = JSON.stringify(reply2);
                    send = JSON.parse(message1);
                    question = JSON.parse(message2);
                    send.text = pro.displayName + send.text
                    setTimeout(() => {client.pushMessage(data.source.userId, question)}, 6000);
                    return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000);    
                  }      

                case 6:
                  if (data.message.text == '振り返り') {
                    pro = await client.getProfile(data.source.userId);
                    reply1 = jsonFile.first_message;
                    reply2 = jsonFile.question1_sat;
                    message1 = JSON.stringify(reply1);
                    message2 = JSON.stringify(reply2);
                    send = JSON.parse(message1);
                    question = JSON.parse(message2);
                    send.text = pro.displayName + send.text
                    setTimeout(() => {client.pushMessage(data.source.userId, question)}, 6000);
                    return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000);    
                  }        
              }
              
        case 'postback':
            console.log('postbackの場合');
            let reply = jsonFile[data.postback.data];
            let message = JSON.stringify(reply);
            let question = JSON.parse(message);
            return setTimeout(() => {client.replyMessage(data.replyToken, question)}, 3000);
          }
};

async function getLastQuestionYesObj(data, jsonFile){
  if (data.type == 'message') {
    var today = new Date();
    var weekday = today.getDay();
    weekday = weekday + 1;

    switch(weekday){

      case 0:
        let reply1 = jsonFile.question3_yes_sun;
        let reply2 = jsonFile.last_question_yes_sun;
        let message1 = JSON.stringify(reply1);
        let message2 = JSON.stringify(reply2);
        let send = JSON.parse(message1);
        let question = JSON.parse(message2);
        setTimeout(() => {client.pushMessage(data.source.userId, question)}, 6000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000);

      case 1:
        reply1 = jsonFile.question3_yes_mon;
        reply2 = jsonFile.last_question_yes_mon;
        message1 = JSON.stringify(reply1);
        message2 = JSON.stringify(reply2);
        send = JSON.parse(message1);
        question = JSON.parse(message2);
        setTimeout(() => {client.pushMessage(data.source.userId, question)}, 6000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000);  

      case 2:
        reply1 = jsonFile.question3_yes_tue;
        reply2 = jsonFile.last_question_yes_tue;
        message1 = JSON.stringify(reply1);
        message2 = JSON.stringify(reply2);
        send = JSON.parse(message1);
        question = JSON.parse(message2);
        setTimeout(() => {client.pushMessage(data.source.userId, question)}, 6000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000);  

      case 3:
        reply1 = jsonFile.question3_yes_wed;
        reply2 = jsonFile.last_question_yes_wed;
        message1 = JSON.stringify(reply1);
        message2 = JSON.stringify(reply2);
        send = JSON.parse(message1);
        question = JSON.parse(message2);
        setTimeout(() => {client.pushMessage(data.source.userId, question)}, 6000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000);   
      
      case 4:
        reply1 = jsonFile.question3_yes_thu;
        reply2 = jsonFile.last_question_yes_thu;
        message1 = JSON.stringify(reply1);
        message2 = JSON.stringify(reply2);
        send = JSON.parse(message1);
        question = JSON.parse(message2);
        setTimeout(() => {client.pushMessage(data.source.userId, question)}, 6000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000); 
        
      case 5:
        reply1 = jsonFile.question3_yes_fri;
        reply2 = jsonFile.last_question_yes_fri;
        message1 = JSON.stringify(reply1);
        message2 = JSON.stringify(reply2);
        send = JSON.parse(message1);
        question = JSON.parse(message2);
        setTimeout(() => {client.pushMessage(data.source.userId, question)}, 6000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000);   

      case 6:
        reply1 = jsonFile.question3_yes_sat;
        reply2 = jsonFile.last_question_yes_sat;
        message1 = JSON.stringify(reply1);
        message2 = JSON.stringify(reply2);
        send = JSON.parse(message1);
        question = JSON.parse(message2);
        setTimeout(() => {client.pushMessage(data.source.userId, question)}, 6000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000); 

    }
    
  }
}

async function getLastQuestionNoObj(data, jsonFile){
  if (data.type == 'message') {
    var today = new Date();
    var weekday = today.getDay();
    
    switch(weekday){
      //Sunday
      case 0:
        console.log('今日は日曜日');
        console.log(weekday);
        

        let reply1 = jsonFile.question3_no1_sun;
        let reply1_1 = jsonFile.question3_no2_sun;
        let reply2 = jsonFile.last_question_no_sun;
        let message1 = JSON.stringify(reply1);
        let message1_1 = JSON.stringify(reply1_1);
        let message2 = JSON.stringify(reply2);
        let send1 = JSON.parse(message1);
        let send2 = JSON.parse(message1_1)
        let question = JSON.parse(message2);
        setTimeout(() => {client.pushMessage(data.source.userId, send2)}, 6000);
        setTimeout(() => {client.pushMessage(data.source.userId, question)}, 9000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send1)}, 3000);

      case 1:
        console.log('今日は月曜日');
        console.log(weekday);

        reply1 = jsonFile.question3_no1_mon;
        reply1_1 = jsonFile.question3_no2_mon;
        reply2 = jsonFile.last_question_no_mon;
        message1 = JSON.stringify(reply1);
        message1_1 = JSON.stringify(reply1_1);
        message2 = JSON.stringify(reply2);
        send1 = JSON.parse(message1);
        send2 = JSON.parse(message1_1)
        question = JSON.parse(message2);
        setTimeout(() => {client.pushMessage(data.source.userId, send2)}, 6000);
        setTimeout(() => {client.pushMessage(data.source.userId, question)}, 9000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send1)}, 3000);

      case 2:
        console.log('今日は火曜日');
        console.log(weekday);

        reply1 = jsonFile.question3_no1_tue;
        reply1_1 = jsonFile.question3_no2_tue;
        reply2 = jsonFile.last_question_no_tue;
        message1 = JSON.stringify(reply1);
        message1_1 = JSON.stringify(reply1_1);
        message2 = JSON.stringify(reply2);
        send1 = JSON.parse(message1);
        send2 = JSON.parse(message1_1)
        question = JSON.parse(message2);
        setTimeout(() => {client.pushMessage(data.source.userId, send2)}, 6000);
        setTimeout(() => {client.pushMessage(data.source.userId, question)}, 9000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send1)}, 3000);  
        
       case 3:
        console.log('今日は水曜日');
        console.log(weekday);

        reply1 = jsonFile.question3_no1_wed;
        reply1_1 = jsonFile.question3_no2_wed;
        reply2 = jsonFile.last_question_no_wed;
        message1 = JSON.stringify(reply1);
        message1_1 = JSON.stringify(reply1_1);
        message2 = JSON.stringify(reply2);
        send1 = JSON.parse(message1);
        send2 = JSON.parse(message1_1)
        question = JSON.parse(message2);
        setTimeout(() => {client.pushMessage(data.source.userId, send2)}, 6000);
        setTimeout(() => {client.pushMessage(data.source.userId, question)}, 9000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send1)}, 3000);  
        
      case 4:
        console.log('今日は木曜日');
        console.log(weekday);

        reply1 = jsonFile.question3_no1_thu;
        reply1_1 = jsonFile.question3_no2_thu;
        reply2 = jsonFile.last_question_no_thu;
        message1 = JSON.stringify(reply1);
        message1_1 = JSON.stringify(reply1_1);
        message2 = JSON.stringify(reply2);
        send1 = JSON.parse(message1);
        send2 = JSON.parse(message1_1)
        question = JSON.parse(message2);
        setTimeout(() => {client.pushMessage(data.source.userId, send2)}, 6000);
        setTimeout(() => {client.pushMessage(data.source.userId, question)}, 9000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send1)}, 3000);  

      case 5:
        console.log('今日は金曜日');
        console.log(weekday);

        reply1 = jsonFile.question3_no1_fri;
        reply1_1 = jsonFile.question3_no2_fri;
        reply2 = jsonFile.last_question_no_fri;
        message1 = JSON.stringify(reply1);
        message1_1 = JSON.stringify(reply1_1);
        message2 = JSON.stringify(reply2);
        send1 = JSON.parse(message1);
        send2 = JSON.parse(message1_1)
        question = JSON.parse(message2);
        setTimeout(() => {client.pushMessage(data.source.userId, send2)}, 6000);
        setTimeout(() => {client.pushMessage(data.source.userId, question)}, 9000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send1)}, 3000);  

      case 6:
        console.log('今日は土曜日');
        console.log(weekday);

        reply1 = jsonFile.question3_no1_sat;
        reply1_1 = jsonFile.question3_no2_sat;
        reply2 = jsonFile.last_question_no_sat;
        message1 = JSON.stringify(reply1);
        message1_1 = JSON.stringify(reply1_1);
        message2 = JSON.stringify(reply2);
        send1 = JSON.parse(message1);
        send2 = JSON.parse(message1_1)
        question = JSON.parse(message2);
        setTimeout(() => {client.pushMessage(data.source.userId, send2)}, 6000);
        setTimeout(() => {client.pushMessage(data.source.userId, question)}, 9000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send1)}, 3000);    
      
        
              
    }
  }
}

async function getLastMessageObj(data, jsonFile){
  var today = new Date();
    var weekday = today.getDay();
    
    switch(weekday){
      //Sunday
      case 0:
        console.log('今日は日曜日');
        console.log(weekday);
        

        let reply = jsonFile.last_message_sun;
        let message = JSON.stringify(reply);
        let send = JSON.parse(message);
        return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000);

      case 1:
        console.log('今日は月曜日');
        console.log(weekday);
        

        reply = jsonFile.last_message_mon;
        message = JSON.stringify(reply);
        send = JSON.parse(message);
        return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000);

      case 2:
        console.log('今日は火曜日');
        console.log(weekday);
        

        reply = jsonFile.last_message_tue;
        message = JSON.stringify(reply);
        send = JSON.parse(message);
        return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000);

      
      case 3:
        console.log('今日は水曜日');
        console.log(weekday);
        

        reply = jsonFile.last_message_wed;
        message = JSON.stringify(reply);
        send = JSON.parse(message);
        return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000); 
        
      case 4:
      console.log('今日は木曜日');
      console.log(weekday);
      

      reply = jsonFile.last_message_thu;
      message = JSON.stringify(reply);
      send = JSON.parse(message);
      return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000); 

      case 5:
      console.log('今日は金曜日');
      console.log(weekday);
      

      reply = jsonFile.last_message_fri;
      message = JSON.stringify(reply);
      send = JSON.parse(message);
      return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000); 

      case 6:
      console.log('今日は土曜日');
      console.log(weekday);
      

      reply = jsonFile.last_message_sat;
      message = JSON.stringify(reply);
      send = JSON.parse(message);
      return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000); 
     


    }
  }


async function getAdditionalMessageObj(data, jsonFile){
  if (data.type == 'postback') {

    var today = new Date();
    var weekday = today.getDay();
    
    switch(weekday){
      //Sunday
      case 0:
        console.log('今日は日曜日');
        console.log(weekday);
        

        let reply = jsonFile.additional_question_sun;
        let message = JSON.stringify(reply);
        let send = JSON.parse(message);
        return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000);

      case 1:
        console.log('今日は月曜日');
        console.log(weekday);
        

        reply = jsonFile.additional_question_mon;
        message = JSON.stringify(reply);
        send = JSON.parse(message);
        return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000);

      case 2:
        console.log('今日は火曜日');
        console.log(weekday);
        

        reply = jsonFile.additional_question_tue;
        message = JSON.stringify(reply);
        send = JSON.parse(message);
        return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000);

      
      case 3:
        console.log('今日は水曜日');
        console.log(weekday);
        

        reply = jsonFile.additional_question_wed;
        message = JSON.stringify(reply);
        send = JSON.parse(message);
        return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000); 
        
      case 4:
      console.log('今日は木曜日');
      console.log(weekday);
      

      reply = jsonFile.additional_question_thu;
      message = JSON.stringify(reply);
      send = JSON.parse(message);
      return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000); 

      case 5:
      console.log('今日は金曜日');
      console.log(weekday);
      

      reply = jsonFile.additional_question_fri;
      message = JSON.stringify(reply);
      send = JSON.parse(message);
      return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000); 

      case 6:
      console.log('今日は土曜日');
      console.log(weekday);
      

      reply = jsonFile.additional_question_sat;
      message = JSON.stringify(reply);
      send = JSON.parse(message);
      return setTimeout(() => {client.replyMessage(data.replyToken, send)}, 3000); 
     


    }
      
  }
}
