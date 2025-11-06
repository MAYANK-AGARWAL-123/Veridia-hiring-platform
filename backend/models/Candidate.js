const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  portfolio: {
    type: String,
  },
  college: {
    type: String,
  },
  branch: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const bcrypt = require('bcryptjs');

CandidateSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('candidate', CandidateSchema);