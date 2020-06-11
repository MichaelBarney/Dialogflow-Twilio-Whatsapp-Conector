
# Dialogflow WhatsApp (Twilio) Integration

A simple way to connect/integrate Dialogflow and Twilio to create Whatsapp Chatbots

## How to Connect With Dialogflow

**Step 1 -** Open the Google Console for Cloud Functions ([here](https://console.cloud.google.com/functions)) and make sure you have the Google Project of your Dialogflow chatbot selected.

**Step 2 -** Click on "Create Function" to open the interface for function creation.

**Step 3-** Set the name of the function (**twilio-conector** is a good option)

**Step 4-** On the **Source Code** option, select **Inline Editor** .

**Step 5-** In the **index.js** tab, copy and paste the code from the index.js file in this repository.

**Step 6-** In the **package.json** tab, copy and paste the code from the package.json file in this repository.

**Step 7** - Set the **Function to Execute** field to "**TwilioWebhook**"

**Step 8** - Click on the Dropdown "**Enviroment Variables, Networking, Timeouts and More**"

**Step 9** - In the **Enviroment** section, click on "Add Variable"

**Step 10** - Add variables called:

 - **projectId** (the project ID found on your Dialogflow's agent settings page)
 -  **accountSid** (your twilio account Sid value, found on the main dashboard of your Twilio project)
 -  **authToken** (the authentication token for your Twilio acconut, found on the main dashboard of your Twilio project)
 
**Step 11** - Click on "Create". In 1-2 minutes your integration will be up and running.

**Step 12** - Click on your created function. Open the **Trigger** tab and copy the URL.

**Step 13** - In your Twilio Sandbox configuration ([link](https://www.twilio.com/console/sms/whatsapp/sandbox)), paste the URL into the "**when a message comes in**" field and click **save**.

**Step 14** - Test your chatbot. You should now be able to talk to your Dialogflow chatbot through the Twilio Sandbox's WhatsApp number.
