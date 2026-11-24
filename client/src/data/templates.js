export const templates = [
  {
    id: 'modern',
    name: 'The Modern',
    layout: 'modern',
    color: '#5B3DF5',
    font: 'inter',
    tag: 'Most popular',
    blurb: 'A confident sidebar layout with room for skills and links. Reads well on screen and on paper.',
    bestFor: 'Tech, product, design',
  },
  {
    id: 'classic',
    name: 'The Classic',
    layout: 'classic',
    color: '#1E3A5F',
    font: 'source',
    tag: 'ATS-safe',
    blurb: 'A single-column, recruiter-friendly structure. Nothing clever, everything legible.',
    bestFor: 'Finance, law, operations',
  },
  {
    id: 'minimal',
    name: 'The Minimal',
    layout: 'minimal',
    color: '#14111F',
    font: 'inter',
    tag: "Editors' pick",
    blurb: 'Generous whitespace and a quiet type hierarchy. Lets the writing do the talking.',
    bestFor: 'Consulting, research, writing',
  },
  {
    id: 'bold',
    name: 'The Bold',
    layout: 'bold',
    color: '#FF6B4A',
    font: 'inter',
    tag: 'Creative',
    blurb: 'A color-blocked header that stands out in a stack of black-and-white PDFs.',
    bestFor: 'Marketing, creative, sales',
  },
  {
    id: 'executive',
    name: 'The Executive',
    layout: 'classic',
    color: '#7A2E2E',
    font: 'source',
    tag: 'Senior roles',
    blurb: 'Serif headings and restrained rules for director-level and board-facing resumes.',
    bestFor: 'Leadership, strategy',
  },
  {
    id: 'compact',
    name: 'The Compact',
    layout: 'compact',
    color: '#0F766E',
    font: 'inter',
    tag: 'One page',
    blurb: 'Dense but readable. Fits a decade of experience on a single page without cramping.',
    bestFor: 'Engineering, analytics',
  },
  {
    id: 'elegant',
    name: 'The Elegant',
    layout: 'minimal',
    color: '#7C5A2E',
    font: 'fraunces',
    tag: 'Editorial',
    blurb: 'Warm serif details and soft spacing. A considered choice for client-facing roles.',
    bestFor: 'Hospitality, education, arts',
  },
  {
    id: 'creative',
    name: 'The Creative',
    layout: 'bold',
    color: '#2563EB',
    font: 'inter',
    tag: 'Portfolios',
    blurb: 'A little louder, still parseable. Pairs nicely with a portfolio link and project section.',
    bestFor: 'Design, media, startups',
  },
]

export const templateById = (id) => templates.find((t) => t.id === id) || templates[0]

export const colors = [
  { name: 'Violet', value: '#5B3DF5' },
  { name: 'Ink', value: '#14111F' },
  { name: 'Ocean', value: '#1E3A5F' },
  { name: 'Teal', value: '#0F766E' },
  { name: 'Brick', value: '#7A2E2E' },
  { name: 'Coral', value: '#FF6B4A' },
  { name: 'Gold', value: '#9A6B1F' },
  { name: 'Plum', value: '#6B2D5C' },
]

export const fonts = [
  { id: 'inter', name: 'Inter', stack: "'Inter', system-ui, sans-serif" },
  { id: 'source', name: 'Source Serif', stack: "'Source Serif 4', Georgia, serif" },
  { id: 'fraunces', name: 'Fraunces', stack: "'Fraunces', Georgia, serif" },
  { id: 'georgia', name: 'Georgia', stack: "Georgia, 'Times New Roman', serif" },
]

export const fontStack = (id) => (fonts.find((f) => f.id === id) || fonts[0]).stack
