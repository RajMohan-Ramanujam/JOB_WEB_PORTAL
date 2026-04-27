const express = require('express')
const router = express.Router()
const Groq = require('groq-sdk')
const auth = require('../middleware/auth')

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

router.post('/', auth, async (req, res) => {
  try {
    const { message } = req.body

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a helpful career assistant for a job portal. 
          Help job seekers with resume tips, interview preparation and career advice. 
          Help recruiters write job descriptions and find good candidates.
          Keep answers short and helpful.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      model: 'llama3-8b-8192',
    })

    const reply = response.choices[0].message.content
    res.json({ reply })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'AI service error' })
  }
})

module.exports = router