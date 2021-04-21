const dialogflow = require("dialogflow");

exports.handler = async function (context, event, callback) {
  let twiml = new Twilio.twiml.MessagingResponse();

  const receivedMsg = event.Body;
  const userNumber = event.From;

  if (!receivedMsg) return callback("No message received", twiml);

  // Get response from Dialogflow
  let diallofglowJsonFilePath = Runtime.getAssets()["/dialogflow.json"].path;
  const dialogflogSessionClient = new dialogflow.SessionsClient({
    keyFilename: diallofglowJsonFilePath,
  });
  const dialogflowProjectId = process.env.DIALOGFLOW_PROJECT_ID;
  const dialogflowSessionPath = dialogflogSessionClient.sessionPath(
    dialogflowProjectId,
    userNumber
  );
  const dialogflowRequestParams = {
    session: dialogflowSessionPath,
    queryInput: {
      text: {
        text: receivedMsg,
        languageCode: "pt-BR",
      },
    },
  };
  const dialogflowRequest = await dialogflogSessionClient.detectIntent(
    dialogflowRequestParams
  );
  const dialogflowResponses =
    dialogflowRequest[0].queryResult.fulfillmentMessages;

  // Iterate over every message
  for (const response of dialogflowResponses) {
    // Texts
    if (response.text) {
      const text = response.text.text[0];
      twiml.message(text);
    }

    // Payloads
    if (response.payload) {
      const fields = response.payload.fields;
      const payloadMessage = await twiml.message();
      if (fields.mediaUrl) {
        const mediaUrl = fields.mediaUrl.stringValue;
        payloadMessage.media(mediaUrl);
      }
      if (fields.text) {
        const text = fields.text.stringValue;
        payloadMessage.body(text);
      }
    }
  }
  return callback(null, twiml);
};
