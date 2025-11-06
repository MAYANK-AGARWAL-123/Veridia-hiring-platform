const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  portfolio: { type: String },
  college: { type: String, required: true },
  branch: { type: String, required: true },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'candidate',
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'job',
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  coverLetter: {
    type: String,
  },
  status: {
    type: String,
    enum: ['In Review', 'Interviewing', 'Offered', 'Rejected'],
    default: 'In Review',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('application', ApplicationSchema);