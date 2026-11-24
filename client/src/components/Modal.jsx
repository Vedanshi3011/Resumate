import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Icon from './Icon.jsx'

export default function Modal({ open, onClose, title, children, size = 'lg', footer }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="modal" role="dialog" aria-modal="true" aria-label={title || 'Dialog'}>
      <div className="modal__backdrop" onClick={onClose} />
      <div className={`modal__panel modal__panel--${size}`} ref={panelRef} tabIndex={-1}>
        <div className="modal__head">
          <h2>{title}</h2>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close dialog">
            <Icon name="close" size={18} />
          </button>
        </div>
        <div className="modal__body">{children}</div>
        {footer && <div className="modal__foot">{footer}</div>}
      </div>
    </div>,
    document.body
  )
}
