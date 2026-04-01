import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { login as apiLogin } from '../services/authService.js'
import AnnouncementBar from '../components/AnnouncementBar.jsx'
import SiteNavbar      from '../components/SiteNavbar.jsx'
import SiteFooter      from '../components/SiteFooter.jsx'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form,    setForm]    = useState({ email: '', password: '' })
  const [errors,  setErrors]  = useState({})
  const [apiErr,  setApiErr]  = useState('')
  const [loading, setLoading] = useState(false)

  const set = field => e => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    setErrors(er => ({ ...er, [field]: '' }))
    setApiErr('')
  }

  const validate = () => {
    const e = {}
    if (!form.email)    e.email    = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      const data = await apiLogin({ email: form.email, password: form.password })
      login(data.user, data.token)
      navigate('/profile')
    } catch (err) {
      setApiErr(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AnnouncementBar />
      <SiteNavbar />
      <main className="auth-page">
        <div className="auth-card">

          <div className="auth-brand">VisioCreate<span>.</span></div>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-sub">Sign in to your account to continue</p>

          {apiErr && <div className="auth-api-err">{apiErr}</div>}

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="l-email">Email address</label>
              <div className="auth-input-wrap">
                <i className="bi bi-envelope auth-icon" />
                <input
                  id="l-email" type="email" autoComplete="email"
                  className={`auth-input ${errors.email ? 'auth-input--err' : ''}`}
                  placeholder="you@example.com"
                  value={form.email} onChange={set('email')}
                />
              </div>
              {errors.email && <p className="auth-err-msg">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="auth-field">
              <div className="auth-label-row">
                <label className="auth-label" htmlFor="l-pass">Password</label>
                <a href="#" className="auth-forgot" onClick={e => e.preventDefault()}>Forgot password?</a>
              </div>
              <div className="auth-input-wrap">
                <i className="bi bi-lock auth-icon" />
                <input
                  id="l-pass" type="password" autoComplete="current-password"
                  className={`auth-input ${errors.password ? 'auth-input--err' : ''}`}
                  placeholder="••••••••"
                  value={form.password} onChange={set('password')}
                />
              </div>
              {errors.password && <p className="auth-err-msg">{errors.password}</p>}
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? <><i className="bi bi-arrow-repeat auth-spin" /> Signing in…</> : 'Sign In'}
            </button>
          </form>

          <div className="auth-divider"><span>or</span></div>

          <div className="auth-socials">
            <button className="auth-social-btn">
              <i className="bi bi-google" /> Continue with Google
            </button>
            <button className="auth-social-btn">
              <i className="bi bi-facebook" /> Continue with Facebook
            </button>
          </div>

          <p className="auth-switch">
            Don't have an account?{' '}
            <Link to="/register" className="auth-switch-link">Create one</Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
