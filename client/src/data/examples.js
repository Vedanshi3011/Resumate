import { cloneResume, sampleResume } from './resume.js'

function make(overrides) {
  const base = cloneResume(sampleResume)
  return {
    ...base,
    ...overrides,
    theme: { ...base.theme, ...(overrides.theme || {}) },
    data: { ...base.data, ...(overrides.data || {}) },
  }
}

export const exampleCategories = [
  'All',
  'Software',
  'Design',
  'Marketing',
  'Healthcare',
  'Finance',
  'Students',
]

export const examples = [
  {
    id: 'software-engineer',
    role: 'Software Engineer',
    category: 'Software',
    level: 'Mid-level · 4 years',
    summary:
      'A backend-leaning full-stack engineer who ships small, measures everything, and writes the docs nobody else wants to.',
    resume: make({
      title: 'Software Engineer',
      template: 'compact',
      theme: { color: '#0F766E' },
      data: {
        personal: {
          fullName: 'Daniel Okafor',
          role: 'Software Engineer',
          email: 'daniel.okafor@mail.com',
          phone: '+1 (206) 555-0188',
          location: 'Seattle, WA',
          website: 'danielokafor.dev',
          linkedin: 'linkedin.com/in/danielokafor',
        },
        summary:
          'Full-stack engineer with 4 years building high-traffic Node and React products. I like clear interfaces, boring infrastructure, and shipping on Fridays.',
        experience: [
          {
            id: 'e1',
            role: 'Software Engineer',
            company: 'Vertex Systems',
            location: 'Seattle, WA',
            start: '2022',
            end: '',
            current: true,
            bullets: [
              'Rebuilt the billing service in Node and Postgres, cutting p95 latency from 840ms to 190ms.',
              'Shipped a self-serve onboarding flow that converted 27% of trial accounts, up from 11%.',
              'Introduced contract tests across 9 services, reducing integration incidents by 60%.',
            ],
          },
          {
            id: 'e2',
            role: 'Junior Developer',
            company: 'Halcyon Labs',
            location: 'Portland, OR',
            start: '2020',
            end: '2022',
            current: false,
            bullets: [
              'Built internal dashboards in React used daily by 40+ support agents.',
              'Automated a manual reporting job, saving roughly 12 hours per week.',
            ],
          },
        ],
        education: [
          {
            id: 'ed1',
            degree: 'BSc, Computer Science',
            school: 'University of Washington',
            location: 'Seattle, WA',
            start: '2016',
            end: '2020',
            details: 'Dean’s List · Teaching assistant, Data Structures',
          },
        ],
        skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'Testing'],
        projects: [
          {
            id: 'p1',
            name: 'ShipLog',
            link: 'shiplog.dev',
            description: 'Open-source release notes generator with 1.4k GitHub stars.',
          },
        ],
        certifications: ['AWS Certified Developer – Associate'],
      },
    }),
  },
  {
    id: 'product-designer',
    role: 'Product Designer',
    category: 'Design',
    level: 'Senior · 7 years',
    summary:
      'A systems-minded designer who moves between research, prototyping and design ops without losing the thread.',
    resume: make({ title: 'Product Designer', template: 'modern' }),
  },
  {
    id: 'marketing-manager',
    role: 'Marketing Manager',
    category: 'Marketing',
    level: 'Mid-level · 5 years',
    summary:
      'A channel-agnostic marketer who can write the brief, run the test, and explain the numbers on Monday.',
    resume: make({
      title: 'Marketing Manager',
      template: 'bold',
      theme: { color: '#FF6B4A' },
      data: {
        personal: {
          fullName: 'Priya Raman',
          role: 'Marketing Manager',
          email: 'priya.raman@mail.com',
          phone: '+1 (312) 555-0104',
          location: 'Chicago, IL',
          website: 'priyaraman.co',
          linkedin: 'linkedin.com/in/priyaraman',
        },
        summary:
          'Growth marketer with 5 years across lifecycle, paid social and content. I build small experiments that compound, and I write copy that sounds like a person.',
        experience: [
          {
            id: 'e1',
            role: 'Marketing Manager',
            company: 'Orbit Financial',
            location: 'Chicago, IL',
            start: '2021',
            end: '',
            current: true,
            bullets: [
              'Grew lifecycle email revenue 44% year over year with a 6-email onboarding series.',
              'Cut cost per qualified lead 31% by rebuilding paid social around two core audiences.',
              'Managed a $480K annual budget across 4 channels with weekly reporting to the VP of Growth.',
            ],
          },
          {
            id: 'e2',
            role: 'Marketing Associate',
            company: 'Bright & Co.',
            location: 'Remote',
            start: '2019',
            end: '2021',
            current: false,
            bullets: [
              'Wrote and tested 60+ landing pages, lifting demo requests by 18%.',
              'Launched the company newsletter from 0 to 9,400 subscribers in 14 months.',
            ],
          },
        ],
        education: [
          {
            id: 'ed1',
            degree: 'BA, Communications',
            school: 'Northwestern University',
            location: 'Evanston, IL',
            start: '2015',
            end: '2019',
            details: 'Minor in Data Analytics',
          },
        ],
        skills: ['Lifecycle marketing', 'Paid social', 'Copywriting', 'A/B testing', 'HubSpot', 'SQL', 'SEO'],
        projects: [],
        certifications: ['HubSpot Inbound Marketing'],
      },
    }),
  },
  {
    id: 'registered-nurse',
    role: 'Registered Nurse',
    category: 'Healthcare',
    level: '3 years · Med-surg',
    summary:
      'A calm, detail-first nurse with med-surg experience and a track record of mentoring new grads.',
    resume: make({
      title: 'Registered Nurse',
      template: 'classic',
      theme: { color: '#1E3A5F', font: 'source' },
      data: {
        personal: {
          fullName: 'Amara Lewis',
          role: 'Registered Nurse, BSN',
          email: 'amara.lewis@mail.com',
          phone: '+1 (614) 555-0177',
          location: 'Columbus, OH',
          website: '',
          linkedin: 'linkedin.com/in/amaralewis',
        },
        summary:
          'Registered nurse with 3 years of med-surg experience across a 32-bed unit. Known for careful handoffs, patient education, and staying steady during rapid response events.',
        experience: [
          {
            id: 'e1',
            role: 'Registered Nurse — Med-Surg',
            company: 'Riverside Medical Center',
            location: 'Columbus, OH',
            start: '2022',
            end: '',
            current: true,
            bullets: [
              'Manage a 5–6 patient assignment on a 32-bed med-surg unit, including post-op and telemetry.',
              'Precepted 6 new graduate nurses through their first 12 weeks on the floor.',
              'Led a shift-huddle initiative that reduced missed medication scans by 24%.',
            ],
          },
          {
            id: 'e2',
            role: 'Nurse Technician',
            company: 'Riverside Medical Center',
            location: 'Columbus, OH',
            start: '2020',
            end: '2022',
            current: false,
            bullets: [
              'Supported RNs with vitals, mobility and documentation across 30+ daily patients.',
            ],
          },
        ],
        education: [
          {
            id: 'ed1',
            degree: 'BSN, Nursing',
            school: 'Ohio State University',
            location: 'Columbus, OH',
            start: '2016',
            end: '2020',
            details: 'Clinical honors · Peer tutor, anatomy',
          },
        ],
        skills: ['Med-surg', 'Telemetry', 'Epic', 'Patient education', 'Wound care', 'BLS / ACLS'],
        projects: [],
        certifications: ['RN, Ohio Board of Nursing', 'BLS', 'ACLS'],
      },
    }),
  },
  {
    id: 'financial-analyst',
    role: 'Financial Analyst',
    category: 'Finance',
    level: '2 years · FP&A',
    summary:
      'An FP&A analyst who turns messy spreadsheets into decisions leadership can actually make.',
    resume: make({
      title: 'Financial Analyst',
      template: 'executive',
      theme: { color: '#7A2E2E', font: 'source' },
      data: {
        personal: {
          fullName: 'Noah Bennett',
          role: 'Financial Analyst',
          email: 'noah.bennett@mail.com',
          phone: '+1 (212) 555-0193',
          location: 'New York, NY',
          website: '',
          linkedin: 'linkedin.com/in/noahbennett',
        },
        summary:
          'FP&A analyst with 2 years supporting a $60M business unit. I build models that hold up to scrutiny and decks that fit on one page.',
        experience: [
          {
            id: 'e1',
            role: 'Financial Analyst',
            company: 'Meridian Group',
            location: 'New York, NY',
            start: '2023',
            end: '',
            current: true,
            bullets: [
              'Own the monthly close variance pack for a $60M P&L, cutting reporting time by 3 days.',
              'Built a 3-statement model used in the annual budget cycle across 5 departments.',
              'Identified $1.1M in vendor spend savings through a contract review.',
            ],
          },
        ],
        education: [
          {
            id: 'ed1',
            degree: 'BBA, Finance',
            school: 'Fordham University',
            location: 'New York, NY',
            start: '2019',
            end: '2023',
            details: 'Magna cum laude · Investment club analyst',
          },
        ],
        skills: ['Financial modeling', 'Excel', 'Power BI', 'SQL', 'Variance analysis', 'Forecasting'],
        projects: [],
        certifications: ['CFA Level I'],
      },
    }),
  },
  {
    id: 'new-grad',
    role: 'New Graduate',
    category: 'Students',
    level: 'Entry level · 2026',
    summary:
      'A new grad resume that leads with projects and coursework when work history is still short.',
    resume: make({
      title: 'New Graduate',
      template: 'minimal',
      theme: { color: '#14111F' },
      data: {
        personal: {
          fullName: 'Sofia Alvarez',
          role: 'Data Analyst (New Grad)',
          email: 'sofia.alvarez@school.edu',
          phone: '+1 (512) 555-0121',
          location: 'Austin, TX',
          website: 'sofia-alvarez.github.io',
          linkedin: 'linkedin.com/in/sofia-alvarez',
        },
        summary:
          'Recent information systems graduate with a focus on analytics and public data. Two internships, one published dashboard, and a habit of documenting everything.',
        experience: [
          {
            id: 'e1',
            role: 'Data Analytics Intern',
            company: 'City of Austin — Open Data',
            location: 'Austin, TX',
            start: '2025',
            end: '2025',
            current: false,
            bullets: [
              'Built a transit reliability dashboard in Python and Tableau, viewed 4,000+ times in 3 months.',
              'Cleaned and joined 6 public datasets, reducing duplicate records by 18%.',
            ],
          },
        ],
        education: [
          {
            id: 'ed1',
            degree: 'BS, Information Systems',
            school: 'University of Texas at Austin',
            location: 'Austin, TX',
            start: '2022',
            end: '2026',
            details: 'GPA 3.8 · Dean’s List · Data Science Club, treasurer',
          },
        ],
        skills: ['Python', 'SQL', 'Tableau', 'Excel', 'Pandas', 'Data cleaning', 'Statistics'],
        projects: [
          {
            id: 'p1',
            name: 'Austin Transit Explorer',
            link: 'github.com/sofia-alvarez/transit',
            description: 'Interactive map of bus reliability by route and hour, built with React and D3.',
          },
        ],
        certifications: ['Google Data Analytics Certificate'],
      },
    }),
  },
]

export const exampleById = (id) => examples.find((e) => e.id === id)
