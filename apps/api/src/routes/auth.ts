import { Router } from 'express'
import passport from '../auth.js'
import jwt from 'jsonwebtoken'
import { prisma } from '../db.js'

const router = Router()

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  async (req, res) => {
    const profile = req.user as any

    const user = await prisma.user.upsert({
      where: { googleId: profile.id },
      update: {
        name: profile.displayName,
        avatar: profile.photos[0].value,
      },
      create: {
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        avatar: profile.photos[0].value,
      },
    })

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, avatar: user.avatar },
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

router.get('/me', (req, res) => {
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

router.post('/logout', (req, res) => {
  res.clearCookie('token')
  res.json({ success: true })
})

export default router
