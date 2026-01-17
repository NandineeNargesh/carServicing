const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Email Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Twilio Setup
const twilioClient = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendUpdates = async (userEmail, userPhone, userName, status) => {
  // 1. Email Bhejna (Dynamic - Sabke liye chalega)
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Vehicle Service Update - CarsServices',
    text: `Hi ${userName}, your car service status is now: ${status}.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", userEmail);
  } catch (err) { console.error("Email Fail:", err.message); }

  // 2. SMS Bhejna (Sirf verified numbers par jayega trial mein)
  if (userPhone) {
    try {
      await twilioClient.messages.create({
        body: `Hi ${userName}, your car status: ${status}.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: userPhone // Ye DB se dynamic aayega
      });
      console.log("SMS sent to:", userPhone);
    } catch (err) { console.error("Twilio Fail:", err.message); }
  }
};

module.exports = { sendUpdates };