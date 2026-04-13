const express = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, dob } = req.body

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    await User.create({ name, email, password: hashedPassword, role, dob })

    res.status(201).json({ message: 'Account created successfully' })

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const existing = await User.findOne({ email })
    if (!existing) {
      return res.status(400).json({ message: 'Email not found' })
    }

    const isMatch = await bcryptjs.compare(password, existing.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password' })
    }

    const token = jwt.sign(
      { userId: existing._id, role: existing.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ token, role: existing.role, name: existing.name })

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router