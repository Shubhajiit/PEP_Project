const User = require("../model/user.model");
const OTP = require("../model/otp.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OTP.create({ email, otp, expiresAt });

    await transporter.sendMail({
      to: email,
      subject: "Your OTP",
      text: `OTP is ${otp}`,
    });

    return res.json({ message: "OTP sent" });
  } catch (err) {
    return res.status(500).json({ message: err?.message || "Failed to send OTP" });
  }
};



exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP are required" });

    const record = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!record) return res.status(400).json({ message: "No OTP" });

    if (record.expiresAt < new Date())
      return res.status(400).json({ message: "OTP expired" });

    const match = await bcrypt.compare(String(otp), record.otp);
    if (!match) return res.status(400).json({ message: "Invalid OTP" });

    await User.updateOne({ email }, { isVerified: true });

    return res.json({ message: "Email verified" });
  } catch (err) {
    return res.status(500).json({ message: err?.message || "Failed to verify OTP" });
  }
};


exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.create({ email, password });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err?.message || "Failed to signup" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET is not configured" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    });

    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: err?.message || "Failed to login" });
  }
};

