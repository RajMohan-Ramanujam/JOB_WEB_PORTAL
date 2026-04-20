const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true, 
      trim: true 
    },

    description: { 
      type: String, 
      required: true 
    },

    company: { 
      type: String, 
      required: true, 
      trim: true 
    },

    location: { 
      type: String, 
      required: true, 
      trim: true 
    },

    salary: { 
      type: String 
    },

    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'remote', 'internship'],
      required: true
    },

    skills: {
      type: [String],
      default: []
    },

    status: { 
      type: String, 
      enum: ['active', 'closed'],
      default: 'active' 
    },

    // ✅ IMPORTANT FIELD (used in your filtering)
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }

  },
  { timestamps: true }
)

module.exports = mongoose.model('Job', jobSchema)