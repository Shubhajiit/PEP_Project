const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/* -------------------- OTP SCHEMA -------------------- */
const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    otp: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//  HASH OTP BEFORE SAVE
otpSchema.pre("save", async function (next) {
  // If OTP is not modified, skip hashing
  if (!this.isModified("otp")) return next();

  this.otp = await bcrypt.hash(this.otp, 10);
  next();
});

/* -------------------- OTP COMPARE METHOD -------------------- */
otpSchema.methods.compareOtp = async function (enteredOtp) {
  return await bcrypt.compare(enteredOtp, this.otp);
};

/* -------------------- EXPORT MODEL -------------------- */
module.exports = mongoose.model("OTP", otpSchema);
