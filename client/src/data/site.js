export const stats = {
  resumes: '2.4M',
  interviews: '38%',
  rating: '4.8',
  reviews: '12,400',
}

export const companies = ['Google', 'Stripe', 'Airbnb', 'Notion', 'Spotify', 'Shopify']

export const testimonials = [
  {
    quote:
      'I had been applying for months with the same PDF. Resumate showed me that my bullets had no numbers in them. Two rewrites later I had three interviews in a week.',
    name: 'Jordan Ellis',
    role: 'Operations Manager',
    initials: 'JE',
    color: '#5B3DF5',
  },
  {
    quote:
      'The ATS check is the part I did not know I needed. It caught that my contact details were inside a text box — the exact thing that had been quietly filtering me out.',
    name: 'Sana Iqbal',
    role: 'Data Analyst',
    initials: 'SI',
    color: '#0F766E',
  },
  {
    quote:
      'It feels like a design tool rather than a form. I changed the template, moved one section, and the whole thing finally looked like something I would hire.',
    name: 'Theo Laurent',
    role: 'Product Designer',
    initials: 'TL',
    color: '#FF6B4A',
  },
]

export const faqs = [
  {
    q: 'Is Resumate really free?',
    a: 'Yes. You can build unlimited resumes, use every template, and download a clean PDF without paying. Pro adds AI bullet suggestions, unlimited ATS reports, and version history.',
  },
  {
    q: 'Will my resume pass an ATS?',
    a: 'Every template is built on a single-column text layer, even when the design has a sidebar. That means the visual layout can be two columns while the parsed text stays in a clean reading order. Run the free ATS check to see exactly what a parser sees.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'Not to try the builder. You can start a draft and export it as a guest. An account lets you save multiple resumes, sync across devices, and return to a draft later.',
  },
  {
    q: 'Can I import my existing resume?',
    a: 'You can paste the text of an existing resume into the ATS checker and copy it section by section into the builder. Direct DOCX import is on the roadmap for early 2027.',
  },
  {
    q: 'What file formats can I download?',
    a: 'PDF is the default and the safest choice for applications. You can also print to PDF from any browser, or copy a plain-text version for job boards that ask for it.',
  },
  {
    q: 'Is my data private?',
    a: 'Your resume content belongs to you. We do not sell data, and we do not use your resume to train models. You can delete your account and all associated resumes at any time.',
  },
]

export const footerLinks = [
  {
    title: 'Build',
    links: [
      { label: 'Resume builder', to: '/builder/new' },
      { label: 'Resume templates', to: '/templates' },
      { label: 'Resume examples', to: '/examples' },
      { label: 'ATS checker', to: '/ats-checker' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Career center', to: '/career-center' },
      { label: 'Resume basics', to: '/career-center/resume-mistakes-2026' },
      { label: 'ATS guide', to: '/career-center/ats-explained' },
      { label: 'Career changes', to: '/career-center/career-change-resume' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', to: '/about' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Contact', to: '/contact' },
      { label: 'Privacy policy', to: '/privacy' },
    ],
  },
]

export const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    annual: 0,
    tagline: 'Everything you need to send a good application.',
    features: [
      'All 8 resume templates',
      'Unlimited resumes',
      'PDF & plain-text export',
      '3 ATS reports per month',
      'Guided writing prompts',
    ],
    cta: 'Start building',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9,
    annual: 72,
    tagline: 'For an active search, where every application counts.',
    features: [
      'Everything in Free',
      'Unlimited ATS reports',
      'AI bullet suggestions',
      'Job-description keyword match',
      'Version history & restore',
      'Cover letter builder',
    ],
    cta: 'Try Pro free for 14 days',
    featured: true,
  },
  {
    id: 'teams',
    name: 'Career teams',
    price: 29,
    annual: 276,
    tagline: 'For coaches, bootcamps, and university career centers.',
    features: [
      'Everything in Pro',
      'Up to 25 seats',
      'Shared template library',
      'Cohort review dashboard',
      'Priority support',
    ],
    cta: 'Talk to us',
  },
]
