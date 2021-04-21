# Dialogflow WhatsApp (Twilio) Integration

A simple way to connect and integrate Dialogflow and Twilio to create WhatsApp Chatbots

**2021 Update:** Altered to use Twilio Functions instead of Google Cloud Functions due to a more simple workflow with a more secure infrastructure.

## How to Connect With Twilio with Dialogflow

**Before Starting** - Create your Dialogflow project and also a Twilio project, we will use both of them for the connection.

### Part 1 -- Dialogflow Service Account

**Step 1 -** Open the Google Console for Service Accounts ([here](https://console.cloud.google.com/projectselector/iam-admin/serviceaccounts/create)) and select the Google Project of your Dialogflow chatbot.

**Step 2 -** Fill a name for your service account. ("_TwilioConnector_" is a good option) and click on **Create**.

**Step 3-** Add the **Owner** role (Quick Start -> Basic -> Owner) and click on **Done** to finish this process.

**Step 4-** Select the created service account then click on **Keys** --> **Add Key** --> **Create New Key** --> **Create**

**Step 5-** A json file will be downloaded. Rename it to **dialogflow.json**

### Part 2 -- Twilio Function

**Step 6-** Open the Twilio Functions page ([here](https://www.twilio.com/console/functions)) and create a new service (I recommend naming it **DialogflowService**).

**Step 7-** Click on **Add** then **Add Function**. Set the path to **/dialogflow**

**Step 8-** Copy the code from the index.js in this repository and paste it to the code editor. Click on **save**.

**Step 9-** In settings, add a new Enviroment Variable with the key **DIALOGFLOW_PROJECT_ID** and set its value to your dialogflow project ID (you can find it in your Dialogflow agent's settings)

**Step 10-** Also in settings, click in **Dependencies** and add the module **dialogflow** with version **1.2**

**Step 11-** Click on **Add** then **Upload File**. Select your **dialogflow.json** file. Set it's visibility to **private**. Click on **Upload**.

**Step 12-** Click on **Deploy All**

### Part 3 -- Twilio Sandbox

**Step 13-** Click on the three dots next to your created function name and select **copy URL**.

**Step 14** - In your Twilio Sandbox configuration ([link](https://www.twilio.com/console/sms/whatsapp/sandbox)), paste the URL into the "**when a message comes in**" field and click **save**.

**Step 15** - Test your chatbot. You should now be able to talk to your Dialogflow chatbot through the Twilio Sandbox's WhatsApp number.

## How to Send Media Files

You can also send media files such as Images, Audios, PDFs and Videos. To do so, add a "Custom Payload" response in your Dialogflow intent with the code:

{

"mediaUrl": "<<YOUR  URL>>"

}

You can optionally include a **text** paramater to send a message alongside the image:

{

"mediaUrl": "<<YOUR  URL>>",

"text": "<<YOUR  MESSAGE>>"

}

[See here](https://support.twilio.com/hc/en-us/articles/360017961894-Sending-and-Receiving-Media-with-WhatsApp-Messaging-on-Twilio-Beta-) Twilio's documentation to learn more about the limitations for sending media files.
