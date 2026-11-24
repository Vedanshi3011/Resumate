const BASE = import.meta.env.VITE_API_URL || '/api'
const TOKEN_KEY = 'resumate.token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  let res
  try {
    res = await fetch(`${BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new Error('Cannot reach the server. Is the API running on port 5000?')
  }

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const error = new Error(data.message || 'Something went wrong. Please try again.')
    error.status = res.status
    throw error
  }
  return data
}

export const api = {
  register: (body) => request('/auth/register', { method: 'POST', body }),
  login: (body) => request('/auth/login', { method: 'POST', body }),
  me: () => request('/auth/me', { auth: true }),

  listResumes: () => request('/resumes', { auth: true }),
  getResume: (id) => request(`/resumes/${id}`, { auth: true }),
  createResume: (body) => request('/resumes', { method: 'POST', body, auth: true }),
  updateResume: (id, body) => request(`/resumes/${id}`, { method: 'PUT', body, auth: true }),
  duplicateResume: (id) => request(`/resumes/${id}/duplicate`, { method: 'POST', auth: true }),
  deleteResume: (id) => request(`/resumes/${id}`, { method: 'DELETE', auth: true }),

  checkAts: (body) => request('/ats/check', { method: 'POST', body }),
  contact: (body) => request('/contact', { method: 'POST', body }),
}
