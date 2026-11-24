import { Router } from 'express'
import Resume from '../models/Resume.js'
import { requireAuth } from '../middleware/auth.js'
import { analyzeResume, resumeToText } from '../utils/ats.js'

const router = Router()
router.use(requireAuth)

const MAX_RESUMES = 30

router.get('/', async (req, res, next) => {
  try {
    const resumes = await Resume.find({ user: req.userId }).sort({ updatedAt: -1 })
    res.json({ resumes })
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const count = await Resume.countDocuments({ user: req.userId })
    if (count >= MAX_RESUMES) {
      return res.status(400).json({ message: 'You have reached the 30-resume limit.' })
    }

    const resume = await Resume.create({
      user: req.userId,
      title: req.body.title || 'Untitled resume',
      template: req.body.template || 'modern',
      theme: req.body.theme || undefined,
      data: req.body.data || undefined,
    })
    res.status(201).json({ resume })
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.userId })
    if (!resume) return res.status(404).json({ message: 'Resume not found.' })
    res.json({ resume })
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.userId })
    if (!resume) return res.status(404).json({ message: 'Resume not found.' })

    const { title, template, theme, data } = req.body
    if (typeof title === 'string') resume.title = title.slice(0, 120)
    if (typeof template === 'string') resume.template = template
    if (theme && typeof theme === 'object') resume.theme = { ...resume.theme.toObject?.(), ...theme }
    if (data && typeof data === 'object') resume.data = data

    resume.lastEditedAt = new Date()
    if (req.body.calculateScore) {
      resume.atsScore = analyzeResume({ text: resumeToText(resume) }).score
    }

    await resume.save()
    res.json({ resume })
  } catch (err) {
    next(err)
  }
})

router.post('/:id/duplicate', async (req, res, next) => {
  try {
    const source = await Resume.findOne({ _id: req.params.id, user: req.userId })
    if (!source) return res.status(404).json({ message: 'Resume not found.' })

    const copy = await Resume.create({
      user: req.userId,
      title: `${source.title} (copy)`,
      template: source.template,
      theme: source.theme,
      data: source.data,
      atsScore: source.atsScore,
    })
    res.status(201).json({ resume: copy })
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Resume.findOneAndDelete({ _id: req.params.id, user: req.userId })
    if (!deleted) return res.status(404).json({ message: 'Resume not found.' })
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

export default router
