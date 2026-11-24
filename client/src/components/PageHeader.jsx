export default function PageHeader({ eyebrow, title, lede, children, align = 'center', tone = 'light' }) {
  return (
    <header className={`page-head page-head--${align} page-head--${tone}`}>
      <div className="container page-head__inner">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="page-head__title">{title}</h1>
        {lede && <p className="page-head__lede">{lede}</p>}
        {children && <div className="page-head__actions">{children}</div>}
      </div>
    </header>
  )
}
