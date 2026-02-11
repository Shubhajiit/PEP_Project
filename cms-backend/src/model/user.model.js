const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/* -------------------- USER SCHEMA -------------------- */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/* -------------------- HASH PASSWORD BEFORE SAVE -------------------- */
userSchema.pre("save", async function (next) {
  // If password is not modified, skip hashing
  if (!this.isModified("password")) return next();

  // Hash password
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/* -------------------- PASSWORD COMPARE METHOD -------------------- */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/* -------------------- EXPORT MODEL -------------------- */
module.exports = mongoose.model("User", userSchema);
