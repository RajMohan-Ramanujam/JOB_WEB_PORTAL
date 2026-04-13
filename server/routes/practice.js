const express = require('express')
const router = express.Router()

const users = ['raj', 'priya', 'kumar']

router.post('/test', async (req, res) => {
  try {
    const { username } = req.body

    const exists = users.includes(username)

    if (exists) {
      return res.status(400).json({ message: 'Username taken' })
    }

    res.json({ message: `Welcome ${username}!` })

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router