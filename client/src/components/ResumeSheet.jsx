import { fontStack, templateById } from '../data/templates.js'

function normalize(resume) {
  const d = resume?.data || {}
  const p = d.personal || {}
  return {
    name: (p.fullName || '').trim() || 'Your Name',
    role: (p.role || '').trim() || 'Your target role',
    email: (p.email || '').trim() || 'you@email.com',
    phone: (p.phone || '').trim() || '(555) 000-0000',
    location: (p.location || '').trim() || 'City, State',
    website: (p.website || '').trim(),
    linkedin: (p.linkedin || '').trim(),
    summary: (d.summary || '').trim(),
    experience: (d.experience || []).filter((e) => e.role || e.company),
    education: (d.education || []).filter((e) => e.degree || e.school),
    skills: (d.skills || []).filter(Boolean),
    projects: (d.projects || []).filter((pr) => pr.name || pr.description),
    certifications: (d.certifications || []).filter(Boolean),
  }
}

function Bullets({ items }) {
  const list = (items || []).map((b) => (b || '').trim()).filter(Boolean)
  if (!list.length) return null
  return (
    <ul className="rs-bullets">
      {list.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  )
}

function Section({ title, children, className = '' }) {
  return (
    <section className={`rs-section ${className}`.trim()}>
      <h2 className="rs-section__title">{title}</h2>
      <div className="rs-section__body">{children}</div>
    </section>
  )
}

function ContactLine({ data, withLabels = false }) {
  const rows = [
    { icon: '✉', value: data.email, label: 'Email' },
    { icon: '☎', value: data.phone, label: 'Phone' },
    { icon: '⌖', value: data.location, label: 'Location' },
    { icon: '↗', value: data.website, label: 'Website' },
    { icon: 'in', value: data.linkedin, label: 'LinkedIn' },
  ].filter((r) => r.value)

  if (withLabels) {
    return (
      <ul className="rs-contact rs-contact--stacked">
        {rows.map((r) => (
          <li key={r.label}>
            <span>{r.value}</span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <p className="rs-contact">
      {rows.map((r, i) => (
        <span key={r.label}>
          {i > 0 && <span className="rs-contact__sep">·</span>}
          {r.value}
        </span>
      ))}
    </p>
  )
}

function ExperienceList({ items, compact = false }) {
  return items.map((exp, i) => (
    <article className={`rs-item ${compact ? 'rs-item--tight' : ''}`} key={exp.id || i}>
      <div className="rs-item__head">
        <div className="rs-item__left">
          <h3>
            {exp.role || 'Role'}
            {exp.company && <span className="rs-item__org"> — {exp.company}</span>}
          </h3>
          {exp.location && <p className="rs-item__meta">{exp.location}</p>}
        </div>
        {(exp.start || exp.end || exp.current) && (
          <p className="rs-item__dates">
            {[exp.start, exp.current ? 'Present' : exp.end].filter(Boolean).join(' – ')}
          </p>
        )}
      </div>
      <Bullets items={exp.bullets} />
    </article>
  ))
}

function EducationList({ items }) {
  return items.map((edu, i) => (
    <article className="rs-item rs-item--tight" key={edu.id || i}>
      <div className="rs-item__head">
        <div className="rs-item__left">
          <h3>{edu.degree || 'Degree'}</h3>
          {edu.school && <p className="rs-item__org">{edu.school}</p>}
          {edu.details && <p className="rs-item__meta">{edu.details}</p>}
        </div>
        <p className="rs-item__dates">
          {[edu.start, edu.end].filter(Boolean).join(' – ')}
        </p>
      </div>
    </article>
  ))
}

function ProjectsList({ items }) {
  return items.map((project, i) => (
    <article className="rs-item rs-item--tight" key={project.id || i}>
      <h3>
        {project.name}
        {project.link && <span className="rs-item__link"> · {project.link}</span>}
      </h3>
      {project.description && <p className="rs-item__desc">{project.description}</p>}
    </article>
  ))
}

function SkillTags({ skills }) {
  return (
    <ul className="rs-skills">
      {skills.map((skill, i) => (
        <li key={`${skill}-${i}`}>{skill}</li>
      ))}
    </ul>
  )
}

export default function ResumeSheet({ resume, className = '' }) {
  const d = normalize(resume)
  const template = templateById(resume?.template)
  const layout = template.layout
  const color = resume?.theme?.color || template.color
  const font = resume?.theme?.font || template.font
  const density = resume?.theme?.density || 'cozy'

  const style = {
    '--rs-accent': color,
    '--rs-font': fontStack(font),
  }

  const summarySection = d.summary ? (
    <Section title="Profile">
      <p className="rs-summary">{d.summary}</p>
    </Section>
  ) : null

  const experienceSection = d.experience.length ? (
    <Section title="Experience">
      <ExperienceList items={d.experience} compact={layout === 'compact'} />
    </Section>
  ) : null

  const educationSection = d.education.length ? (
    <Section title="Education">
      <EducationList items={d.education} />
    </Section>
  ) : null

  const projectsSection = d.projects.length ? (
    <Section title="Projects">
      <ProjectsList items={d.projects} />
    </Section>
  ) : null

  if (layout === 'modern' || layout === 'creative') {
    return (
      <div
        className={`rs rs--modern ${layout === 'creative' ? 'rs--creative' : ''} ${className}`.trim()}
        style={style}
        data-density={density}
      >
        <aside className="rs__side">
          <div className="rs__side-head">
            <h1>{d.name}</h1>
            <p>{d.role}</p>
          </div>
          <div className="rs__side-block">
            <h2>Contact</h2>
            <ContactLine data={d} withLabels />
          </div>
          {d.skills.length > 0 && (
            <div className="rs__side-block">
              <h2>Skills</h2>
              <SkillTags skills={d.skills} />
            </div>
          )}
          {d.education.length > 0 && (
            <div className="rs__side-block">
              <h2>Education</h2>
              {d.education.map((edu, i) => (
                <div className="rs__side-edu" key={edu.id || i}>
                  <strong>{edu.degree}</strong>
                  <span>{edu.school}</span>
                  <em>{[edu.start, edu.end].filter(Boolean).join(' – ')}</em>
                </div>
              ))}
            </div>
          )}
          {d.certifications.length > 0 && (
            <div className="rs__side-block">
              <h2>Certifications</h2>
              <ul className="rs__side-list">
                {d.certifications.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>
        <div className="rs__body">
          {summarySection}
          {experienceSection}
          {projectsSection}
          {layout === 'creative' && d.skills.length > 0 && (
            <Section title="Toolkit">
              <p className="rs-summary">{d.skills.join(' · ')}</p>
            </Section>
          )}
        </div>
      </div>
    )
  }

  if (layout === 'bold') {
    return (
      <div className={`rs rs--bold ${className}`.trim()} style={style} data-density={density}>
        <header className="rs__band">
          <div>
            <h1>{d.name}</h1>
            <p className="rs__band-role">{d.role}</p>
          </div>
          <ContactLine data={d} />
        </header>
        <div className="rs__bold-body">
          {summarySection}
          {d.skills.length > 0 && (
            <Section title="Skills">
              <p className="rs-skillline">{d.skills.join('  /  ')}</p>
            </Section>
          )}
          {experienceSection}
          {projectsSection}
          <div className="rs__split">
            {educationSection}
            {d.certifications.length > 0 && (
              <Section title="Certifications">
                <ul className="rs-plain-list">
                  {d.certifications.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </Section>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (layout === 'minimal') {
    return (
      <div className={`rs rs--minimal ${className}`.trim()} style={style} data-density={density}>
        <header className="rs__min-head">
          <h1>{d.name}</h1>
          <p className="rs__min-role">{d.role}</p>
          <ContactLine data={d} />
        </header>
        <div className="rs__min-body">
          {summarySection}
          {experienceSection}
          {projectsSection}
          {educationSection}
          {d.skills.length > 0 && (
            <Section title="Skills">
              <p className="rs-skillline">{d.skills.join(' · ')}</p>
            </Section>
          )}
          {d.certifications.length > 0 && (
            <Section title="Certifications">
              <p className="rs-skillline">{d.certifications.join(' · ')}</p>
            </Section>
          )}
        </div>
      </div>
    )
  }

  if (layout === 'compact') {
    return (
      <div className={`rs rs--compact ${className}`.trim()} style={style} data-density={density}>
        <header className="rs__head">
          <h1>{d.name}</h1>
          <p className="rs__head-role">{d.role}</p>
          <ContactLine data={d} />
        </header>
        <div className="rs__compact-body">
          {summarySection}
          {experienceSection}
          {projectsSection}
          {educationSection}
          {d.skills.length > 0 && (
            <Section title="Skills">
              <p className="rs-skillline">{d.skills.join(' · ')}</p>
            </Section>
          )}
          {d.certifications.length > 0 && (
            <Section title="Certifications">
              <p className="rs-skillline">{d.certifications.join(' · ')}</p>
            </Section>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`rs rs--classic ${className}`.trim()} style={style} data-density={density}>
      <header className="rs__head rs__head--center">
        <h1>{d.name}</h1>
        <p className="rs__head-role">{d.role}</p>
        <ContactLine data={d} />
      </header>
      <div className="rs__classic-body">
        {summarySection}
        {experienceSection}
        {projectsSection}
        {educationSection}
        {d.skills.length > 0 && (
          <Section title="Skills">
            <p className="rs-skillline">{d.skills.join(' · ')}</p>
          </Section>
        )}
        {d.certifications.length > 0 && (
          <Section title="Certifications">
            <p className="rs-skillline">{d.certifications.join(' · ')}</p>
          </Section>
        )}
      </div>
    </div>
  )
}
