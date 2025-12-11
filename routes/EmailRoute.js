// routes/otpRoutes.js
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const sendOtpEmail = require("../middleware/email"); // adjust path if needed

// Temporary in-memory OTP store
let otpStore = {};

// STEP 1 — Send OTP
router.post("/send_recovery_email", async (req, res) => {
  try {
    const { recipient_email } = req.body;

    if (!recipient_email) {
      return res.status(400).json({ success: false, message: "Email required" });
    }

    // Generate 4 digit OTP
    const OTP = crypto.randomInt(1000, 9999).toString();

    // Store with expiry (5 minutes)
    otpStore[recipient_email] = {
      otp: OTP,
      expires: Date.now() + 5 * 60 * 1000
    };

    // Send OTP using SendGrid
    await sendOtpEmail(recipient_email, OTP);

    res.json({ success: true, message: "OTP sent to email" });

  } catch (error) {
    console.log("Send email error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP email" });
  }
});


// STEP 2 — Verify OTP
router.post("/verify_otp", (req, res) => {
  const { recipient_email, otp } = req.body;

  const record = otpStore[recipient_email];
  if (!record) {
    return res.status(400).json({
      success: false,
      message: "No OTP found. Request again."
    });
  }

  // Check expiry
  if (record.expires < Date.now()) {
    delete otpStore[recipient_email];
    return res.status(400).json({ success: false, message: "OTP expired" });
  }

  // Check match
  if (record.otp !== otp) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  // Success
  res.json({ success: true, message: "OTP verified. You can now reset password." });
});

module.exports = router;
