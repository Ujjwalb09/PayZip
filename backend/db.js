const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mailSender = require("./utils/mailSender");

mongoose.connect(
  "mongodb+srv://ujjwalbhatt09:Bhatt_2021@cluster0.e1a378i.mongodb.net/payments_app"
);

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

// Method to generate a hash from plain text
UserSchema.methods.createHash = async function (plainTextPassword) {
  // Hashing user's salt and password with 10 iterations,
  const saltRounds = 10;

  // First method to generate a salt and then create hash
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainTextPassword, salt);

  // Second mehtod - Or we can create salt and hash in a single method also
  // return await bcrypt.hash(plainTextPassword, saltRounds);
};

// Validating the candidate password with stored hash and hash function
UserSchema.methods.validatePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 3, // The document will be automatically deleted after 3 minutes of its creation time
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<h1>Your OTP code is: ${otp}</h1>
       <p>Your OTP is valid for 3 mins</p>`
    );
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}
otpSchema.pre("save", async function (next) {
  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

const Account = mongoose.model("account", AccountSchema);
const User = mongoose.model("users", UserSchema);
const OTP = mongoose.model("OTP", otpSchema);

module.exports = {
  User,
  Account,
  OTP,
};
