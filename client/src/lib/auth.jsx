import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api, getToken, setToken } from './api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(Boolean(getToken()))

  useEffect(() => {
    let alive = true
    if (!getToken()) {
      setLoading(false)
      return
    }
    api
      .me()
      .then(({ user }) => alive && setUser(user))
      .catch(() => {
        setToken(null)
        if (alive) setUser(null)
      })
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [])

  const login = useCallback(async (credentials) => {
    const data = await api.login(credentials)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }, [])

  const register = useCallback(async (payload) => {
    const data = await api.register(payload)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, loading, login, register, logout, isAuthed: Boolean(user) }),
    [user, loading, login, register, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
