import { Router } from 'express'
import Resume from '../models/Resume.js'
import { requireAuth } from '../middleware/auth.js'
import { analyzeResume, resumeToText } from '../utils/ats.js'

const router = Router()

router.post('/check', async (req, res, next) => {
  try {
    const { text, jobDescription, resumeId } = req.body || {}
    let sourceText = typeof text === 'string' ? text : ''

    if (!sourceText && resumeId && req.headers.authorization) {
      // Optional: score a saved resume when the caller is signed in.
      try {
        const token = req.headers.authorization.replace('Bearer ', '')
        const { default: jwt } = await import('jsonwebtoken')
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const resume = await Resume.findOne({ _id: resumeId, user: payload.sub })
        if (resume) sourceText = resumeToText(resume)
      } catch {
        /* fall through to validation below */
      }
    }

    if (!sourceText.trim()) {
      return res.status(400).json({ message: 'Paste your resume text or pick a saved resume first.' })
    }
    if (sourceText.length > 60000) {
      return res.status(400).json({ message: 'That document is too large to scan.' })
    }

    const report = analyzeResume({
      text: sourceText,
      jobDescription: typeof jobDescription === 'string' ? jobDescription : '',
    })

    res.json({ report })
  } catch (err) {
    next(err)
  }
})

export default router
