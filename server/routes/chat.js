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

    if (!message) {
      return res.status(400).json({ message: 'Message is required' })
    }

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
      model: 'llama3-70b-8192', // ✅ FIXED MODEL
    })

    const reply = response.choices[0]?.message?.content || "No response"

    res.json({ reply })

  } catch (error) {
    console.log("Groq Error:", error.message)

    res.status(500).json({ 
      message: 'AI service error',
      error: error.message // optional for debugging
    })
  }
})

module.exports = router