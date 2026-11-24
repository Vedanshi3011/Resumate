export const uid = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Math.random().toString(36).slice(2, 10)}`

export const emptyResume = () => ({
  title: 'Untitled resume',
  template: 'modern',
  theme: { color: '#5B3DF5', font: 'inter', density: 'cozy' },
  data: {
    personal: {
      fullName: '',
      role: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
  },
})

export const sampleResume = {
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

export const sampleData = sampleResume.data

export function cloneResume(source = sampleResume) {
  return JSON.parse(JSON.stringify(source))
}

export function resumeCompletion(resume) {
  const d = resume?.data || {}
  const p = d.personal || {}
  const checks = [
    Boolean(p.fullName?.trim()),
    Boolean(p.role?.trim()),
    Boolean(p.email?.trim()),
    Boolean(p.phone?.trim()),
    Boolean(p.location?.trim()),
    Boolean(d.summary?.trim() && d.summary.length > 60),
    (d.experience || []).some((e) => e.role && (e.bullets || []).some((b) => b.trim())),
    (d.education || []).some((e) => e.degree && e.school),
    (d.skills || []).length >= 4,
  ]
  return Math.round((checks.filter(Boolean).length / checks.length) * 100)
}
