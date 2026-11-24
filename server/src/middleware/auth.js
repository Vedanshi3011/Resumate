import jwt from 'jsonwebtoken'

export function signToken(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    return res.status(401).json({ message: 'Please sign in to continue.' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = payload.sub
    next()
  } catch {
    return res.status(401).json({ message: 'Your session expired. Please sign in again.' })
  }
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err)
  console.error(err)
  const status = err.status || 500
  res.status(status).json({
    message: err.expose ? err.message : 'Something went wrong on our side.',
  })
}

export function httpError(status, message) {
  const err = new Error(message)
  err.status = status
  err.expose = true
  return err
}
