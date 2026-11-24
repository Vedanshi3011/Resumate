import { createContext, useCallback, useContext, useRef, useState } from 'react'

const ToastContext = createContext(null)

let counter = 0

export function ToastProvider({ children }) {
  const [items, setItems] = useState([])
  const timers = useRef(new Map())

  const dismiss = useCallback((id) => {
    setItems((list) => list.filter((t) => t.id !== id))
    const timer = timers.current.get(id)
    if (timer) clearTimeout(timer)
    timers.current.delete(id)
  }, [])

  const toast = useCallback(
    (message, type = 'default') => {
      const id = ++counter
      setItems((list) => [...list.slice(-2), { id, message, type }])
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), 3800)
      )
      return id
    },
    [dismiss]
  )

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className="toast-stack" aria-live="polite">
        {items.map((t) => (
          <div key={t.id} className={`toast toast--${t.type}`} role="status">
            <span className="toast__dot" aria-hidden="true" />
            <p>{t.message}</p>
            <button type="button" className="toast__close" onClick={() => dismiss(t.id)} aria-label="Dismiss">
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx.toast
}
