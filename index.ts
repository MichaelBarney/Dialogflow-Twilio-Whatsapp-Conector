import * as functions from 'firebase-functions';

// Twilio
const accountSid = '###';
const authToken = '###';
const client = require('twilio')(accountSid, authToken);

// Dialogflow
const dialogflow = require('dialogflow');
const projectId = ###;

/**
 * Whatsapp
 */
export const TwilioWebhook = functions.https.onRequest(async (request, response) => {
    const receivedMsg = request.body.Body;
    const number = request.body.From;
    const myNumber = request.body.To;

    if(receivedMsg){
        // Detect message with Dialogflow
        const answers = await processIntent(receivedMsg, number);

        // Iterate over Receibes Messages
        for (const answer of answers){
            let msg = "";
            if(answer.text){
              for (const text of answer.text.text){
                msg = `${msg}${text}\n`;
              }
            }

            if(answer.quickReplies){
              msg = `${msg}${answer.quickReplies.title}\n\n`
              for (const i in answer.quickReplies.quickReplies){
                msg = `${msg}- ${answer.quickReplies.quickReplies[i]}\n`
              }
            }

            // Send Messages
            await client.messages
            .create({
                from: myNumber,
                body: msg,
                to: number
            })
            .then((message: { sid: String; }) => {
                console.log(message.sid);
            });
        }
    }
});

async function processIntent(
    msg:String,
    sessionId:String
  ) {

    console.log("mensagem: " + mensagem);
    // Start Session
    const sessionClient = new dialogflow.SessionsClient();

    // Define Path
    const sessionPath = sessionClient.sessionPath("projectId", sessionId);
  
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: msg,
          languageCode: "pt-BR",
        },
      },
    };
  
    const response = await sessionClient.detectIntent(request);

    return response[0].queryResult.fulfillmentMessages;
  }

  /**
   * Dialogflow Fufillment
   */
  const {WebhookClient} = require('dialogflow-fulfillment');
  const {Suggestion, Payload} = require('dialogflow-fulfillment');
  
  exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const userID = request.body.session

    const agent = new WebhookClient({ request, response });
    const intentMap = new Map();
    intentMap.set('###', ###);

    agent.handleRequest(intentMap);

  }
});
