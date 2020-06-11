// Get Enviroment Variables
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const projectId = process.env.projectId;

// Initialization
const functions = require('firebase-functions');
const client = require('twilio')(accountSid, authToken);
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

exports.TwilioWebhook = functions.https.onRequest(async (request, response) => {
    const body = request.body;
    const receivedMsg = body.Body;
    const userNumber = body.From;
    const myNumber = request.body.To;

    if(receivedMsg){
      const sessionPath = sessionClient.sessionPath(projectId, userNumber);
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: receivedMsg,
            languageCode: "pt-BR",
          },
        },
      };
  
      try {
        const fulfillmentMessages = (await sessionClient.detectIntent(request))[0].queryResult.fulfillmentMessages;
        for (const response of fulfillmentMessages){
          let responseMsg = "";
          if(response.text){
            for (const text of response.text.text){
              responseMsg = `${responseMsg}${text}\n`;
            }
          }
          await client.messages.create({
              from: myNumber,
              body: responseMsg,
              to: userNumber
          })
        }
      }
      catch(e){
        console.log(e)
      }
    }
});