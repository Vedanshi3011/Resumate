import { Router } from 'express'
import Contact from '../models/Contact.js'

const router = Router()

router.post('/', async (req, res, next) => {
  try {
    const name = String(req.body.name || '').trim()
    const email = String(req.body.email || '').trim()
    const message = String(req.body.message || '').trim()

    if (!name || !email || message.length < 10) {
      return res.status(400).json({ message: 'Please add your name, email and a short message.' })
    }

    await Contact.create({ name, email, topic: req.body.topic, message })
    res.status(201).json({ ok: true, message: 'Thanks — our team will reply within one business day.' })
  } catch (err) {
    next(err)
  }
})

export default router
