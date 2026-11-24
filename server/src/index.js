import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.js'
import resumeRoutes from './routes/resumes.js'
import atsRoutes from './routes/ats.js'
import contactRoutes from './routes/contact.js'
import { errorHandler } from './middleware/auth.js'

const app = express()
const port = process.env.PORT || 5000
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
      return cb(new Error('Not allowed by CORS'))
    },
    credentials: true,
  })
)
app.use(express.json({ limit: '2mb' }))
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'resumate-api', uptime: process.uptime() })
})

app.use('/api/auth', authRoutes)
app.use('/api/resumes', resumeRoutes)
app.use('/api/ats', atsRoutes)
app.use('/api/contact', contactRoutes)

// Optional single-service deploy: serve the built client from Express when
// client/dist exists in production (or when SERVE_CLIENT=true).
const here = path.dirname(fileURLToPath(import.meta.url))
const clientDist = process.env.CLIENT_DIST || path.resolve(here, '../../client/dist')
const serveClient =
  process.env.SERVE_CLIENT === 'true' ||
  (process.env.NODE_ENV === 'production' && fs.existsSync(path.join(clientDist, 'index.html')))

if (serveClient) {
  app.use(express.static(clientDist, { maxAge: '1h', index: false }))
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next()
    res.sendFile(path.join(clientDist, 'index.html'))
  })
}

app.use('/api', (req, res) => res.status(404).json({ message: 'Endpoint not found.' }))
app.use(errorHandler)

async function start() {
  try {
    await connectDB()
    app.listen(port, () => {
      console.log(`  ✓ Resumate API running at http://localhost:${port}`)
    })
  } catch (err) {
    console.error('\n  ✗ Could not start the API:', err.message, '\n')
    process.exit(1)
  }
}

start()
