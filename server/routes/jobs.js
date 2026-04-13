const express = require('express')
const Job = require('../models/Job')
const auth = require('../middleware/auth')

const router = express.Router()

// ✅ GET / — Get all jobs (Public)
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find()
    res.json(jobs)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})


// ✅ POST / — Create job (Recruiter only)
router.post('/', auth, async (req, res) => {  
  try {
    // Check role 
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Only recruiters can post jobs' })
    } 
 
    const job = await Job.create({
      ...req.body,
      postedBy: req.user.userId
    })

    res.status(201).json(job)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/my', auth, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.userId })
    res.json(jobs)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})


// ✅ DELETE /:id — Delete job (Recruiter only)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Check role
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Only recruiters can delete jobs' })
    }

    await Job.findByIdAndDelete(req.params.id)

    res.json({ message: 'Job deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router