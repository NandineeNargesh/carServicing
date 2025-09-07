// 1. Load our secret credentials from the .env file
require('dotenv').config();

const twilio = require("twilio");

// 2. Use the credentials from process.env
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

async function sendTestMessage() {
  try {
    const message = await client.messages.create({
      body: "Hello from your CarsServices application!",
      from: twilioPhoneNumber,
      
      // --- THIS IS THE FIX ---
      // Replace the placeholder with your verified number
      to: "+919644667283", 
    });

    console.log("Message sent successfully! SID:", message.sid);
  } catch (error) {
    console.error("Failed to send SMS:", error.message);
  }
}

sendTestMessage();