// Get Enviroment Variables
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const projectId = process.env.projectId;

// Initialization
const functions = require('firebase-functions');
const client = require('twilio')(accountSid, authToken);
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

// Twilio Webhook Function
exports.TwilioWebhook = functions.https.onRequest(async (request, response) => {
  // Get WhatsApp Message Information  
  const body = request.body;
  const receivedMsg = body.Body;
  const userNumber = body.From;
  const myNumber = request.body.To;

  if(receivedMsg){
    // Configure Dialogflow Session
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
  
    // Get Dialogflow Response
    try {
      const fulfillmentMessages = (await sessionClient.detectIntent(request))[0].queryResult.fulfillmentMessages;
      
      // Iterate over every message
      for (const response of fulfillmentMessages){
        // Send Text Message
        if(response.text){
            const responseMsg = response.text.text[0];
            const body = {
                from: myNumber,
                body: responseMsg,
                to: userNumber
            }
            await client.messages.create(body)
        }

        // Send media files
        if(response.payload){
          if(response.payload.fields.mediaUrl){
            const mediaUrl = response.payload.fields.mediaUrl.stringValue;
            
            let text = "";
            
            if(response.payload.fields.text){
              text = response.payload.fields.text.stringValue
            }
            
            const body = {
                from: myNumber,
                body: text,
                to: userNumber,
                mediaUrl,
            }
            await client.messages.create(body)
          }
        }
      }
    }
    catch(e){
      console.log(e)
    }
  }
  response.status(200).send("<Response><Message>Sent!</Message></Response>");
});
