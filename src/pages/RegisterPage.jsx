import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { register as apiRegister } from '../services/authService.js'
import AnnouncementBar from '../components/AnnouncementBar.jsx'
import SiteNavbar      from '../components/SiteNavbar.jsx'
import SiteFooter      from '../components/SiteFooter.jsx'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form,    setForm]    = useState({ name: '', email: '', password: '', confirm: '' })
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
    if (!form.name.trim())  e.name = 'Full name is required'
    if (!form.email)        e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password)     e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'Minimum 6 characters'
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      const data = await apiRegister({ name: form.name, email: form.email, password: form.password })
      login(data.user, data.token)
      navigate('/profile')
    } catch (err) {
      setApiErr(err.message || 'Registration failed. Please try again.')
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
          <h1 className="auth-title">Create account</h1>
          <p className="auth-sub">Join us and start shopping today</p>

          {apiErr && <div className="auth-api-err">{apiErr}</div>}

          <form onSubmit={handleSubmit} noValidate>
            {[
              { id: 'r-name',  field: 'name',     type: 'text',     icon: 'bi-person',    label: 'Full name',        placeholder: 'John Doe',          ac: 'name'         },
              { id: 'r-email', field: 'email',    type: 'email',    icon: 'bi-envelope',  label: 'Email address',    placeholder: 'you@example.com',   ac: 'email'        },
              { id: 'r-pass',  field: 'password', type: 'password', icon: 'bi-lock',      label: 'Password',         placeholder: '••••••••',          ac: 'new-password' },
              { id: 'r-conf',  field: 'confirm',  type: 'password', icon: 'bi-lock-fill', label: 'Confirm password', placeholder: '••••••••',          ac: 'new-password' },
            ].map(({ id, field, type, icon, label, placeholder, ac }) => (
              <div key={field} className="auth-field">
                <label className="auth-label" htmlFor={id}>{label}</label>
                <div className="auth-input-wrap">
                  <i className={`bi ${icon} auth-icon`} />
                  <input
                    id={id} type={type} autoComplete={ac}
                    className={`auth-input ${errors[field] ? 'auth-input--err' : ''}`}
                    placeholder={placeholder}
                    value={form[field]} onChange={set(field)}
                  />
                </div>
                {errors[field] && <p className="auth-err-msg">{errors[field]}</p>}
              </div>
            ))}

            <label className="auth-terms">
              <input type="checkbox" required />
              <span>
                I agree to the{' '}
                <a href="#" onClick={e => e.preventDefault()}>Terms &amp; Conditions</a>
                {' '}and{' '}
                <a href="#" onClick={e => e.preventDefault()}>Privacy Policy</a>
              </span>
            </label>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? <><i className="bi bi-arrow-repeat auth-spin" /> Creating account…</> : 'Create Account'}
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
            Already have an account?{' '}
            <Link to="/login" className="auth-switch-link">Sign in</Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
