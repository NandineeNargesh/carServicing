// test-notify.js
require('dotenv').config();
const nodemailer = require('nodemailer');
const twilio = require('twilio');

async function testSystem() {
  console.log("Starting Test...");

  // 1. TEST EMAIL
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Khud ko bhej kar check karein
      subject: "Test Notification",
      text: "Email system is working!"
    });
    console.log("✅ Email sent successfully!");
  } catch (err) { console.error("❌ Email Failed:", err.message); }

  // 2. TEST SMS
  const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  try {
    const msg = await client.messages.create({
      body: "SMS system is working!",
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.MY_TEST_NUMBER // Aapka verified number
    });
    console.log("✅ SMS sent successfully! SID:", msg.sid);
  } catch (err) { console.error("❌ SMS Failed:", err.message); }
}

testSystem();