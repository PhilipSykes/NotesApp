import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from './auth.js'
import authRouter from './routes/auth.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: process.env.FRONTEND_URL!, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/auth', authRouter)

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`)
})
