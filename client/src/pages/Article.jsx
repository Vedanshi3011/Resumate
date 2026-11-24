import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { articleBySlug, articles } from '../data/articles.js'
import NotFound from './NotFound.jsx'

function Block({ block }) {
  if (block.type === 'h2') return <h2>{block.text}</h2>
  if (block.type === 'quote') return <blockquote><Icon name="quote" size={22} /><p>{block.text}</p></blockquote>
  if (block.type === 'ul') {
    return (
      <ul className="article-list">
        {block.items.map((item) => (
          <li key={item}><Icon name="check" size={14} /> {item}</li>
        ))}
      </ul>
    )
  }
  return <p>{block.text}</p>
}

export default function Article() {
  const { slug } = useParams()
  const article = articleBySlug(slug)
  if (!article) return <NotFound />

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3)

  return (
    <>
      <article className="article-page">
        <div className="container container--narrow">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/career-center">Career center</Link>
            <Icon name="chevronRight" size={13} />
            <span>{article.category}</span>
          </nav>

          <header className="article-header">
            <p className="eyebrow">{article.category}</p>
            <h1>{article.title}</h1>
            <p className="article-header__excerpt">{article.excerpt}</p>
            <div className="article-header__meta">
              <span className="avatar avatar--sm">{article.author.split(' ').map((n) => n[0]).join('')}</span>
              <div>
                <strong>{article.author}</strong>
                <span>{article.date} · {article.readTime}</span>
              </div>
            </div>
          </header>

          <div className="article-body">
            {article.body.map((block, i) => <Block key={i} block={block} />)}
          </div>

          <div className="article-cta">
            <div>
              <p className="eyebrow">Put it into practice</p>
              <h2>Build the resume this article describes.</h2>
              <p>Start with a template that already has the structure right, then add your own lines.</p>
            </div>
            <Link to="/builder/new" className="btn btn--primary">
              Open the builder <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>
      </article>

      <section className="section section--cream section--tight">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Keep reading</p>
            <h2 className="h2">Three more guides worth your time.</h2>
          </div>
          <div className="related-grid">
            {related.map((item) => (
              <Link key={item.slug} to={`/career-center/${item.slug}`} className="related-card">
                <span className="badge">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <span className="related-card__meta">{item.readTime}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
