import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import Icon from '../components/Icon.jsx'
import { articles } from '../data/articles.js'

const coverTones = {
  'Resume basics': 'violet',
  Writing: 'coral',
  ATS: 'teal',
  'Career change': 'gold',
  Formatting: 'ink',
  'Job search': 'plum',
}

function ArticleCard({ article, featured = false }) {
  return (
    <article className={`article-card ${featured ? 'article-card--featured' : ''}`}>
      <Link to={`/career-center/${article.slug}`} className="article-card__link">
        <div className={`article-cover article-cover--${coverTones[article.category] || 'violet'}`}>
          <span className="article-cover__cat">{article.category}</span>
          <span className="article-cover__mark" aria-hidden="true">{article.title.charAt(0)}</span>
          <span className="article-cover__read">{article.readTime}</span>
        </div>
        <div className="article-card__body">
          <div className="article-card__meta">
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.author}</span>
          </div>
          <h2>{article.title}</h2>
          <p>{article.excerpt}</p>
          <span className="link-arrow">Read the guide <Icon name="arrowRight" size={14} /></span>
        </div>
      </Link>
    </article>
  )
}

export default function CareerCenter() {
  const [category, setCategory] = useState('All')
  const categories = useMemo(() => ['All', ...new Set(articles.map((a) => a.category))], [])
  const featured = articles.find((a) => a.featured) || articles[0]
  const list = useMemo(() => {
    const rest = articles.filter((a) => a.slug !== featured.slug)
    return category === 'All' ? rest : articles.filter((a) => a.category === category)
  }, [category, featured.slug])

  return (
    <>
      <PageHeader
        eyebrow="Career center"
        title={<>Advice you can use <em>before the deadline.</em></>}
        lede="Short, specific guides on resumes, ATS systems, and the parts of a job search nobody explains properly."
      />

      <section className="section section--tight">
        <div className="container">
          <ArticleCard article={featured} featured />

          <div className="filter-bar career-bar">
            <div className="chip-row chip-row--flush" role="tablist" aria-label="Article categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={category === cat}
                  className={`chip ${category === cat ? 'is-active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <p className="filter-count">{list.length} guides</p>
          </div>

          <div className="career-grid">
            {list.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream section--tight">
        <div className="container newsletter-band">
          <div>
            <p className="eyebrow">Twice a month</p>
            <h2 className="h2">One useful email. No “5 tips” listicles.</h2>
            <p className="lede">
              A short note on what is working in hiring right now, plus one resume line worth
              stealing. Unsubscribe in one click.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return done ? (
    <div className="newsletter-done">
      <Icon name="checkCircle" size={18} /> You are on the list.
    </div>
  ) : (
    <form
      className="newsletter-form"
      onSubmit={(e) => {
        e.preventDefault()
        if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) setDone(true)
      }}
    >
      <input
        type="email"
        className="input"
        placeholder="you@email.com"
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="btn btn--primary">Subscribe</button>
    </form>
  )
}
