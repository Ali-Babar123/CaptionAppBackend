// utils/sendOtpEmail.js
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendOtpEmail(recipient_email, OTP) {
  const msg = {
    to: recipient_email,
    from: process.env.FROM_EMAIL, // Must be verified in SendGrid dashboard
    subject: "Password Recovery OTP",
    html: `
      <div style="font-family:Arial,sans-serif;">
        <h2>Password Recovery</h2>
        <p>Your OTP is:</p>
        <h3 style="background:#00466a;color:#fff;display:inline-block;padding:10px 20px;border-radius:5px;">
          ${OTP}
        </h3>
        <p>Valid for 5 minutes.</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("SendGrid Error:", error.response?.body || error.message);
  }
}

module.exports = sendOtpEmail;
