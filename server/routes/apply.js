const express = require('express')
const Application = require('../models/Application')
const Job = require('../models/Job')
const auth = require('../middleware/auth')

const router = express.Router()
router.post('/:jobId', auth, async (req, res) => {
  try {
    if (req.user.role !== 'seeker') {
      return res.status(403).json({ message: 'Only seekers can apply' })
    }

    // Check if already applied
    const existing = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user.userId
    })

    if (existing) {
      return res.status(400).json({ message: 'Already applied to this job' })
    }

    const application = await Application.create({
      job: req.params.jobId,
      applicant: req.user.userId
    })

    res.status(201).json(application)

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/my', auth, async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.userId
    }).populate('job', 'title company location salary')
    res.json(applications)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    res.json(application)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})


router.delete('/:id', auth, async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id)
    res.json({ message: 'Application cancelled' })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/all', auth, async (req, res) => {
  try {
    const myJobs = await Job.find({ postedBy: req.user.userId })
    const jobIds = myJobs.map(job => job._id)
    
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate('job', 'title company location')
      .populate('applicant', 'name email')
    
    res.json(applications)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})


module.exports = router