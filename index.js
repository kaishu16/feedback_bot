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

  let first;
  let second;
  let third;
  let fourth;
  let end;

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



    if (event.type == 'postback'){
      if (event.postback.data == 'question2_yes_sun' || event.postback.data == 'question2_yes_mon' || event.postback.data == 'question2_yes_tue' || event.postback.data == 'question2_yes_wed' || event.postback.data == 'question2_yes_thu' || event.postback.data == 'question3_yes_fri' || event.postback.data == 'question2_yes_sat')
      {
        third = 'question3_yes_fri';
        promises.push(
          getThirdQuestionObjFri(event, jsonFile)
        )
        console.log(third);
      }
     else if (event.postback.data == 'question2_no_sun' || event.postback.data == 'question2_no_mon' || event.postback.data == 'question2_no_tue' || event.postback.data == 'question2_no_wed' || event.postback.data == 'question2_no_thu' || event.postback.data == 'question3_no_fri' || event.postback.data == 'question2_no_sat')
      {
        third = 'question3_no_fri';
        promises.push(
          getThirdQuestionObjFri(event, jsonFile)
        )
        console.log(third);
      }
    }


    if (event.type == 'message'){
      if (event.message.text == '振り返り')
      {
        first = '';
        second = '';
        third = '';
        fourth = '';
        end = '';
      }
    }

    console.log(first);
    console.log(second);
    console.log(third);
    console.log(fourth);
    console.log(end);
    


    if (first == 'question1_fri' && second == '' && third == '' && fourth == '' && end == '' && event.type == 'message')
      {
        second = 'question2_fri'
        promises.push(
          getSecondQuestionObjFri(event, jsonFile)
        )
        console.log(second);
      }
    else if(first == 'question1_fri' && second == 'question2_fri' && third == 'question3_yes_fri' && fourth == '' && end == '' && event.type == 'message')
      {
        fourth = 'question4_yes_fri'
        promises.push(
          getLastQuestionYesObjFri(event, jsonFile)
        )
        console.log(second);
      }
      else if(first == 'question1_fri' && second == 'question2_fri' && third == 'question3_no_fri' && fourth == '' && end == '' && event.type == 'message')
      {
        fourth = 'question4_no_fri'
        promises.push(
          getLastQuestionNoObjFri(event, jsonFile)
        )
        console.log(second);
      }
    else if(first == 'question1_fri' && second == 'question2_fri' && third !== null && fourth !== null && end == '' && event.type == 'message')
      {
        console.log('今ここ');
        end = 'complete';
        promises.push(
          getLastMessageObj(event, jsonFile)
        )
        console.log(end);
      }
    else if(first == '' && event.type == 'message' && event.message.text !== '振り返り'){
      promises.push()
    }
    else if(first == '' && event.type == 'message' && event.message.text == '振り返り'){
      first = 'question1_fri';
      promises.push(
      getFirstQuestionObjFri(event, jsonFile)
    )
    }
    else if (first !== null && second !== null && third !== null && fourth !== null && end == 'complete' && event.type == "messsage")
    {
      console.log('もう終わり');
      promises.push()
    }
  });
  Promise.all(promises).then(console.log("pass"));


}

async function getFirstQuestionObjFri(data, jsonFile){
          console.log('メッセージの場合');
              // テキストメッセージの場合、入力された文字列に応じて分岐
              var today = new Date();
              var weekday = today.getDay();
              console.log(weekday);

              switch(weekday){

                // case 0:
                // if (data.message.text == '振り返り') {
                //   const pro = await client.getProfile(data.source.userId);
                //   let reply1_sun = jsonFile.first_message;
                //   let reply2_sun = jsonFile.question1_sun;
                //   let message1_sun = JSON.stringify(reply1_sun);
                //   let message2_sun = JSON.stringify(reply2_sun);
                //   let send_sun = JSON.parse(message1_sun);
                //   let question_sun = JSON.parse(message2_sun);
                //   send_sun.text = pro.displayName + send_sun.text
                //   setTimeout(() => {client.pushMessage(data.source.userId, question_sun)}, 6000);
                //   return setTimeout(() => {client.replyMessage(data.replyToken, send_sun)}, 3000);    
                // }

                // case 1:
                //   if (data.message.text == '振り返り') {
                //     const pro = await client.getProfile(data.source.userId);
                //     let reply1_mon = jsonFile.first_message;
                //     let reply2_mon = jsonFile.question1_mon;
                //     let message1_mon = JSON.stringify(reply1_mon);
                //     let message2_mon = JSON.stringify(reply2_mon);
                //     let send_mon = JSON.parse(message1_mon);
                //     let question_mon = JSON.parse(message2_mon);
                //     send_mon.text = pro.displayName + send_mon.text
                //     setTimeout(() => {client.pushMessage(data.source.userId, question_mon)}, 6000);
                //     return setTimeout(() => {client.replyMessage(data.replyToken, send_mon)}, 3000);    
                //   }

                //   case 2:
                //     if (data.message.text == '振り返り') {
                //       const pro = await client.getProfile(data.source.userId);
                //       let reply1_tue = jsonFile.first_message;
                //       let reply2_tue = jsonFile.question1_tue;
                //       let message1_tue = JSON.stringify(reply1_tue);
                //       let message2_tue = JSON.stringify(reply2_tue);
                //       let send_tue = JSON.parse(message1_tue);
                //       let question_tue = JSON.parse(message2_tue);
                //       send_tue.text = pro.displayName + send_tue.text
                //       setTimeout(() => {client.pushMessage(data.source.userId, question_tue)}, 6000);
                //       return setTimeout(() => {client.replyMessage(data.replyToken, send_tue)}, 3000);    
                //     }
                 
                // case 3:
                //   if (data.message.text == '振り返り') {
                //     const pro = await client.getProfile(data.source.userId);
                //     let reply1_wed = jsonFile.first_message;
                //     let reply2_wed = jsonFile.question1_wed;
                //     let message1_wed = JSON.stringify(reply1_wed);
                //     let message2_wed = JSON.stringify(reply2_wed);
                //     let send_wed = JSON.parse(message1_wed);
                //     let question_wed = JSON.parse(message2_wed);
                //     send_wed.text = pro.displayName + send_wed.text
                //     setTimeout(() => {client.pushMessage(data.source.userId, question_wed)}, 6000);
                //     return setTimeout(() => {client.replyMessage(data.replyToken, send_wed)}, 3000);    
                //   }

                // case 4:
                //   if (data.message.text == '振り返り') {
                //     const pro = await client.getProfile(data.source.userId);
                //     let reply1_thu = jsonFile.first_message;
                //     let reply2_thu = jsonFile.question1_thu;
                //     let message1_thu = JSON.stringify(reply1_thu);
                //     let message2_thu = JSON.stringify(reply2_thu);
                //     let send_thu = JSON.parse(message1_thu);
                //     let question_thu = JSON.parse(message2_thu);
                //     send_thu.text = pro.displayName + send_thu.text
                //     setTimeout(() => {client.pushMessage(data.source.userId, question_thu)}, 6000);
                //     return setTimeout(() => {client.replyMessage(data.replyToken, send_thu)}, 3000);    
                //   } 

                case 5:
                  if (data.message.text == '振り返り') {
                    const pro = await client.getProfile(data.source.userId);
                    let reply1_fri = jsonFile.first_message_fri;
                    let reply2_fri = jsonFile.question1_fri;
                    let message1_fri = JSON.stringify(reply1_fri);
                    let message2_fri = JSON.stringify(reply2_fri);
                    let send_fri = JSON.parse(message1_fri);
                    let question_fri = JSON.parse(message2_fri);
                    send_fri.text = pro.displayName + send_fri.text
                    setTimeout(() => {client.pushMessage(data.source.userId, question_fri)}, 6000);
                    return setTimeout(() => {client.replyMessage(data.replyToken, send_fri)}, 3000);    
                  }      

                // case 6:
                //   if (data.message.text == '振り返り') {
                //     const pro = await client.getProfile(data.source.userId);
                //     let reply1_sat = jsonFile.first_message;
                //     let reply2_sat = jsonFile.question1_sat;
                //     let message1_sat = JSON.stringify(reply1_sat);
                //     let message2_sat = JSON.stringify(reply2_sat);
                //     let send_sat = JSON.parse(message1_sat);
                //     let question_sat = JSON.parse(message2_sat);
                //     send_sat.text = pro.displayName + send_sat.text
                //     setTimeout(() => {client.pushMessage(data.source.userId, question_sat)}, 6000);
                //     return setTimeout(() => {client.replyMessage(data.replyToken, send_sat)}, 3000);    
                //   }      
              }
              
            
};


async function getSecondQuestionObjFri(data, jsonFile){
  if (data.type == 'message') {
    var today = new Date();
    var weekday = today.getDay();
    
    switch(weekday){
      //Sunday
      case 0:
        let reply1_sun = jsonFile.question3_no1_sun;
        let reply1_1_sun = jsonFile.question3_no2_sun;
        let reply2_sun = jsonFile.last_question_no_sun;
        let message1_sun = JSON.stringify(reply1_sun);
        let message1_1_sun = JSON.stringify(reply1_1_sun);
        let message2_sun = JSON.stringify(reply2_sun);
        let send1_sun = JSON.parse(message1_sun);
        let send2_sun = JSON.parse(message1_1_sun)
        let question_sun = JSON.parse(message2_sun);
        setTimeout(() => {client.pushMessage(data.source.userId, send2_sun)}, 6000);
        setTimeout(() => {client.pushMessage(data.source.userId, question_sun)}, 9000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send1_sun)}, 3000);

      case 1:
        let reply1_mon = jsonFile.question3_no1_mon;
        let reply1_1_mon = jsonFile.question3_no2_mon;
        let reply2_mon = jsonFile.last_question_no_mon;
        let message1_mon = JSON.stringify(reply1_mon);
        let message1_1_mon = JSON.stringify(reply1_1_mon);
        let message2_mon = JSON.stringify(reply2_mon);
        let send1_mon = JSON.parse(message1_mon);
        let send2_mon = JSON.parse(message1_1_mon)
        let question_mon = JSON.parse(message2_mon);
        setTimeout(() => {client.pushMessage(data.source.userId, send2_mon)}, 6000);
        setTimeout(() => {client.pushMessage(data.source.userId, question_mon)}, 9000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send1_mon)}, 3000);

      case 2:
        let reply1_tue = jsonFile.question3_no1_tue;
        let reply1_1_tue = jsonFile.question3_no2_tue;
        let reply2_tue = jsonFile.last_question_no_tue;
        let message1_tue = JSON.stringify(reply1_tue);
        let message1_1_tue = JSON.stringify(reply1_1_tue);
        let message2_tue = JSON.stringify(reply2_tue);
        let send1_tue = JSON.parse(message1_tue);
        let send2_tue = JSON.parse(message1_1_tue)
        let question_tue = JSON.parse(message2_tue);
        setTimeout(() => {client.pushMessage(data.source.userId, send2_tue)}, 6000);
        setTimeout(() => {client.pushMessage(data.source.userId, question_tue)}, 9000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send1_tue)}, 3000);  
        
       case 3:
        let reply1_wed = jsonFile.question3_no1_wed;
        let reply1_1_wed = jsonFile.question3_no2_wed;
        let reply2_wed = jsonFile.last_question_no_wed;
        let message1_wed = JSON.stringify(reply1_wed);
        let message1_1_wed = JSON.stringify(reply1_1_wed);
        let message2_wed = JSON.stringify(reply2_wed);
        let send1_wed = JSON.parse(message1_wed);
        let send2_wed = JSON.parse(message1_1_wed)
        let question_wed = JSON.parse(message2_wed);
        setTimeout(() => {client.pushMessage(data.source.userId, send2_wed)}, 6000);
        setTimeout(() => {client.pushMessage(data.source.userId, question_wed)}, 9000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send1_wed)}, 3000); 
        
      case 4:
        let reply1_thu = jsonFile.question3_no1_thu;
        let reply1_1_thu = jsonFile.question3_no2_thu;
        let reply2_thu = jsonFile.last_question_no_thu;
        let message1_thu = JSON.stringify(reply1_thu);
        let message1_1_thu = JSON.stringify(reply1_1_thu);
        let message2_thu = JSON.stringify(reply2_thu);
        let send1_thu = JSON.parse(message1_thu);
        let send2_thu = JSON.parse(message1_1_thu)
        let question_thu = JSON.parse(message2_thu);
        setTimeout(() => {client.pushMessage(data.source.userId, send2_thu)}, 6000);
        setTimeout(() => {client.pushMessage(data.source.userId, question_thu)}, 9000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send1_thu)}, 3000);

      case 5:
        let reply1_fri = jsonFile.question2_fri;
        let message1_fri = JSON.stringify(reply1_fri);
        let send1_fri = JSON.parse(message1_fri);
        return setTimeout(() => {client.replyMessage(data.replyToken, send1_fri)}, 3000);

      case 6:
        let reply1_sat = jsonFile.question3_no1_sat;
        let reply1_1_sat = jsonFile.question3_no2_sat;
        let reply2_sat = jsonFile.last_question_no_v;
        let message1_sat = JSON.stringify(reply1_sat);
        let message1_1_sat = JSON.stringify(reply1_1_sat);
        let message2_sat = JSON.stringify(reply2_sat);
        let send1_sat = JSON.parse(message1_sat);
        let send2_sat = JSON.parse(message1_1_sat)
        let question_sat = JSON.parse(message2_sat);
        setTimeout(() => {client.pushMessage(data.source.userId, send2_sat)}, 6000);
        setTimeout(() => {client.pushMessage(data.source.userId, question_sat)}, 9000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send1_sat)}, 3000);  
    }
  }
}

async function getThirdQuestionObjFri(data, jsonFile){
  console.log('postbackの場合');
  let reply = jsonFile[data.postback.data];
  let message = JSON.stringify(reply);
  let question = JSON.parse(message);
  return setTimeout(() => {client.replyMessage(data.replyToken, question)}, 3000);
}

async function getLastQuestionYesObjFri(data, jsonFile){
  if (data.type == 'message') {
    var today = new Date();
    var weekday = today.getDay();

    switch(weekday){

      case 0:
        let reply1_sun = jsonFile.question3_yes_sun;
        let reply2_sun = jsonFile.last_question_yes_sun;
        let message1_sun = JSON.stringify(reply1_sun);
        let message2_sun = JSON.stringify(reply2_sun);
        let send_sun = JSON.parse(message1_sun);
        let question_sun = JSON.parse(message2_sun);
        setTimeout(() => {client.pushMessage(data.source.userId, question_sun)}, 6000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_sun)}, 3000);

      case 1:
        let reply1_mon = jsonFile.question3_yes_mon;
        let reply2_mon = jsonFile.last_question_yes_mon;
        let message1_mon = JSON.stringify(reply1_mon);
        let message2_mon = JSON.stringify(reply2_mon);
        let send_mon = JSON.parse(message1_mon);
        let question_mon = JSON.parse(message2_mon);
        setTimeout(() => {client.pushMessage(data.source.userId, question_mon)}, 6000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_mon)}, 3000);

      case 2:
        let reply1_tue = jsonFile.question3_yes_tue;
        let reply2_tue = jsonFile.last_question_yes_tue;
        let message1_tue = JSON.stringify(reply1_tue);
        let message2_tue = JSON.stringify(reply2_tue);
        let send_tue = JSON.parse(message1_tue);
        let question_tue = JSON.parse(message2_tue);
        setTimeout(() => {client.pushMessage(data.source.userId, question_tue)}, 6000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_tue)}, 3000);

      case 3:
        let reply1_wed = jsonFile.question3_yes_wed;
        let reply2_wed = jsonFile.last_question_yes_wed;
        let message1_wed = JSON.stringify(reply1_wed);
        let message2_wed = JSON.stringify(reply2_wed);
        let send_wed = JSON.parse(message1_wed);
        let question_wed = JSON.parse(message2_wed);
        setTimeout(() => {client.pushMessage(data.source.userId, question_wed)}, 6000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_wed)}, 3000);  
      
      case 4:
        let reply1_thu = jsonFile.question3_yes_thu;
        let reply2_thu = jsonFile.last_question_yes_thu;
        let message1_thu = JSON.stringify(reply1_thu);
        let message2_thu = JSON.stringify(reply2_thu);
        let send_thu = JSON.parse(message1_thu);
        let question_thu = JSON.parse(message2_thu);
        setTimeout(() => {client.pushMessage(data.source.userId, question_thu)}, 6000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_thu)}, 3000);  
      
      case 5:
        let reply1_fri = jsonFile.question4_yes_fri;
        let message1_fri = JSON.stringify(reply1_fri);
        let send_fri = JSON.parse(message1_fri);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_fri)}, 3000);  

      case 6:
        let reply1_sat = jsonFile.question3_yes_sat;
        let reply2_sat = jsonFile.last_question_yes_sat;
        let message1_sat = JSON.stringify(reply1_sat);
        let message2_sat = JSON.stringify(reply2_sat);
        let send_sat = JSON.parse(message1_sat);
        let question_sat = JSON.parse(message2_sat);
        setTimeout(() => {client.pushMessage(data.source.userId, question_sat)}, 6000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_sat)}, 3000);  


    }
    
  }
}

async function getLastQuestionNoObjFri(data, jsonFile){
  if (data.type == 'message') {
    var today = new Date();
    var weekday = today.getDay();

    switch(weekday){

      case 0:
        let reply1_sun = jsonFile.question3_yes_sun;
        let reply2_sun = jsonFile.last_question_yes_sun;
        let message1_sun = JSON.stringify(reply1_sun);
        let message2_sun = JSON.stringify(reply2_sun);
        let send_sun = JSON.parse(message1_sun);
        let question_sun = JSON.parse(message2_sun);
        setTimeout(() => {client.pushMessage(data.source.userId, question_sun)}, 6000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_sun)}, 3000);

      case 1:
        let reply1_mon = jsonFile.question3_yes_mon;
        let reply2_mon = jsonFile.last_question_yes_mon;
        let message1_mon = JSON.stringify(reply1_mon);
        let message2_mon = JSON.stringify(reply2_mon);
        let send_mon = JSON.parse(message1_mon);
        let question_mon = JSON.parse(message2_mon);
        setTimeout(() => {client.pushMessage(data.source.userId, question_mon)}, 6000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_mon)}, 3000);

      case 2:
        let reply1_tue = jsonFile.question3_yes_tue;
        let reply2_tue = jsonFile.last_question_yes_tue;
        let message1_tue = JSON.stringify(reply1_tue);
        let message2_tue = JSON.stringify(reply2_tue);
        let send_tue = JSON.parse(message1_tue);
        let question_tue = JSON.parse(message2_tue);
        setTimeout(() => {client.pushMessage(data.source.userId, question_tue)}, 6000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_tue)}, 3000);

      case 3:
        let reply1_wed = jsonFile.question3_yes_wed;
        let reply2_wed = jsonFile.last_question_yes_wed;
        let message1_wed = JSON.stringify(reply1_wed);
        let message2_wed = JSON.stringify(reply2_wed);
        let send_wed = JSON.parse(message1_wed);
        let question_wed = JSON.parse(message2_wed);
        setTimeout(() => {client.pushMessage(data.source.userId, question_wed)}, 6000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_wed)}, 3000);  
      
      case 4:
        let reply1_thu = jsonFile.question3_yes_thu;
        let reply2_thu = jsonFile.last_question_yes_thu;
        let message1_thu = JSON.stringify(reply1_thu);
        let message2_thu = JSON.stringify(reply2_thu);
        let send_thu = JSON.parse(message1_thu);
        let question_thu = JSON.parse(message2_thu);
        setTimeout(() => {client.pushMessage(data.source.userId, question_thu)}, 6000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_thu)}, 3000);  
      
      case 5:
        let reply1_fri = jsonFile.question4_no1_fri;
        let reply2_fri = jsonFile.question4_no2_fri;
        let message1_fri = JSON.stringify(reply1_fri);
        let message2_fri = JSON.stringify(reply2_fri);
        let send_fri = JSON.parse(message1_fri);
        let question_fri = JSON.parse(message2_fri);
        setTimeout(() => {client.pushMessage(data.source.userId, question_fri)}, 6000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_fri)}, 3000);  
      case 6:
        let reply1_sat = jsonFile.question3_yes_sat;
        let reply2_sat = jsonFile.last_question_yes_sat;
        let message1_sat = JSON.stringify(reply1_sat);
        let message2_sat = JSON.stringify(reply2_sat);
        let send_sat = JSON.parse(message1_sat);
        let question_sat = JSON.parse(message2_sat);
        setTimeout(() => {client.pushMessage(data.source.userId, question_sat)}, 6000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_sat)}, 3000);  


    }
    
  }
}

async function getLastMessageObj(data, jsonFile){
  var today = new Date();
    var weekday = today.getDay();
    
    switch(weekday){
      //Sunday
      case 0:
        let reply_sun = jsonFile.last_message_sun;
        let message_sun = JSON.stringify(reply_sun);
        let send_sun = JSON.parse(message_sun);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_sun)}, 3000);

      case 1:
        let reply_mon = jsonFile.last_message_mon;
        let message_mon = JSON.stringify(reply_mon);
        let send_mon = JSON.parse(message_mon);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_mon)}, 3000);

      case 2:
        let reply_tue = jsonFile.last_message_tue;
        let message_tue = JSON.stringify(reply_tue);
        let send_tue = JSON.parse(message_tue);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_tue)}, 3000);

      case 3:
        let reply_wed = jsonFile.last_message_wed;
        let message_wed = JSON.stringify(reply_wed);
        let send_wed = JSON.parse(message_wed);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_wed)}, 3000);

      case 4:
        let reply_thu = jsonFile.last_message_thu;
        let message_thu = JSON.stringify(reply_thu);
        let send_thu = JSON.parse(message_thu);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_thu)}, 3000);

      case 5:
        let reply_fri = jsonFile.last_message_fri;
        let message_fri = JSON.stringify(reply_fri);
        let send_fri = JSON.parse(message_fri);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_fri)}, 3000);

      case 6:
        let reply_sat = jsonFile.last_message_sat;
        let message_sat = JSON.stringify(reply_sat);
        let send_sat = JSON.parse(message_sat);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_sat)}, 3000);

    }
  }


// async function getAdditionalMessageObj(data, jsonFile){
//   if (data.type == 'postback') {

//     var today = new Date();
//     var weekday = today.getDay();
    
//     switch(weekday){
//       case 0:
//         let reply_sun = jsonFile.additional_question_sun;
//         let message_sun = JSON.stringify(reply_sun);
//         let send_sun = JSON.parse(message_sun);
//         return setTimeout(() => {client.replyMessage(data.replyToken, send_sun)}, 3000);

//       case 1:
//         let reply_mon = jsonFile.additional_question_mon;
//         let message_mon = JSON.stringify(reply_mon);
//         let send_mon = JSON.parse(message_mon);
//         return setTimeout(() => {client.replyMessage(data.replyToken, send_mon)}, 3000);

//       case 2:
//         let reply_tue = jsonFile.additional_question_tue;
//         let message_tue = JSON.stringify(reply_tue);
//         let send_tue = JSON.parse(message_tue);
//         return setTimeout(() => {client.replyMessage(data.replyToken, send_tue)}, 3000);

//       case 3:
//         let reply_wed = jsonFile.additional_question_wed;
//         let message_wed = JSON.stringify(reply_wed);
//         let send_wed = JSON.parse(message_wed);
//         return setTimeout(() => {client.replyMessage(data.replyToken, send_wed)}, 3000);
        
//       case 4:
//         let reply_thu = jsonFile.additional_question_thu;
//         let message_thu = JSON.stringify(reply_thu);
//         let send_thu = JSON.parse(message_thu);
//         return setTimeout(() => {client.replyMessage(data.replyToken, send_thu)}, 3000);

//       case 5:
//         let reply_fri = jsonFile.additional_question_fri;
//         let message_fri = JSON.stringify(reply_fri);
//         let send_fri = JSON.parse(message_fri);
//         return setTimeout(() => {client.replyMessage(data.replyToken, send_fri)}, 3000);

//       case 6:
//         let reply_sat = jsonFile.additional_question_sat;
//         let message_sat = JSON.stringify(reply_sat);
//         let send_sat = JSON.parse(message_sat);
//         return setTimeout(() => {client.replyMessage(data.replyToken, send_sat)}, 3000);

//     }
      
//   }
// }
