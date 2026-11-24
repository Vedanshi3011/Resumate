const ACTION_VERBS = [
  'led', 'built', 'designed', 'launched', 'grew', 'improved', 'reduced', 'increased', 'delivered',
  'managed', 'created', 'developed', 'shipped', 'drove', 'owned', 'streamlined', 'automated',
  'negotiated', 'mentored', 'coordinated', 'implemented', 'optimized', 'scaled', 'spearheaded',
  'achieved', 'generated', 'saved', 'trained', 'analyzed', 'migrated', 'resolved', 'partnered',
]

const BUZZWORDS = [
  'team player', 'hard working', 'hardworking', 'go-getter', 'think outside the box',
  'results-driven', 'detail-oriented', 'self-starter', 'dynamic', 'synergy', 'responsible for',
  'duties included', 'various tasks', 'excellent communication skills',
]

const SECTION_HINTS = {
  summary: ['summary', 'profile', 'objective', 'about'],
  experience: ['experience', 'employment', 'work history', 'professional background'],
  education: ['education', 'academic', 'degree', 'university', 'college'],
  skills: ['skills', 'technologies', 'competencies', 'tools'],
}

const STOP_WORDS = new Set(
  ('a an the and or of to in for with on at by from is are be as we you your our this that will ' +
    'have has had it its their they them who what which not but if then than so such into over under ' +
    'about across using use used able strong excellent good great work working role team teams job ' +
    'company candidate candidates experience years year including etc plus preferred required must ' +
    'should can may more most other also within while').split(' ')
)

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n))
}

function keywordList(text, limit = 22) {
  const counts = new Map()
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && w.length < 24 && !STOP_WORDS.has(w) && !/^\d+$/.test(w))

  for (const word of words) counts.set(word, (counts.get(word) || 0) + 1)

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([word]) => word)
}

export function resumeToText(resume) {
  const d = resume?.data || {}
  const p = d.personal || {}
  const lines = [
    p.fullName,
    p.role,
    [p.email, p.phone, p.location, p.website, p.linkedin].filter(Boolean).join(' | '),
    '',
    d.summary,
    '',
    'EXPERIENCE',
    ...(d.experience || []).flatMap((e) => [
      [e.role, e.company, e.location].filter(Boolean).join(' — '),
      [e.start, e.current ? 'Present' : e.end].filter(Boolean).join(' – '),
      ...(e.bullets || []),
      '',
    ]),
    'EDUCATION',
    ...(d.education || []).flatMap((e) => [
      [e.degree, e.school, e.location].filter(Boolean).join(' — '),
      [e.start, e.end].filter(Boolean).join(' – '),
      e.details,
      '',
    ]),
    'SKILLS',
    (d.skills || []).join(', '),
    '',
    'PROJECTS',
    ...(d.projects || []).flatMap((pr) => [pr.name, pr.description, '']),
    'CERTIFICATIONS',
    ...(d.certifications || []),
  ]

  return lines.filter((l) => l !== undefined && l !== null).join('\n').trim()
}

export function analyzeResume({ text = '', jobDescription = '' }) {
  const clean = text.replace(/\r/g, '')
  const lower = clean.toLowerCase()
  const words = clean.split(/\s+/).filter(Boolean)
  const wordCount = words.length
  const breakdown = []
  const issues = []
  const wins = []

  // 1. Contact details (10)
  const hasEmail = /[\w.+-]+@[\w-]+\.[\w.]{2,}/.test(clean)
  const hasPhone = /(\+?\d[\d\s().-]{7,}\d)/.test(clean)
  let contactScore = (hasEmail ? 5 : 0) + (hasPhone ? 5 : 0)
  breakdown.push({ label: 'Contact details', score: contactScore, max: 10 })
  if (!hasEmail) issues.push({ severity: 'high', text: 'No email address found. Recruiters need one clear way to reach you.' })
  if (!hasPhone) issues.push({ severity: 'medium', text: 'Add a phone number with your country code.' })

  // 2. Core sections (20)
  const sectionsFound = Object.entries(SECTION_HINTS).filter(([, hints]) =>
    hints.some((hint) => lower.includes(hint))
  )
  const sectionScore = Math.round((sectionsFound.length / 4) * 20)
  breakdown.push({ label: 'Resume sections', score: sectionScore, max: 20 })
  const missingSections = Object.keys(SECTION_HINTS).filter(
    (key) => !sectionsFound.some(([found]) => found === key)
  )
  if (missingSections.length) {
    issues.push({
      severity: 'high',
      text: `Missing standard section${missingSections.length > 1 ? 's' : ''}: ${missingSections.join(', ')}. ATS parsers look for these headings.`,
    })
  } else {
    wins.push('All four core sections are present.')
  }

  // 3. Length (10)
  let lengthScore = 10
  if (wordCount < 180) {
    lengthScore = 3
    issues.push({ severity: 'high', text: `Only ${wordCount} words. Aim for 350–700 words so the scan has enough context.` })
  } else if (wordCount < 320) {
    lengthScore = 6
    issues.push({ severity: 'medium', text: `Your resume is a little thin at ${wordCount} words. Add measurable detail.` })
  } else if (wordCount > 950) {
    lengthScore = 5
    issues.push({ severity: 'medium', text: `At ${wordCount} words this is long. Trim to the two most recent roles.` })
  } else if (wordCount > 750) {
    lengthScore = 8
  }
  breakdown.push({ label: 'Length & density', score: lengthScore, max: 10 })

  // 4. Action verbs (15)
  const verbHits = ACTION_VERBS.filter((verb) => new RegExp(`\\b${verb}\\b`, 'i').test(clean))
  const verbScore = clamp(Math.round((verbHits.length / 6) * 15), 0, 15)
  breakdown.push({ label: 'Action verbs', score: verbScore, max: 15 })
  if (verbHits.length < 3) {
    issues.push({ severity: 'medium', text: 'Start bullets with strong verbs (led, shipped, reduced, grew).' })
  } else {
    wins.push(`Found ${verbHits.length} strong action verbs.`)
  }

  // 5. Measurable impact (15)
  const metrics = clean.match(/(\d+(\.\d+)?\s?(%|percent|k\b|m\b|users|customers|clients|hours|days|weeks|months|revenue|leads|tickets)|\$\s?\d[\d,.]*)/gi) || []
  const metricScore = clamp(Math.round((metrics.length / 4) * 15), 0, 15)
  breakdown.push({ label: 'Quantified impact', score: metricScore, max: 15 })
  if (metrics.length < 2) {
    issues.push({ severity: 'high', text: 'Almost no numbers. Add metrics like “cut response time 38%” or “managed $1.2M budget”.' })
  } else {
    wins.push(`Found ${metrics.length} quantified results.`)
  }

  // 6. Readability (10)
  const bulletLines = clean.split('\n').filter((l) => /^\s*[-•*]/.test(l))
  const longBullets = bulletLines.filter((l) => l.split(/\s+/).length > 32)
  const buzzHits = BUZZWORDS.filter((b) => lower.includes(b))
  let readability = 10
  if (longBullets.length > 2) {
    readability -= 3
    issues.push({ severity: 'low', text: `${longBullets.length} bullets run past 32 words. Split them for scanability.` })
  }
  if (buzzHits.length) {
    readability -= Math.min(4, buzzHits.length * 2)
    issues.push({ severity: 'medium', text: `Replace filler phrases: ${buzzHits.slice(0, 4).join(', ')}.` })
  }
  if (!bulletLines.length) {
    readability -= 2
    issues.push({ severity: 'low', text: 'Use bullet points for experience — they parse and read better than paragraphs.' })
  }
  breakdown.push({ label: 'Readability', score: clamp(readability, 0, 10), max: 10 })

  // 7. Keyword match (20)
  let keywordScore = 0
  let matchedKeywords = []
  let missingKeywords = []
  if (jobDescription.trim().length > 40) {
    const wanted = keywordList(jobDescription, 24)
    matchedKeywords = wanted.filter((k) => lower.includes(k))
    missingKeywords = wanted.filter((k) => !lower.includes(k))
    keywordScore = clamp(Math.round((matchedKeywords.length / Math.max(1, wanted.length)) * 20), 0, 20)
    if (missingKeywords.length) {
      issues.push({
        severity: 'medium',
        text: `Missing ${missingKeywords.length} keywords from the job post, e.g. ${missingKeywords.slice(0, 5).join(', ')}.`,
      })
    }
  } else {
    keywordScore = 12
    issues.push({ severity: 'low', text: 'Add a job description to score keyword relevance — it is 20% of the report.' })
  }
  breakdown.push({ label: 'Role keywords', score: keywordScore, max: 20 })

  const score = clamp(
    breakdown.reduce((sum, b) => sum + b.score, 0),
    0,
    100
  )

  return {
    score,
    grade: score >= 85 ? 'Excellent' : score >= 70 ? 'Strong' : score >= 55 ? 'Needs work' : 'At risk',
    wordCount,
    breakdown,
    issues: issues.slice(0, 8),
    wins,
    actionVerbs: verbHits,
    metrics,
    matchedKeywords,
    missingKeywords,
    scannedAt: new Date().toISOString(),
  }
}
