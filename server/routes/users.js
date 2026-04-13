const express = require('express')
const router = express.Router()
const User = require('../models/User')
const auth = require('../middleware/auth')

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password')
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router