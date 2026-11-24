import { Router } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { signToken, requireAuth } from '../middleware/auth.js'

const router = Router()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

router.post('/register', async (req, res, next) => {
  try {
    const name = String(req.body.name || '').trim()
    const email = String(req.body.email || '').trim().toLowerCase()
    const password = String(req.body.password || '')

    if (name.length < 2) return res.status(400).json({ message: 'Please enter your full name.' })
    if (!EMAIL_RE.test(email)) return res.status(400).json({ message: 'That email address looks invalid.' })
    if (password.length < 8) return res.status(400).json({ message: 'Use at least 8 characters for your password.' })

    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ message: 'An account with this email already exists.' })

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, passwordHash, lastLoginAt: new Date() })

    res.status(201).json({ token: signToken(user.id), user: user.toSafeJSON() })
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase()
    const password = String(req.body.password || '')

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Email or password is incorrect.' })

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ message: 'Email or password is incorrect.' })

    user.lastLoginAt = new Date()
    await user.save()

    res.json({ token: signToken(user.id), user: user.toSafeJSON() })
  } catch (err) {
    next(err)
  }
})

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) return res.status(401).json({ message: 'Account not found.' })
    res.json({ user: user.toSafeJSON() })
  } catch (err) {
    next(err)
  }
})

export default router
