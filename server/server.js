const express = require('express')
const mongoose = require('mongoose')   
const cors = require('cors')
require('dotenv').config()






const app = express()
app.use(cors({
  origin: '*'
}))
app.use(express.json())

const practiceRoutes = require('./routes/practice')
app.use('/api/practice', practiceRoutes)

const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)

const jobRoutes = require('./routes/jobs')
app.use('/api/jobs', jobRoutes)

const applyRoutes = require('./routes/apply')
app.use('/api/apply', applyRoutes)

const userRoutes = require('./routes/users')
app.use('/api/users', userRoutes)

const dashboardRoutes = require('./routes/dashboard')
app.use('/api/dashboard', dashboardRoutes)

app.get('/',(req,res) => {
    res.json({message: ' sever is running!'})
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log('MongoDB connection failed:', error)
  })