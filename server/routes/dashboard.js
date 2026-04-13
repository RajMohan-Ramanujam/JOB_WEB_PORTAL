const express = require('express')
const router = express.Router()
const Application = require('../models/Application')
const Job = require('../models/Job')
const auth = require('../middleware/auth')

// Seeker dashboard stats
router.get('/seeker', auth, async (req, res) => {
  try {
    const totalApplied = await Application.countDocuments({ applicant: req.user.userId })
    const pending = await Application.countDocuments({ applicant: req.user.userId, status: 'pending' })
    const accepted = await Application.countDocuments({ applicant: req.user.userId, status: 'accepted' })
    const rejected = await Application.countDocuments({ applicant: req.user.userId, status: 'rejected' })

    res.json({ totalApplied, pending, accepted, rejected })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// Recruiter dashboard stats
router.get('/recruiter', auth, async (req, res) => {
  try {
    const jobsPosted = await Job.countDocuments({ postedBy: req.user.userId })
    const myJobs = await Job.find({ postedBy: req.user.userId })
    const jobIds = myJobs.map(job => job._id)
    const totalApplicants = await Application.countDocuments({ job: { $in: jobIds } })
    const shortlisted = await Application.countDocuments({ job: { $in: jobIds }, status: 'accepted' })

    res.json({ jobsPosted, totalApplicants, shortlisted })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router