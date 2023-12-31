const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcryptjs");

const CustomerSchema = new Schema(
  {
    customerNo: {
      type: String,
      required: false //
    },
    firstName: {
      type: String,
      required: false //
    },
    lastName: {
      type: String,
      required: false //
    },
    login: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    telephone: {
      type: String
    },
    birthdate: {
      type: String
    },
    gender: {
      type: String
    },
    avatarUrl: {
      type: String
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    },
    enabled: {
      type: Boolean,
      required: true,
      default: false //
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { strict: false }
);

CustomerSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = Customer = mongoose.model("customers", CustomerSchema);
