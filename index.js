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

  let first_sun;
  let second_sun;
  let third_sun;
  let fourth_sun;
  let fifth_sun;
  let end_sun;
  let first_mon;
  let second_mon;
  let third_mon;
  let fourth_mon;
  let end_mon;
  let add_mon;
  let first_tue;
  let second_tue;
  let third_tue;
  let fourth_tue;
  let end_tue;
  let add_tue;
  let first_wed;
  let second_wed;
  let third_wed;
  let fourth_wed;
  let end_wed;
  let add_wed;
  let first_thu;
  let second_thu;
  let third_thu;
  let fourth_thu;
  let end_thu;
  let add_thu;
  let first_fri;
  let second_fri;
  let third_fri;
  let fourth_fri;
  let end_fri;
  let first;
  let second;
  let third;
  let fourth;
  let end;
  let add;

function lineBot(req, res) {

  let answerObj;
  let replyToken;
  let replyData;


  res.status(200).end();

  const events = req.body.events;
  const promises = [];
  var today = new Date();
    today.setTime(today.getTime() + 1000*60*60*9);
    // var weekday = today.getDay();
    var weekday = Math.floor( Math.random() * 7 );
    console.log(weekday);

    switch(weekday){
      case 0:

      events.forEach((event) => {
        replyToken = event.replyToken;
        //入力メッセージ
        console.log(event);
    
            if (event.type == 'postback'){
              if (event.postback.data == 'question3_yes_sun')
              {
                third_sun = 'question3_yes_sun';
                promises.push(
                  getThirdQuestionObjSun(event, jsonFile)
                )
              }
             else if (event.postback.data == 'question3_no_sun' )
              {
                third_sun = 'question3_no_sun';
                promises.push(
                  getThirdQuestionObjSun(event, jsonFile)
                )
              }
            }
        
        
            if (event.type == 'message'){
              if (event.message.text == '振り返り')
              {
                first_sun = '';
                second_sun = '';
                third_sun = '';
                fourth_sun = '';
                fifth_sun = '';
                end_sun = '';
              }
            }
        
            console.log(first_sun);
            console.log(second_sun);
            console.log(third_sun);
            console.log(fourth_sun);
            console.log(fifth_sun);
            console.log(end_sun);
            
        
        
            if (first_sun == 'question1_sun' && second_sun == '' && third_sun == '' && fourth_sun == '' && fifth_sun == '' && end_sun == '' && event.type == 'message')
              {
                second_sun = 'question2_sun'
                promises.push(
                  getSecondQuestionObjSun(event, jsonFile)
                )
              }
            else if(first_sun == 'question1_sun' && second_sun == 'question2_sun' && third_sun == 'question3_yes_sun' && fourth_sun == '' && fifth_sun == '' && end_sun == '' && event.type == 'message')
              {
                fourth_sun = 'question4_yes_sun'
                promises.push(
                  getLastQuestionYesObjSun(event, jsonFile)
                )
              }
              else if(first_sun == 'question1_sun' && second_sun == 'question2_sun' && third_sun == 'question3_no_sun' && fourth_sun == '' && fifth_sun == '' && end_sun == '' && event.type == 'message')
              {
                fourth_sun = 'question4_no_sun';
                promises.push(
                  getFourthQuestionNoObjSun(event, jsonFile)
                )
              }
              else if(first_sun == 'question1_sun' && second_sun == 'question2_sun' && third_sun == 'question3_no_sun' && fourth_sun == 'question4_no_sun' && fifth_sun == '' && end_sun == '' && event.type == 'message')
              {
                fifth_sun = 'question5_no_sun'
                promises.push(
                  getLastQuestionNoObjSun(event, jsonFile)
                )
              }
            else if(first_sun == 'question1_sun' && second_sun == 'question2_sun' && third_sun == 'question3_yes_sun' && fourth_sun == 'question4_yes_sun' && fifth_sun == '' && end_sun == '' && event.type == 'message')
              {
                console.log('今ここ');
                end_sun = 'complete';
                promises.push(
                  getLastMessageYesObjSun(event, jsonFile)
                )
              }
            else if(first_sun == 'question1_sun' && second_sun == 'question2_sun' && third_sun == 'question3_no_sun' && fourth_sun == 'question4_no_sun' && fifth_sun == 'question5_no_sun' && end_sun == '' && event.type == 'message')
            {
              console.log('今ここ');
              end_sun = 'complete';
              promises.push(
                getLastMessageNoObjSun(event, jsonFile)
              )
            }
            else if(first_sun == '' && event.type == 'message' && event.message.text !== '振り返り'){
              promises.push()
            }
            else if(first_sun == '' && event.type == 'message' && event.message.text == '振り返り'){
              first_sun = 'question1_sun';
              promises.push(
              getFirstQuestionObjSun(event, jsonFile)
            )
            }
            else if (first_sun !== null && second_sun !== null && third_sun !== null && fourth_sun !== null && end_sun == 'complete' && event.type == "messsage")
            {
              console.log('もう終わり');
              promises.push()
            }
    
            Promise.all(promises).then(console.log("pass"));
          });   
          break;



          case 1:

          events.forEach((event) => {
            replyToken = event.replyToken;
            //入力メッセージ
            console.log(event);
        
            if (event.type == 'postback'){
              if (event.postback.data == 'question2_yes_mon')
              {
                second_mon = 'question2_yes_mon';
                promises.push(
                  getSecondQuestionObjMon(event, jsonFile)
                )
              }
             else if (event.postback.data == 'question2_no_mon')
              {
                second_mon = 'question2_no_mon';
                promises.push(
                  getSecondQuestionObjMon(event, jsonFile)
                )
              }
              else if (event.postback.data == 'last_message_mon')
              {
                end_mon = 'complete';
                promises.push(
                  getLastMessageYesObjMon(event, jsonFile)
                )
              }
              else if (event.postback.data == 'additional_question_mon')
              {
                add_mon = 'additional_question_mon';
                promises.push(
                  getAdditionalQuestionObjMon(event, jsonFile)
                )
              }
  
            }
        
        
            if (event.type == 'message'){
              if (event.message.text == '振り返り')
              {
                first_mon = '';
                second_mon = '';
                third_mon = '';
                fourth_mon = '';
                add_mon = '';
                end_mon = '';
              }
            }
        
            console.log(first_mon);
            console.log(second_mon);
            console.log(third_mon);
            console.log(fourth_mon);
            console.log(add_mon);
            console.log(end_mon);
            
        
        
            if (first_mon == 'question1_mon' && second_mon == 'question2_yes_mon' && third_mon == '' && fourth_mon == '' && end_mon == '' && event.type == 'message')
              {
                third_mon = 'question3_yes_mon'
                promises.push(
                  getThirdQuestionYesObjMon(event, jsonFile)
                )
              }
            else if(first_mon == 'question1_mon' && second_mon == 'question2_no_mon' && third_mon == '' && fourth_mon == '' && add_mon == '' && end_mon == '' && event.type == 'message')
            {
              third_mon = 'question3_no_mon'
              promises.push(
                getThirdQuestionNoObjMon(event, jsonFile)
              )
            }
            else if(first_mon == 'question1_mon' && second_mon == 'question2_yes_mon' && third_mon == 'question3_yes_mon' && fourth_mon == '' && add_mon == '' && end_mon == '' && event.type == 'message')
              {
                fourth_mon = 'question4_yes_mon'
                promises.push(
                  getLastQuestionYesObjMon(event, jsonFile)
                )
              }
              else if(first_mon == 'question1_mon' && second_mon == 'question2_no_mon' && third_mon == 'question3_no_mon' && fourth_mon == '' && add_mon == '' && end_mon == '' && event.type == 'message')
              {
                fourth_mon = 'question4_no_mon'
                promises.push(
                  getLastQuestionNoObjMon(event, jsonFile)
                )
              }
            else if(first_mon == 'question1_mon' && second_mon !== null && third_mon !== null && fourth_mon !== null && add_mon == 'additional_question_mon' && end_mon == '' && event.type == 'message')
              {
                console.log('今ここ');
                end_mon = 'complete';
                promises.push(
                  getLastMessageNoObjMon(event, jsonFile)
                )
              }
            else if(first_mon == '' && event.type == 'message' && event.message.text !== '振り返り'){
              promises.push()
            }
            else if(first_mon == '' && event.type == 'message' && event.message.text == '振り返り'){
              first_mon = 'question1_mon';
              promises.push(
              getFirstQuestionObjMon(event, jsonFile)
            )
            }
            else if (first_mon !== null && second_mon !== null && third_mon !== null && fourth_mon !== null && end_mon == 'complete' && event.type == "messsage")
            {
              console.log('もう終わり');
              promises.push()
            }
            Promise.all(promises).then(console.log("pass"));
          });
          break;

        
        
        
          case 2:

          events.forEach((event) => {
            replyToken = event.replyToken;
            //入力メッセージ
            console.log(event);
        
            if (event.type == 'postback'){
              if (event.postback.data == 'question2_yes_tue')
              {
                second_tue = 'question2_yes_tue';
                promises.push(
                  getSecondQuestionObjTue(event, jsonFile)
                )
              }
             else if (event.postback.data == 'question2_no_tue')
              {
                second_tue = 'question2_no_tue';
                promises.push(
                  getSecondQuestionObjTue(event, jsonFile)
                )
              }
              else if (event.postback.data == 'last_message_tue')
              {
                end_tue = 'complete';
                promises.push(
                  getLastMessageYesObjTue(event, jsonFile)
                )
              }
              else if (event.postback.data == 'additional_question_tue')
              {
                add_tue = 'additional_question_tue';
                promises.push(
                  getAdditionalQuestionObjTue(event, jsonFile)
                )
              }
  
            }
        
        
            if (event.type == 'message'){
              if (event.message.text == '振り返り')
              {
                first_tue = '';
                second_tue = '';
                third_tue = '';
                fourth_tue = '';
                add_tue = '';
                end_tue = '';
              }
            }
        
            console.log(first_tue);
            console.log(second_tue);
            console.log(third_tue);
            console.log(fourth_tue);
            console.log(add_tue);
            console.log(end_tue);
            
        
        
            if (first_tue == 'question1_tue' && second_tue == 'question2_yes_tue' && third_tue == '' && fourth_tue == '' && end_tue == '' && event.type == 'message')
              {
                third_tue = 'question3_yes_tue'
                promises.push(
                  getThirdQuestionYesObjTue(event, jsonFile)
                )
              }
            else if(first_tue == 'question1_tue' && second_tue == 'question2_no_tue' && third_tue == '' && fourth_tue == '' && add_tue == '' && end_tue == '' && event.type == 'message')
            {
              third_tue = 'question3_no_tue'
              promises.push(
                getThirdQuestionNoObjTue(event, jsonFile)
              )
            }
            else if(first_tue == 'question1_tue' && second_tue == 'question2_yes_tue' && third_tue == 'question3_yes_tue' && fourth_tue == '' && add_tue == '' && end_tue == '' && event.type == 'message')
              {
                fourth_tue = 'question4_yes_tue'
                promises.push(
                  getLastQuestionYesObjTue(event, jsonFile)
                )
              }
              else if(first_tue == 'question1_tue' && second_tue == 'question2_no_tue' && third_tue == 'question3_no_tue' && fourth_tue == '' && add_tue == '' && end_tue == '' && event.type == 'message')
              {
                fourth_tue = 'question4_no_tue'
                promises.push(
                  getLastQuestionNoObjTue(event, jsonFile)
                )
              }
            else if(first_tue == 'question1_tue' && second_tue !== null && third_tue !== null && fourth_tue !== null && add_tue == 'additional_question_tue' && end_tue == '' && event.type == 'message')
              {
                console.log('今ここ');
                end_tue = 'complete';
                promises.push(
                  getLastMessageNoObjTue(event, jsonFile)
                )
              }
            else if(first_tue == '' && event.type == 'message' && event.message.text !== '振り返り'){
              promises.push()
            }
            else if(first_tue == '' && event.type == 'message' && event.message.text == '振り返り'){
              first_tue = 'question1_tue';
              promises.push(
              getFirstQuestionObjTue(event, jsonFile)
            )
            }
            else if (first_tue !== null && second_tue !== null && third_tue !== null && fourth_tue !== null && end_tue == 'complete' && event.type == "messsage")
            {
              console.log('もう終わり');
              promises.push()
            }
            Promise.all(promises).then(console.log("pass"));
          });
          break;
          
          
          case 3:

            events.forEach((event) => {
              replyToken = event.replyToken;
              //入力メッセージ
              console.log(event);
          
              if (event.type == 'postback'){
                if (event.postback.data == 'question3_yes_wed')
                {
                  third_wed = 'question3_yes_wed';
                  promises.push(
                    getThirdQuestionObjWed(event, jsonFile)
                  )
                }
               else if (event.postback.data == 'question3_no_wed')
                {
                  third_wed = 'question3_no_wed';
                  promises.push(
                    getThirdQuestionObjWed(event, jsonFile)
                  )
                }
                else if (event.postback.data == 'last_message_wed')
                {
                  end_wed = 'complete';
                  promises.push(
                    getLastMessageObjWed(event, jsonFile)
                  )
                }
                else if (event.postback.data == 'additional_question_wed')
                {
                  add_wed = 'additional_question_wed';
                  promises.push(
                    getAdditionalQuestionObjWed(event, jsonFile)
                  )
                }
    
              }
          
          
              if (event.type == 'message'){
                if (event.message.text == '振り返り')
                {
                  first_wed = '';
                  second_wed = '';
                  third_wed = '';
                  fourth_wed = '';
                  add_wed = '';
                  end_wed = '';
                }
              }
          
              console.log(first_wed);
              console.log(second_wed);
              console.log(third_wed);
              console.log(fourth_wed);
              console.log(add_wed);
              console.log(end_wed);
              
          
          
              if (first_wed == 'question1_wed' && second_wed == '' && third_wed == '' && fourth_wed == '' && end_wed == '' && event.type == 'message')
                {
                  second_wed = 'question2_wed'
                  promises.push(
                    getSecondQuestionObjWed(event, jsonFile)
                  )
                }
              else if(first_wed == 'question1_wed' && second_wed == 'question2_wed' && third_wed == 'question3_no_wed' && fourth_wed == '' && add_wed == '' && end_wed == '' && event.type == 'message')
              {
                fourth_wed = 'question4_no_wed'
                promises.push(
                  getFourthQuestionNoObjWed(event, jsonFile)
                )
              }
              else if(first_wed == 'question1_wed' && second_wed == 'question2_wed' && third_wed == 'question3_yes_wed' && fourth_wed == '' && add_wed == '' && end_wed == '' && event.type == 'message')
                {
                  fourth_wed = 'question4_yes_wed'
                  promises.push(
                    getLastQuestionYesObjWed(event, jsonFile)
                  )
                }
                else if(first_wed == 'question1_wed' && second_wed == 'question2_wed' && third_wed == 'question3_no_wed' && fourth_wed == 'question4_no_wed' && add_wed == '' && end_wed == '' && event.type == 'message')
                {
                  promises.push(
                    getLastQuestionNoObjWed(event, jsonFile)
                  )
                }
              else if(first_wed == 'question1_wed' && second_wed !== null && third_wed !== null && fourth_wed !== null && add_wed == 'additional_question_wed' && end_wed == '' && event.type == 'message')
                {
                  console.log('今ここ');
                  end_wed = 'complete';
                  promises.push(
                    getLastMessageObjWed(event, jsonFile)
                  )
                }
              else if(first_wed == '' && event.type == 'message' && event.message.text !== '振り返り'){
                promises.push()
              }
              else if(first_wed == '' && event.type == 'message' && event.message.text == '振り返り'){
                first_wed = 'question1_wed';
                promises.push(
                getFirstQuestionObjWed(event, jsonFile)
              )
              }
              else if (first_wed !== null && second_wed !== null && third_wed !== null && fourth_wed !== null && end_wed == 'complete' && event.type == "messsage")
              {
                console.log('もう終わり');
                promises.push()
              }
              Promise.all(promises).then(console.log("pass"));
            });
            break;





          case 4:

          events.forEach((event) => {
            replyToken = event.replyToken;
            //入力メッセージ
            console.log(event);
        
            if (event.type == 'postback'){
              if (event.postback.data == 'question2_yes_thu')
              {
                second_thu = 'question2_yes_thu';
                promises.push(
                  getSecondQuestionObjThu(event, jsonFile)
                )
              }
             else if (event.postback.data == 'question2_no_thu')
              {
                second_thu = 'question2_no_thu';
                promises.push(
                  getSecondQuestionObjThu(event, jsonFile)
                )
              }
              else if (event.postback.data == 'last_message_thu')
              {
                end_thu = 'complete';
                promises.push(
                  getLastMessageYesObjThu(event, jsonFile)
                )
              }
              else if (event.postback.data == 'additional_question_thu')
              {
                add_thu = 'additional_question_thu';
                promises.push(
                  getAdditionalQuestionObjThu(event, jsonFile)
                )
              }
  
            }
        
        
            if (event.type == 'message'){
              if (event.message.text == '振り返り')
              {
                first_thu = '';
                second_thu = '';
                third_thu = '';
                fourth_thu = '';
                add_thu = '';
                end_thu = '';
              }
            }
        
            console.log(first_thu);
            console.log(second_thu);
            console.log(third_thu);
            console.log(fourth_thu);
            console.log(add_thu);
            console.log(end_thu);
            
        
        
            if (first_thu == 'question1_thu' && second_thu == 'question2_yes_thu' && third_thu == '' && fourth_thu == '' && end_thu == '' && event.type == 'message')
              {
                third_thu = 'question3_yes_thu'
                promises.push(
                  getThirdQuestionYesObjThu(event, jsonFile)
                )
              }
            else if(first_thu == 'question1_thu' && second_thu == 'question2_no_thu' && third_thu == '' && fourth_thu == '' && add_thu == '' && end_thu == '' && event.type == 'message')
            {
              third_thu = 'question3_no_thu'
              promises.push(
                getThirdQuestionNoObjThu(event, jsonFile)
              )
            }
            else if(first_thu == 'question1_thu' && second_thu == 'question2_yes_thu' && third_thu == 'question3_yes_thu' && fourth_thu == '' && add_thu == '' && end_thu == '' && event.type == 'message')
              {
                fourth_thu = 'question4_yes_thu'
                promises.push(
                  getLastQuestionYesObjThu(event, jsonFile)
                )
              }
              else if(first_thu == 'question1_thu' && second_thu == 'question2_no_thu' && third_thu == 'question3_no_thu' && fourth_thu == '' && add_thu == '' && end_thu == '' && event.type == 'message')
              {
                fourth_thu = 'question4_no_thu'
                promises.push(
                  getLastQuestionNoObjThu(event, jsonFile)
                )
              }
            else if(first_thu == 'question1_thu' && second_thu !== null && third_thu !== null && fourth_thu !== null && add_thu == 'additional_question_thu' && end_thu == '' && event.type == 'message')
              {
                console.log('今ここ');
                end_thu = 'complete';
                promises.push(
                  getLastMessageNoObjThu(event, jsonFile)
                )
              }
            else if(first_thu == '' && event.type == 'message' && event.message.text !== '振り返り'){
              promises.push()
            }
            else if(first_thu == '' && event.type == 'message' && event.message.text == '振り返り'){
              first_thu = 'question1_thu';
              promises.push(
              getFirstQuestionObjThu(event, jsonFile)
            )
            }
            else if (first_thu !== null && second_thu !== null && third_thu !== null && fourth_thu !== null  && end_thu == 'complete' && event.type == "messsage")
            {
              console.log('もう終わり');
              promises.push()
            }
            Promise.all(promises).then(console.log("pass"));
          });
          break;





        case 5:

          events.forEach((event) => {
            replyToken = event.replyToken;
            //入力メッセージ
            console.log(event);
        
            if (event.type == 'postback'){
              if (event.postback.data == 'question3_yes_fri')
              {
                third_fri = 'question3_yes_fri';
                promises.push(
                  getThirdQuestionObjFri(event, jsonFile)
                )
              }
             else if (event.postback.data == 'question3_no_fri')
              {
                third_fri = 'question3_no_fri';
                promises.push(
                  getThirdQuestionObjFri(event, jsonFile)
                )
              }
            }
        
        
            if (event.type == 'message'){
              if (event.message.text == '振り返り')
              {
                first_fri = '';
                second_fri = '';
                third_fri = '';
                fourth_fri = '';
                end_fri = '';
              }
            }
        
            console.log(first_fri);
            console.log(second_fri);
            console.log(third_fri);
            console.log(fourth_fri);
            console.log(end_fri);
            
        
        
            if (first_fri == 'question1_fri' && second_fri == '' && third_fri == '' && fourth_fri == '' && end_fri == '' && event.type == 'message')
              {
                second_fri = 'question2_fri'
                promises.push(
                  getSecondQuestionObjFri(event, jsonFile)
                )
              }
            else if(first_fri == 'question1_fri' && second_fri == 'question2_fri' && third_fri == 'question3_yes_fri' && fourth_fri == '' && end_fri == '' && event.type == 'message')
              {
                fourth_fri = 'question4_yes_fri'
                promises.push(
                  getLastQuestionYesObjFri(event, jsonFile)
                )
              }
              else if(first_fri == 'question1_fri' && second_fri == 'question2_fri' && third_fri == 'question3_no_fri' && fourth_fri == '' && end_fri == '' && event.type == 'message')
              {
                fourth_fri = 'question4_no_fri'
                promises.push(
                  getLastQuestionNoObjFri(event, jsonFile)
                )
                console.log(second);
              }
            else if(first_fri == 'question1_fri' && second_fri == 'question2_fri' && third_fri !== null && fourth_fri !== null && end_fri == '' && event.type == 'message')
              {
                console.log('今ここ');
                end_fri = 'complete';
                promises.push(
                  getLastMessageObjFri(event, jsonFile)
                )
              }
            else if(first_fri == '' && event.type == 'message' && event.message.text !== '振り返り'){
              promises.push()
            }
            else if(first_fri == '' && event.type == 'message' && event.message.text == '振り返り'){
              first_fri = 'question1_fri';
              promises.push(
              getFirstQuestionObjFri(event, jsonFile)
            )
            }
            else if (first_fri !== null && second_fri !== null && third_fri !== null && fourth_fri !== null && end_fri == 'complete' && event.type == "messsage")
            {
              console.log('もう終わり');
              promises.push()
            }
            Promise.all(promises).then(console.log("pass"));
          });

          break;

    


        
          case 6:

          events.forEach((event) => {
            replyToken = event.replyToken;
            //入力メッセージ
            console.log(event);
        
            if (event.type == 'postback'){
              if (event.postback.data == 'question2_yes_sat')
              {
                second = 'question2_yes_sat';
                promises.push(
                  getSecondQuestionObjSat(event, jsonFile)
                )
                console.log(second);
              }
             else if (event.postback.data == 'question2_no_sat')
              {
                second = 'question2_no_sat';
                promises.push(
                  getSecondQuestionObjSat(event, jsonFile)
                )
                console.log(second);
              }
              else if (event.postback.data == 'last_message_sat')
              {
                end = 'complete';
                promises.push(
                  getLastMessageYesObjSat(event, jsonFile)
                )
                console.log(end);
              }
              else if (event.postback.data == 'additional_question_sat')
              {
                add = 'additional_question_sat';
                promises.push(
                  getAdditionalQuestionObjSat(event, jsonFile)
                )
                console.log(add);
              }
  
            }
        
        
            if (event.type == 'message'){
              if (event.message.text == '振り返り')
              {
                first = '';
                second = '';
                third = '';
                fourth = '';
                add = '';
                end = '';
              }
            }
        
            console.log(first);
            console.log(second);
            console.log(third);
            console.log(fourth);
            console.log(add);
            console.log(end);
            
        
        
            if (first == 'question1_sat' && second == 'question2_yes_sat' && third == '' && fourth == '' && end == '' && event.type == 'message')
              {
                third = 'question3_yes_sat'
                promises.push(
                  getThirdQuestionYesObjSat(event, jsonFile)
                )
                console.log(third);
              }
            else if(first == 'question1_sat' && second == 'question2_no_sat' && third == '' && fourth == '' && add == '' && end == '' && event.type == 'message')
            {
              third = 'question3_no_sat'
              promises.push(
                getThirdQuestionNoObjSat(event, jsonFile)
              )
              console.log(third);
            }
            else if(first == 'question1_sat' && second == 'question2_yes_sat' && third == 'question3_yes_sat' && fourth == '' && add == '' && end == '' && event.type == 'message')
              {
                fourth = 'question4_yes_sat'
                promises.push(
                  getLastQuestionYesObjSat(event, jsonFile)
                )
                console.log(fourth);
              }
              else if(first == 'question1_sat' && second == 'question2_no_sat' && third == 'question3_no_sat' && fourth == '' && add == '' && end == '' && event.type == 'message')
              {
                fourth = 'question4_no_sat'
                promises.push(
                  getLastQuestionNoObjSat(event, jsonFile)
                )
                console.log(fourth);
              }
            else if(first == 'question1_sat' && second !== null && third !== null && fourth !== null && add == 'additional_question_sat' && end == '' && event.type == 'message')
              {
                console.log('今ここ');
                end = 'complete';
                promises.push(
                  getLastMessageNoObjSat(event, jsonFile)
                )
                console.log(end);
              }
            else if(first == '' && event.type == 'message' && event.message.text !== '振り返り'){
              promises.push()
            }
            else if(first == '' && event.type == 'message' && event.message.text == '振り返り'){
              first = 'question1_sat';
              promises.push(
              getFirstQuestionObjSat(event, jsonFile)
            )
            }
            else if (first !== null && second !== null && third !== null && fourth !== null  && end == 'complete' && event.type == "messsage")
            {
              console.log('もう終わり');
              promises.push()
            }
            Promise.all(promises).then(console.log("pass"));
          });
          break;
      }
    }




async function getFirstQuestionObjSun(data, jsonFile){
  console.log('メッセージの場合');
      // テキストメッセージの場合、入力された文字列に応じて分岐
          const pro = await client.getProfile(data.source.userId);
          let reply1_sun = jsonFile.first_message_sun;
          let reply2_sun = jsonFile.question1_sun;
          let message1_sun = JSON.stringify(reply1_sun);
          let message2_sun = JSON.stringify(reply2_sun);
          let send_sun = JSON.parse(message1_sun);
          let question_sun = JSON.parse(message2_sun);
          send_sun.text = pro.displayName + send_sun.text
          setTimeout(() => {client.pushMessage(data.source.userId, question_sun)}, 6000);
          return setTimeout(() => {client.replyMessage(data.replyToken, send_sun)}, 3000);    

};


async function getSecondQuestionObjSun(data, jsonFile){

let reply1_sun = jsonFile.question2_sun;
let message1_sun = JSON.stringify(reply1_sun);
let send1_sun = JSON.parse(message1_sun);
return setTimeout(() => {client.replyMessage(data.replyToken, send1_sun)}, 3000);

}

async function getThirdQuestionObjSun(data, jsonFile){
console.log('postbackの場合');
let reply = jsonFile[data.postback.data];
let message = JSON.stringify(reply);
let question = JSON.parse(message);
return setTimeout(() => {client.replyMessage(data.replyToken, question)}, 3000);
}

async function getFourthQuestionNoObjSun(data, jsonFile){

  let reply1_sun = jsonFile.question4_no_sun;
  let message1_sun = JSON.stringify(reply1_sun);
  let send1_sun = JSON.parse(message1_sun);
  return setTimeout(() => {client.replyMessage(data.replyToken, send1_sun)}, 3000);
  
  }

async function getLastQuestionYesObjSun(data, jsonFile){

  let reply1_sun = jsonFile.question4_yes1_sun;
  let reply2_sun = jsonFile.question4_yes2_sun;
  let message1_sun = JSON.stringify(reply1_sun);
  let message2_sun = JSON.stringify(reply2_sun);
  let send_sun = JSON.parse(message1_sun);
  let question_sun = JSON.parse(message2_sun);
  setTimeout(() => {client.pushMessage(data.source.userId, question_sun)}, 6000);
  return setTimeout(() => {client.replyMessage(data.replyToken, send_sun)}, 3000);

}

async function getLastQuestionNoObjSun(data, jsonFile){

  let reply1_sun = jsonFile.question5_no1_sun;
  let reply2_sun = jsonFile.question4_yes2_sun;
  let message1_sun = JSON.stringify(reply1_sun);
  let message2_sun = JSON.stringify(reply2_sun);
  let send_sun = JSON.parse(message1_sun);
  let question_sun = JSON.parse(message2_sun);
  setTimeout(() => {client.pushMessage(data.source.userId, question_sun)}, 6000);
  return setTimeout(() => {client.replyMessage(data.replyToken, send_sun)}, 3000);

}

async function getLastMessageYesObjSun(data, jsonFile){

  let reply_sun = jsonFile.last_message_sun;
  let message_sun = JSON.stringify(reply_sun);
  let send_sun = JSON.parse(message_sun);
  return setTimeout(() => {client.replyMessage(data.replyToken, send_sun)}, 3000);

}
async function getLastMessageNoObjSun(data, jsonFile){

  let reply_sun = jsonFile.last_message_sun;
  let message_sun = JSON.stringify(reply_sun);
  let send_sun = JSON.parse(message_sun);
  return setTimeout(() => {client.replyMessage(data.replyToken, send_sun)}, 3000);

}




async function getFirstQuestionObjMon(data, jsonFile){
  console.log('メッセージの場合');
            const pro = await client.getProfile(data.source.userId);
            let reply2_mon = jsonFile.question1_mon;
            let message2_mon = JSON.stringify(reply2_mon);
            let question_mon = JSON.parse(message2_mon);
            return setTimeout(() => {client.replyMessage(data.replyToken, question_mon)}, 3000);    
  
};


async function getSecondQuestionObjMon(data, jsonFile){
console.log('postbackの場合');
let reply = jsonFile[data.postback.data];
let message = JSON.stringify(reply);
let question = JSON.parse(message);
return setTimeout(() => {client.replyMessage(data.replyToken, question)}, 3000);
}

async function getThirdQuestionYesObjMon(data, jsonFile){
  let reply1_mon = jsonFile.question3_yes1_mon;
  let reply2_mon = jsonFile.question3_yes2_mon;
  let message1_mon = JSON.stringify(reply1_mon);
  let message2_mon = JSON.stringify(reply2_mon);
  let send_mon = JSON.parse(message1_mon);
  let question_mon = JSON.parse(message2_mon);
  setTimeout(() => {client.pushMessage(data.source.userId, question_mon)}, 6000);
  return setTimeout(() => {client.replyMessage(data.replyToken, send_mon)}, 3000);  
}

async function getThirdQuestionNoObjMon(data, jsonFile){

  let reply1_mon = jsonFile.question3_no1_mon;
  let reply2_mon = jsonFile.question3_no2_mon;
  let message1_mon = JSON.stringify(reply1_mon);
  let message2_mon = JSON.stringify(reply2_mon);
  let send_mon = JSON.parse(message1_mon);
  let question_mon = JSON.parse(message2_mon);
  setTimeout(() => {client.pushMessage(data.source.userId, question_mon)}, 6000);
  return setTimeout(() => {client.replyMessage(data.replyToken, send_mon)}, 3000);  

}

async function getLastQuestionYesObjMon(data, jsonFile){

let reply1_mon = jsonFile.last_question_yes1_mon;
let reply2_mon = jsonFile.last_question_yes2_mon;
let message1_mon = JSON.stringify(reply1_mon);
let message2_mon = JSON.stringify(reply2_mon);
let send_mon = JSON.parse(message1_mon);
let question_mon = JSON.parse(message2_mon);
setTimeout(() => {client.pushMessage(data.source.userId, question_mon)}, 6000);
return setTimeout(() => {client.replyMessage(data.replyToken, send_mon)}, 3000);  

}

async function getLastQuestionNoObjMon(data, jsonFile){

  let reply1_mon = jsonFile.last_question_no1_mon;
  let reply2_mon = jsonFile.last_question_no2_mon;
  let message1_mon = JSON.stringify(reply1_mon);
  let message2_mon = JSON.stringify(reply2_mon);
  let send_mon = JSON.parse(message1_mon);
  let question_mon = JSON.parse(message2_mon);
  setTimeout(() => {client.pushMessage(data.source.userId, question_mon)}, 6000);
  return setTimeout(() => {client.replyMessage(data.replyToken, send_mon)}, 3000);  
}

async function getLastMessageYesObjMon(data, jsonFile){
let reply_mon = jsonFile.last_message_yes_mon;
let message_mon = JSON.stringify(reply_mon);
let send_mon = JSON.parse(message_mon);
return setTimeout(() => {client.replyMessage(data.replyToken, send_mon)}, 3000);
}

async function getLastMessageNoObjMon(data, jsonFile){
  let reply_mon = jsonFile.last_message_no_mon;
  let message_mon = JSON.stringify(reply_mon);
  let send_mon = JSON.parse(message_mon);
  return setTimeout(() => {client.replyMessage(data.replyToken, send_mon)}, 3000);
}


async function getAdditionalQuestionObjMon(data, jsonFile){

  let reply_mon = jsonFile.additional_question_mon;
  let message_mon = JSON.stringify(reply_mon);
  let send_mon = JSON.parse(message_mon);
  return setTimeout(() => {client.replyMessage(data.replyToken, send_mon)}, 3000);
}






async function getFirstQuestionObjTue(data, jsonFile){
  console.log('メッセージの場合');
            const pro = await client.getProfile(data.source.userId);
            let reply1_tue = jsonFile.first_message_tue;
            let reply2_tue = jsonFile.question1_tue;
            let message1_tue = JSON.stringify(reply1_tue);
            let message2_tue = JSON.stringify(reply2_tue);
            let send_tue = JSON.parse(message1_tue);
            let question_tue = JSON.parse(message2_tue);
            send_tue.text = pro.displayName + send_tue.text
            setTimeout(() => {client.pushMessage(data.source.userId, question_tue)}, 6000);
            return setTimeout(() => {client.replyMessage(data.replyToken, send_tue)}, 3000);    
  
};


async function getSecondQuestionObjTue(data, jsonFile){
console.log('postbackの場合');
let reply = jsonFile[data.postback.data];
let message = JSON.stringify(reply);
let question = JSON.parse(message);
return setTimeout(() => {client.replyMessage(data.replyToken, question)}, 3000);
}

async function getThirdQuestionYesObjTue(data, jsonFile){
let reply1_tue = jsonFile.question3_yes_tue;
let message1_tue = JSON.stringify(reply1_tue);
let send_tue = JSON.parse(message1_tue);
return setTimeout(() => {client.replyMessage(data.replyToken, send_tue)}, 3000);  
}

async function getThirdQuestionNoObjTue(data, jsonFile){

let reply1_tue = jsonFile.question3_no_tue;
let message1_tue = JSON.stringify(reply1_tue);
let send_tue = JSON.parse(message1_tue);
return setTimeout(() => {client.replyMessage(data.replyToken, send_tue)}, 3000);  

}

async function getLastQuestionYesObjTue(data, jsonFile){

let reply1_tue = jsonFile.last_question_yes1_tue;
let reply2_tue = jsonFile.last_question_yes2_tue;
let message1_tue = JSON.stringify(reply1_tue);
let message2_tue = JSON.stringify(reply2_tue);
let send_tue = JSON.parse(message1_tue);
let question_tue = JSON.parse(message2_tue);
setTimeout(() => {client.pushMessage(data.source.userId, question_tue)}, 6000);
return setTimeout(() => {client.replyMessage(data.replyToken, send_tue)}, 3000);  

}

async function getLastQuestionNoObjTue(data, jsonFile){

let reply1_tue = jsonFile.last_question_no1_tue;
let reply2_tue = jsonFile.last_question_no2_tue;
let message1_tue = JSON.stringify(reply1_tue);
let message2_tue = JSON.stringify(reply2_tue);
let send_tue = JSON.parse(message1_tue);
let question_tue = JSON.parse(message2_tue);
setTimeout(() => {client.pushMessage(data.source.userId, question_tue)}, 6000);
return setTimeout(() => {client.replyMessage(data.replyToken, send_tue)}, 3000);  

}

async function getLastMessageYesObjTue(data, jsonFile){
let reply_tue = jsonFile.last_message_yes_tue;
let message_tue = JSON.stringify(reply_tue);
let send_tue = JSON.parse(message_tue);
return setTimeout(() => {client.replyMessage(data.replyToken, send_tue)}, 3000);
}

async function getLastMessageNoObjTue(data, jsonFile){
let reply_tue = jsonFile.last_message_no_tue;
let message_tue = JSON.stringify(reply_tue);
let send_tue = JSON.parse(message_tue);
return setTimeout(() => {client.replyMessage(data.replyToken, send_tue)}, 3000);
}


async function getAdditionalQuestionObjTue(data, jsonFile){

      let reply_tue = jsonFile.additional_question_tue;
      let message_tue = JSON.stringify(reply_tue);
      let send_tue = JSON.parse(message_tue);
      return setTimeout(() => {client.replyMessage(data.replyToken, send_tue)}, 3000);

}






async function getFirstQuestionObjWed(data, jsonFile){
  console.log('メッセージの場合');
            const pro = await client.getProfile(data.source.userId);
            let reply1_wed = jsonFile.first_message_wed;
            let reply2_wed = jsonFile.question1_wed;
            let message1_wed = JSON.stringify(reply1_wed);
            let message2_wed = JSON.stringify(reply2_wed);
            let send_wed = JSON.parse(message1_wed);
            let question_wed = JSON.parse(message2_wed);
            send_wed.text = pro.displayName + send_wed.text
            setTimeout(() => {client.pushMessage(data.source.userId, question_wed)}, 6000);
            return setTimeout(() => {client.replyMessage(data.replyToken, send_wed)}, 3000);    
  
};


async function getSecondQuestionObjWed(data, jsonFile){
  let reply1_wed = jsonFile.question2_1_wed;
  let reply2_wed = jsonFile.question2_2_wed;
  let message1_wed = JSON.stringify(reply1_wed);
  let message2_wed = JSON.stringify(reply2_wed);
  let send_wed = JSON.parse(message1_wed);
  let question_wed = JSON.parse(message2_wed);
  setTimeout(() => {client.pushMessage(data.source.userId, question_wed)}, 6000);
  return setTimeout(() => {client.replyMessage(data.replyToken, send_wed)}, 3000);  
}

async function getThirdQuestionObjWed(data, jsonFile){
  let reply = jsonFile[data.postback.data];
  let message = JSON.stringify(reply);
  let question = JSON.parse(message);
  return setTimeout(() => {client.replyMessage(data.replyToken, question)}, 3000);
}

async function getFourthQuestionNoObjWed(data, jsonFile){

let reply1_wed = jsonFile.question4_no_wed;
let message1_wed = JSON.stringify(reply1_wed);
let send_wed = JSON.parse(message1_wed);
return setTimeout(() => {client.replyMessage(data.replyToken, send_wed)}, 3000);  

}

async function getLastQuestionYesObjWed(data, jsonFile){

let reply1_wed = jsonFile.last_question_yes1_wed;
let reply2_wed = jsonFile.last_question_yes2_wed;
let message1_wed = JSON.stringify(reply1_wed);
let message2_wed = JSON.stringify(reply2_wed);
let send_wed = JSON.parse(message1_wed);
let question_wed = JSON.parse(message2_wed);
setTimeout(() => {client.pushMessage(data.source.userId, question_wed)}, 6000);
return setTimeout(() => {client.replyMessage(data.replyToken, send_wed)}, 3000);  

}

async function getLastQuestionNoObjWed(data, jsonFile){

let reply1_wed = jsonFile.last_question_no1_wed;
let reply2_wed = jsonFile.last_question_no2_wed;
let message1_wed = JSON.stringify(reply1_wed);
let message2_wed = JSON.stringify(reply2_wed);
let send_wed = JSON.parse(message1_wed);
let question_wed = JSON.parse(message2_wed);
setTimeout(() => {client.pushMessage(data.source.userId, question_wed)}, 6000);
return setTimeout(() => {client.replyMessage(data.replyToken, send_wed)}, 3000);  

}

async function getLastMessageObjWed(data, jsonFile){
let reply_wed = jsonFile.last_message_wed;
let message_wed = JSON.stringify(reply_wed);
let send_wed = JSON.parse(message_wed);
return setTimeout(() => {client.replyMessage(data.replyToken, send_wed)}, 3000);
}

async function getAdditionalQuestionObjWed(data, jsonFile){

      let reply_wed = jsonFile.additional_question_wed;
      let message_wed = JSON.stringify(reply_wed);
      let send_wed = JSON.parse(message_wed);
      return setTimeout(() => {client.replyMessage(data.replyToken, send_wed)}, 3000);

}





async function getFirstQuestionObjThu(data, jsonFile){
  console.log('メッセージの場合');
            const pro = await client.getProfile(data.source.userId);
            let reply2_thu = jsonFile.question1_thu;
            let message2_thu = JSON.stringify(reply2_thu);
            let question_thu = JSON.parse(message2_thu);
            return setTimeout(() => {client.replyMessage(data.replyToken, question_thu)}, 3000);    
  
};


async function getSecondQuestionObjThu(data, jsonFile){
console.log('postbackの場合');
let reply = jsonFile[data.postback.data];
let message = JSON.stringify(reply);
let question = JSON.parse(message);
return setTimeout(() => {client.replyMessage(data.replyToken, question)}, 3000);
}

async function getThirdQuestionYesObjThu(data, jsonFile){
  let reply1_thu = jsonFile.question3_yes1_thu;
  let reply2_thu = jsonFile.question3_yes2_thu;
  let message1_thu = JSON.stringify(reply1_thu);
  let message2_thu = JSON.stringify(reply2_thu);
  let send_thu = JSON.parse(message1_thu);
  let question_thu = JSON.parse(message2_thu);
  setTimeout(() => {client.pushMessage(data.source.userId, question_thu)}, 6000);
  return setTimeout(() => {client.replyMessage(data.replyToken, send_thu)}, 3000);  
}

async function getThirdQuestionNoObjThu(data, jsonFile){

  let reply1_thu = jsonFile.question3_no1_thu;
  let reply2_thu = jsonFile.question3_no2_thu;
  let message1_thu = JSON.stringify(reply1_thu);
  let message2_thu = JSON.stringify(reply2_thu);
  let send_thu = JSON.parse(message1_thu);
  let question_thu = JSON.parse(message2_thu);
  setTimeout(() => {client.pushMessage(data.source.userId, question_thu)}, 6000);
  return setTimeout(() => {client.replyMessage(data.replyToken, send_thu)}, 3000);  

}

async function getLastQuestionYesObjThu(data, jsonFile){

let reply1_thu = jsonFile.last_question_yes1_thu;
let reply2_thu = jsonFile.last_question_yes2_thu;
let message1_thu = JSON.stringify(reply1_thu);
let message2_thu = JSON.stringify(reply2_thu);
let send_thu = JSON.parse(message1_thu);
let question_thu = JSON.parse(message2_thu);
setTimeout(() => {client.pushMessage(data.source.userId, question_thu)}, 6000);
return setTimeout(() => {client.replyMessage(data.replyToken, send_thu)}, 3000);  

}

async function getLastQuestionNoObjThu(data, jsonFile){

  let reply1_thu = jsonFile.last_question_no1_thu;
  let reply2_thu = jsonFile.last_question_no2_thu;
  let message1_thu = JSON.stringify(reply1_thu);
  let message2_thu = JSON.stringify(reply2_thu);
  let send_thu = JSON.parse(message1_thu);
  let question_thu = JSON.parse(message2_thu);
  setTimeout(() => {client.pushMessage(data.source.userId, question_thu)}, 6000);
  return setTimeout(() => {client.replyMessage(data.replyToken, send_thu)}, 3000);  
}

async function getLastMessageYesObjThu(data, jsonFile){
let reply_thu = jsonFile.last_message_yes_thu;
let message_thu = JSON.stringify(reply_thu);
let send_thu = JSON.parse(message_thu);
return setTimeout(() => {client.replyMessage(data.replyToken, send_thu)}, 3000);
}

async function getLastMessageNoObjThu(data, jsonFile){
  let reply_thu = jsonFile.last_message_no_thu;
  let message_thu = JSON.stringify(reply_thu);
  let send_thu = JSON.parse(message_thu);
  return setTimeout(() => {client.replyMessage(data.replyToken, send_thu)}, 3000);
}


async function getAdditionalQuestionObjThu(data, jsonFile){

  let reply_thu = jsonFile.additional_question_thu;
  let message_thu = JSON.stringify(reply_thu);
  let send_thu = JSON.parse(message_thu);
  return setTimeout(() => {client.replyMessage(data.replyToken, send_thu)}, 3000);
}







async function getFirstQuestionObjFri(data, jsonFile){
          console.log('メッセージの場合');

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
            
};


async function getSecondQuestionObjFri(data, jsonFile){

      //  case 3:
      //   let reply1_wed = jsonFile.question3_no1_wed;
      //   let reply1_1_wed = jsonFile.question3_no2_wed;
      //   let reply2_wed = jsonFile.last_question_no_wed;
      //   let message1_wed = JSON.stringify(reply1_wed);
      //   let message1_1_wed = JSON.stringify(reply1_1_wed);
      //   let message2_wed = JSON.stringify(reply2_wed);
      //   let send1_wed = JSON.parse(message1_wed);
      //   let send2_wed = JSON.parse(message1_1_wed)
      //   let question_wed = JSON.parse(message2_wed);
      //   setTimeout(() => {client.pushMessage(data.source.userId, send2_wed)}, 6000);
      //   setTimeout(() => {client.pushMessage(data.source.userId, question_wed)}, 9000);
      //   return setTimeout(() => {client.replyMessage(data.replyToken, send1_wed)}, 3000); 
        
      // case 4:
      //   let reply1_thu = jsonFile.question3_no1_thu;
      //   let reply1_1_thu = jsonFile.question3_no2_thu;
      //   let reply2_thu = jsonFile.last_question_no_thu;
      //   let message1_thu = JSON.stringify(reply1_thu);
      //   let message1_1_thu = JSON.stringify(reply1_1_thu);
      //   let message2_thu = JSON.stringify(reply2_thu);
      //   let send1_thu = JSON.parse(message1_thu);
      //   let send2_thu = JSON.parse(message1_1_thu)
      //   let question_thu = JSON.parse(message2_thu);
      //   setTimeout(() => {client.pushMessage(data.source.userId, send2_thu)}, 6000);
      //   setTimeout(() => {client.pushMessage(data.source.userId, question_thu)}, 9000);
      //   return setTimeout(() => {client.replyMessage(data.replyToken, send1_thu)}, 3000);

        let reply1_fri = jsonFile.question2_fri;
        let message1_fri = JSON.stringify(reply1_fri);
        let send1_fri = JSON.parse(message1_fri);
        return setTimeout(() => {client.replyMessage(data.replyToken, send1_fri)}, 3000);

}

async function getThirdQuestionObjFri(data, jsonFile){
  console.log('postbackの場合');
  let reply = jsonFile[data.postback.data];
  let message = JSON.stringify(reply);
  let question = JSON.parse(message);
  return setTimeout(() => {client.replyMessage(data.replyToken, question)}, 3000);
}

async function getLastQuestionYesObjFri(data, jsonFile){

      // case 3:
      //   let reply1_wed = jsonFile.question3_yes_wed;
      //   let reply2_wed = jsonFile.last_question_yes_wed;
      //   let message1_wed = JSON.stringify(reply1_wed);
      //   let message2_wed = JSON.stringify(reply2_wed);
      //   let send_wed = JSON.parse(message1_wed);
      //   let question_wed = JSON.parse(message2_wed);
      //   setTimeout(() => {client.pushMessage(data.source.userId, question_wed)}, 6000);
      //   return setTimeout(() => {client.replyMessage(data.replyToken, send_wed)}, 3000);  
      
      // case 4:
      //   let reply1_thu = jsonFile.question3_yes_thu;
      //   let reply2_thu = jsonFile.last_question_yes_thu;
      //   let message1_thu = JSON.stringify(reply1_thu);
      //   let message2_thu = JSON.stringify(reply2_thu);
      //   let send_thu = JSON.parse(message1_thu);
      //   let question_thu = JSON.parse(message2_thu);
      //   setTimeout(() => {client.pushMessage(data.source.userId, question_thu)}, 6000);
      //   return setTimeout(() => {client.replyMessage(data.replyToken, send_thu)}, 3000);  
    
        let reply1_fri = jsonFile.question4_yes_fri;
        let message1_fri = JSON.stringify(reply1_fri);
        let send_fri = JSON.parse(message1_fri);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_fri)}, 3000);  

}

async function getLastQuestionNoObjFri(data, jsonFile){

      // case 3:
      //   let reply1_wed = jsonFile.question3_yes_wed;
      //   let reply2_wed = jsonFile.last_question_yes_wed;
      //   let message1_wed = JSON.stringify(reply1_wed);
      //   let message2_wed = JSON.stringify(reply2_wed);
      //   let send_wed = JSON.parse(message1_wed);
      //   let question_wed = JSON.parse(message2_wed);
      //   setTimeout(() => {client.pushMessage(data.source.userId, question_wed)}, 6000);
      //   return setTimeout(() => {client.replyMessage(data.replyToken, send_wed)}, 3000);  
      
      // case 4:
      //   let reply1_thu = jsonFile.question3_yes_thu;
      //   let reply2_thu = jsonFile.last_question_yes_thu;
      //   let message1_thu = JSON.stringify(reply1_thu);
      //   let message2_thu = JSON.stringify(reply2_thu);
      //   let send_thu = JSON.parse(message1_thu);
      //   let question_thu = JSON.parse(message2_thu);
      //   setTimeout(() => {client.pushMessage(data.source.userId, question_thu)}, 6000);
      //   return setTimeout(() => {client.replyMessage(data.replyToken, send_thu)}, 3000);  
      
        let reply1_fri = jsonFile.question4_no1_fri;
        let reply2_fri = jsonFile.question4_no2_fri;
        let message1_fri = JSON.stringify(reply1_fri);
        let message2_fri = JSON.stringify(reply2_fri);
        let send_fri = JSON.parse(message1_fri);
        let question_fri = JSON.parse(message2_fri);
        setTimeout(() => {client.pushMessage(data.source.userId, question_fri)}, 6000);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_fri)}, 3000);  
    
}

async function getLastMessageObjFri(data, jsonFile){

      // case 3:
      //   let reply_wed = jsonFile.last_message_wed;
      //   let message_wed = JSON.stringify(reply_wed);
      //   let send_wed = JSON.parse(message_wed);
      //   return setTimeout(() => {client.replyMessage(data.replyToken, send_wed)}, 3000);

      // case 4:
      //   let reply_thu = jsonFile.last_message_thu;
      //   let message_thu = JSON.stringify(reply_thu);
      //   let send_thu = JSON.parse(message_thu);
      //   return setTimeout(() => {client.replyMessage(data.replyToken, send_thu)}, 3000);


        let reply_fri = jsonFile.last_message_fri;
        let message_fri = JSON.stringify(reply_fri);
        let send_fri = JSON.parse(message_fri);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_fri)}, 3000);

  }





  async function getFirstQuestionObjSat(data, jsonFile){
    console.log('メッセージの場合');
              const pro = await client.getProfile(data.source.userId);
              let reply1_sat = jsonFile.first_message_sat;
              let reply2_sat = jsonFile.question1_sat;
              let message1_sat = JSON.stringify(reply1_sat);
              let message2_sat = JSON.stringify(reply2_sat);
              let send_sat = JSON.parse(message1_sat);
              let question_sat = JSON.parse(message2_sat);
              send_sat.text = pro.displayName + send_sat.text
              setTimeout(() => {client.pushMessage(data.source.userId, question_sat)}, 6000);
              return setTimeout(() => {client.replyMessage(data.replyToken, send_sat)}, 3000);    
    
};


async function getSecondQuestionObjSat(data, jsonFile){
  console.log('postbackの場合');
  let reply = jsonFile[data.postback.data];
  let message = JSON.stringify(reply);
  let question = JSON.parse(message);
  return setTimeout(() => {client.replyMessage(data.replyToken, question)}, 3000);
}

async function getThirdQuestionYesObjSat(data, jsonFile){
  let reply1_sat = jsonFile.question3_yes_sat;
  let message1_sat = JSON.stringify(reply1_sat);
  let send_sat = JSON.parse(message1_sat);
  return setTimeout(() => {client.replyMessage(data.replyToken, send_sat)}, 3000);  
}

async function getThirdQuestionNoObjSat(data, jsonFile){

  let reply1_sat = jsonFile.question3_no_sat;
  let message1_sat = JSON.stringify(reply1_sat);
  let send_sat = JSON.parse(message1_sat);
  return setTimeout(() => {client.replyMessage(data.replyToken, send_sat)}, 3000);  

}

async function getLastQuestionYesObjSat(data, jsonFile){

  let reply1_sat = jsonFile.last_question_yes1_sat;
  let reply2_sat = jsonFile.last_question_yes2_sat;
  let message1_sat = JSON.stringify(reply1_sat);
  let message2_sat = JSON.stringify(reply2_sat);
  let send_sat = JSON.parse(message1_sat);
  let question_sat = JSON.parse(message2_sat);
  setTimeout(() => {client.pushMessage(data.source.userId, question_sat)}, 6000);
  return setTimeout(() => {client.replyMessage(data.replyToken, send_sat)}, 3000);  

}

async function getLastQuestionNoObjSat(data, jsonFile){

  let reply1_sat = jsonFile.last_question_no1_sat;
  let reply2_sat = jsonFile.last_question_no2_sat;
  let message1_sat = JSON.stringify(reply1_sat);
  let message2_sat = JSON.stringify(reply2_sat);
  let send_sat = JSON.parse(message1_sat);
  let question_sat = JSON.parse(message2_sat);
  setTimeout(() => {client.pushMessage(data.source.userId, question_sat)}, 6000);
  return setTimeout(() => {client.replyMessage(data.replyToken, send_sat)}, 3000);  

}

async function getLastMessageYesObjSat(data, jsonFile){
  let reply_sat = jsonFile.last_message_yes_sat;
  let message_sat = JSON.stringify(reply_sat);
  let send_sat = JSON.parse(message_sat);
  return setTimeout(() => {client.replyMessage(data.replyToken, send_sat)}, 3000);
}

async function getLastMessageNoObjSat(data, jsonFile){
  let reply_sat = jsonFile.last_message_no_sat;
  let message_sat = JSON.stringify(reply_sat);
  let send_sat = JSON.parse(message_sat);
  return setTimeout(() => {client.replyMessage(data.replyToken, send_sat)}, 3000);
}


async function getAdditionalQuestionObjSat(data, jsonFile){

      // case 3:
      //   let reply_wed = jsonFile.additional_question_wed;
      //   let message_wed = JSON.stringify(reply_wed);
      //   let send_wed = JSON.parse(message_wed);
      //   return setTimeout(() => {client.replyMessage(data.replyToken, send_wed)}, 3000);
        
      // case 4:
      //   let reply_thu = jsonFile.additional_question_thu;
      //   let message_thu = JSON.stringify(reply_thu);
      //   let send_thu = JSON.parse(message_thu);
      //   return setTimeout(() => {client.replyMessage(data.replyToken, send_thu)}, 3000);

        let reply_sat = jsonFile.additional_question_sat;
        let message_sat = JSON.stringify(reply_sat);
        let send_sat = JSON.parse(message_sat);
        return setTimeout(() => {client.replyMessage(data.replyToken, send_sat)}, 3000);

}
