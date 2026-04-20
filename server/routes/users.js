const express = require('express')
const router = express.Router()
const User = require('../models/User')
const auth = require('../middleware/auth')
const upload = require('../middleware/Upload')

// Get profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password')
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// Upload resume
router.post('/resume', auth, (req, res) => {
  upload.single('resume')(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ message: err.message })
      }

      if (req.user.role !== 'seeker') {
        return res.status(403).json({ message: 'Only seekers can upload resume' })
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' })
      }

      const resumePath = 'uploads/' + req.file.filename

      await User.findByIdAndUpdate(req.user.userId, {
        resume: resumePath
      })

      res.json({ message: 'Resume uploaded successfully', path: resumePath })

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Server error' })
    }
  })
})
// Upload profile picture
router.post('/profile-picture', auth, (req, res) => {
  upload.single('profilePicture')(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ message: err.message })
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' })
      }

      const picPath = 'uploads/' + req.file.filename

      await User.findByIdAndUpdate(req.user.userId, {
        profilePicture: picPath
      })

      res.json({ message: 'Profile picture uploaded successfully', path: picPath })

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })
    }
  })
})

module.exports = router