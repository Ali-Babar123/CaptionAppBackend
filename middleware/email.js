const nodemailer = require("nodemailer");

async function sendVerificationEmail(email, otp) {
  if (!email) {
    throw new Error("❌ No recipient email provided");
  }
  console.log("📧 Sending OTP to:", email, "OTP:", otp);

  // Try both ports: 587 (TLS) first, then 465 (SSL)
  const options = [
    { port: 587, secure: false }, // TLS
    { port: 465, secure: true },  // SSL
  ];

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: "Verify Your Email",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>Email Verification</h2>
        <p>Use the following OTP to verify your account:</p>
        <h3 style="background:#00466a;color:#fff;display:inline-block;padding:8px 16px;border-radius:4px;">
          ${otp}
        </h3>
        <p>This OTP will expire in 60 sec.</p>
      </div>
    `,
  };

  for (let opt of options) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: opt.port,
        secure: opt.secure,
        auth: {
          user: process.env.MY_EMAIL,
          pass: process.env.MY_PASSWORD,
        },
      });

      let info = await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent via port ${opt.port}:`, info.response);
      return; // success
    } catch (error) {
      console.log(`❌ Failed on port ${opt.port}:`, error.response || error.toString());
      // try next port
    }
  }

  throw new Error("Email sending failed on both ports");
}

module.exports = sendVerificationEmail;
