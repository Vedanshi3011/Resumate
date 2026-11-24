import { useState } from 'react'
import Icon from './Icon.jsx'

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q} className={`accordion__item ${isOpen ? 'is-open' : ''}`}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className="accordion__icon">
                  <Icon name="plus" size={16} />
                </span>
              </button>
            </h3>
            <div id={`faq-panel-${i}`} className="accordion__panel" role="region">
              <div className="accordion__panel-inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
