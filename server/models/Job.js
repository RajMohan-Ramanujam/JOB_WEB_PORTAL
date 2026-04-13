const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'remote', 'internship'],
    required: true
  },
  skills: [String],
  status: { type: String, default: 'active' },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

module.exports = mongoose.model('Job', jobSchema)