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

export function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  const diff = Date.now() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}
