import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import Templates from './pages/Templates.jsx'
import Examples from './pages/Examples.jsx'
import AtsChecker from './pages/AtsChecker.jsx'
import Pricing from './pages/Pricing.jsx'
import CareerCenter from './pages/CareerCenter.jsx'
import Article from './pages/Article.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Builder from './pages/Builder.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const isBuilder = pathname.startsWith('/builder')
  const isAuth = pathname === '/login' || pathname === '/signup'

  return (
    <>
      <ScrollToTop />
      {!isBuilder && <Navbar />}
      <main className={isBuilder ? '' : 'site-main'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/ats-checker" element={<AtsChecker />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/career-center" element={<CareerCenter />} />
          <Route path="/career-center/:slug" element={<Article />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacy" element={<Legal slug="privacy" />} />
          <Route path="/terms" element={<Legal slug="terms" />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/builder/:id"
            element={
              <ProtectedRoute allowGuest>
                <Builder />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isBuilder && !isAuth && <Footer />}
    </>
  )
}
