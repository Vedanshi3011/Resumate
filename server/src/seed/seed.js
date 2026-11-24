import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { connectDB } from '../config/db.js'
import User from '../models/User.js'
import Resume from '../models/Resume.js'
import { analyzeResume, resumeToText } from '../utils/ats.js'

const DEMO_EMAIL = 'demo@resumate.app'
const DEMO_PASSWORD = 'demo1234'

const sampleResume = {
  title: 'Product Designer — 2026',
  template: 'modern',
  theme: { color: '#5B3DF5', font: 'inter', density: 'cozy' },
  data: {
    personal: {
      fullName: 'Maya Chen',
      role: 'Senior Product Designer',
      email: 'maya.chen@hey.com',
      phone: '+1 (415) 555-0142',
      location: 'San Francisco, CA',
      website: 'mayachen.design',
      linkedin: 'linkedin.com/in/mayachen',
    },
    summary:
      'Product designer with 7 years of experience shaping B2B and consumer products from first sketch to shipped feature. I pair research with fast prototyping, and I care as much about the empty states as the hero screens.',
    experience: [
      {
        id: 'exp-1',
        role: 'Senior Product Designer',
        company: 'Lumen Health',
        location: 'San Francisco, CA',
        start: '2022',
        end: '',
        current: true,
        bullets: [
          'Led the redesign of the patient onboarding flow, lifting completion by 38% and cutting support tickets by 21%.',
          'Built and maintained a 60-component design system adopted by 4 product squads.',
          'Ran a monthly research cadence with 12+ interviews per quarter, turning findings into a prioritized roadmap.',
        ],
      },
      {
        id: 'exp-2',
        role: 'Product Designer',
        company: 'Northwind Studio',
        location: 'Remote',
        start: '2019',
        end: '2022',
        current: false,
        bullets: [
          'Shipped 14 client projects across fintech and logistics, from discovery to handoff.',
          'Introduced Figma libraries that reduced design-to-dev QA cycles from 5 days to 2.',
          'Mentored 3 junior designers through weekly critiques and portfolio reviews.',
        ],
      },
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'BFA, Interaction Design',
        school: 'California College of the Arts',
        location: 'San Francisco, CA',
        start: '2015',
        end: '2019',
        details: 'Graduated with honors · Design Lead, student studio',
      },
    ],
    skills: [
      'Figma',
      'Design systems',
      'User research',
      'Prototyping',
      'Accessibility',
      'Framer',
      'Workshop facilitation',
      'HTML / CSS',
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'Open Care Kit',
        link: 'opencarekit.org',
        description:
          'A free accessibility checklist and Figma kit used by 2,300+ designers. Featured in UX Collective.',
      },
    ],
    certifications: ['Google UX Design Certificate', 'WCAG 2.2 Accessibility'],
  },
}

const secondResume = {
  title: 'Product Design Lead — fintech',
  template: 'classic',
  theme: { color: '#0F766E', font: 'source', density: 'cozy' },
  data: {
    ...JSON.parse(JSON.stringify(sampleResume.data)),
    personal: {
      ...sampleResume.data.personal,
      role: 'Product Design Lead',
    },
    summary:
      'Design lead with 7 years in regulated products. I have taken two fintech products from prototype to public launch and built the design practice around them.',
  },
}

async function seed() {
  await connectDB()

  let user = await User.findOne({ email: DEMO_EMAIL })
  if (user) {
    console.log(`  · Demo user already exists (${DEMO_EMAIL}), refreshing password and resumes.`)
    user.passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10)
    user.name = 'Maya Chen'
    user.plan = 'pro'
    await user.save()
    await Resume.deleteMany({ user: user._id })
  } else {
    user = await User.create({
      name: 'Maya Chen',
      email: DEMO_EMAIL,
      passwordHash: await bcrypt.hash(DEMO_PASSWORD, 10),
      plan: 'pro',
      lastLoginAt: new Date(),
    })
    console.log(`  ✓ Demo user created (${DEMO_EMAIL})`)
  }

  for (const draft of [sampleResume, secondResume]) {
    const atsScore = analyzeResume({ text: resumeToText(draft) }).score
    const resume = await Resume.create({
      user: user._id,
      ...draft,
      atsScore,
      lastEditedAt: new Date(),
    })
    console.log(`  ✓ Seeded "${resume.title}" (ATS ${atsScore})`)
  }

  console.log('\n  Done. Sign in with:')
  console.log(`    email:    ${DEMO_EMAIL}`)
  console.log(`    password: ${DEMO_PASSWORD}\n`)
}

seed()
  .catch((err) => {
    console.error('\n  ✗ Seed failed:', err.message, '\n')
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.connection.close().catch(() => {})
  })
