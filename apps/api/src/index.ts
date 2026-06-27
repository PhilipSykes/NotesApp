import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from './auth.js'
import jwt from 'jsonwebtoken'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const user = req.user as any
    const token = jwt.sign(
      {
        id: user.id,
        email: user.emails[0].value,
        name: user.displayName,
        avatar: user.photos[0].value,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.redirect('http://localhost:5173')
  }
)

app.get('/auth/me', (req, res) => {
  const token = req.cookies.token

  if (!token) {
    res.status(401).json({ error: 'Not authenticated' })
    return
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!)
    res.json({ user })
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
})

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`)
})
