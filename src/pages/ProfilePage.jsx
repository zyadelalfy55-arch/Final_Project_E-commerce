import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { updateProfile, changePassword } from '../services/userService.js'
import AnnouncementBar from '../components/AnnouncementBar.jsx'
import SiteNavbar      from '../components/SiteNavbar.jsx'
import SiteFooter      from '../components/SiteFooter.jsx'

const TABS = [
  { id: 'info',     label: 'My Profile',       icon: 'bi-person'        },
  { id: 'password', label: 'Change Password',  icon: 'bi-shield-lock'   },
  { id: 'orders',   label: 'My Orders',        icon: 'bi-bag-check'     },
  { id: 'wishlist', label: 'Wishlist',          icon: 'bi-heart'         },
]

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('info')

  /* ── Profile form state ── */
  const [pForm, setPForm] = useState({
    name:    user?.name               || '',
    phone:   user?.phone              || '',
    street:  user?.address?.street    || '',
    city:    user?.address?.city      || '',
    country: user?.address?.country   || '',
    zip:     user?.address?.zip       || '',
  })
  const [pMsg,     setPMsg]     = useState('')
  const [pErr,     setPErr]     = useState('')
  const [pLoading, setPLoading] = useState(false)

  const savePForm = async (e) => {
    e.preventDefault()
    setPMsg(''); setPErr(''); setPLoading(true)
    try {
      const data = await updateProfile({
        name:    pForm.name,
        phone:   pForm.phone,
        address: { street: pForm.street, city: pForm.city, country: pForm.country, zip: pForm.zip },
      })
      updateUser(data.user)
      setPMsg('Profile updated successfully!')
    } catch (err) {
      setPErr(err.message || 'Update failed')
    } finally {
      setPLoading(false)
    }
  }

  /* ── Password form state ── */
  const [wForm, setWForm] = useState({ current: '', next: '', confirm: '' })
  const [wMsg,     setWMsg]     = useState('')
  const [wErr,     setWErr]     = useState('')
  const [wLoading, setWLoading] = useState(false)

  const savePw = async (e) => {
    e.preventDefault()
    setWMsg(''); setWErr('')
    if (wForm.next !== wForm.confirm) { setWErr('Passwords do not match'); return }
    if (wForm.next.length < 6)        { setWErr('Minimum 6 characters'); return }
    setWLoading(true)
    try {
      await changePassword({ currentPassword: wForm.current, newPassword: wForm.next })
      setWMsg('Password changed successfully!')
      setWForm({ current: '', next: '', confirm: '' })
    } catch (err) {
      setWErr(err.message || 'Failed to change password')
    } finally {
      setWLoading(false)
    }
  }

  /* ── Initials ── */
  const initials = user?.name
    ?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?'

  return (
    <>
      <AnnouncementBar />
      <SiteNavbar />

      <div className="container-xl">
        <div className="prof-layout">

          {/* ── Sidebar ── */}
          <aside className="prof-sidebar">
            <div className="prof-avatar-row">
              {user?.avatar
                ? <img src={user.avatar} alt={user.name} className="prof-avatar-img" />
                : <div className="prof-avatar-initials">{initials}</div>
              }
              <div>
                <p className="prof-sidebar-name">{user?.name}</p>
                <p className="prof-sidebar-email">{user?.email}</p>
              </div>
            </div>

            <nav className="prof-nav">
              {TABS.map(t => (
                <button
                  key={t.id}
                  className={`prof-nav-btn ${tab === t.id ? 'prof-nav-btn--active' : ''}`}
                  onClick={() => setTab(t.id)}
                >
                  <i className={`bi ${t.icon}`} />
                  {t.label}
                </button>
              ))}
            </nav>

            <button className="prof-logout" onClick={() => { logout(); navigate('/') }}>
              <i className="bi bi-box-arrow-right" /> Sign Out
            </button>
          </aside>

          {/* ── Main panel ── */}
          <main className="prof-main">

            {/* INFO TAB */}
            {tab === 'info' && (
              <div className="prof-section">
                <h2 className="prof-h2">Personal Information</h2>
                <p className="prof-sub">Update your name, phone and shipping address</p>

                {/* Read-only fields */}
                <div className="prof-readonly-grid">
                  <div className="prof-readonly">
                    <span className="prof-readonly-lbl">Email</span>
                    <span className="prof-readonly-val">{user?.email}</span>
                  </div>
                  <div className="prof-readonly">
                    <span className="prof-readonly-lbl">Member since</span>
                    <span className="prof-readonly-val">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                        : '—'}
                    </span>
                  </div>
                </div>

                {pMsg && <div className="prof-alert prof-alert--ok">{pMsg}</div>}
                {pErr && <div className="prof-alert prof-alert--err">{pErr}</div>}

                <form onSubmit={savePForm} className="prof-form">
                  <div className="prof-grid-2">
                    <div className="prof-field">
                      <label className="prof-lbl">Full Name</label>
                      <input className="prof-input" value={pForm.name}
                        onChange={e => setPForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Your full name" />
                    </div>
                    <div className="prof-field">
                      <label className="prof-lbl">Phone</label>
                      <input className="prof-input" value={pForm.phone}
                        onChange={e => setPForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder="+1 234 567 8900" />
                    </div>
                  </div>

                  <p className="prof-section-divider">Shipping Address</p>

                  <div className="prof-field">
                    <label className="prof-lbl">Street Address</label>
                    <input className="prof-input" value={pForm.street}
                      onChange={e => setPForm(f => ({ ...f, street: e.target.value }))}
                      placeholder="123 Main Street" />
                  </div>
                  <div className="prof-grid-3">
                    <div className="prof-field">
                      <label className="prof-lbl">City</label>
                      <input className="prof-input" value={pForm.city}
                        onChange={e => setPForm(f => ({ ...f, city: e.target.value }))}
                        placeholder="Ho Chi Minh City" />
                    </div>
                    <div className="prof-field">
                      <label className="prof-lbl">ZIP Code</label>
                      <input className="prof-input" value={pForm.zip}
                        onChange={e => setPForm(f => ({ ...f, zip: e.target.value }))}
                        placeholder="700000" />
                    </div>
                    <div className="prof-field">
                      <label className="prof-lbl">Country</label>
                      <input className="prof-input" value={pForm.country}
                        onChange={e => setPForm(f => ({ ...f, country: e.target.value }))}
                        placeholder="Vietnam" />
                    </div>
                  </div>

                  <button type="submit" className="prof-save-btn" disabled={pLoading}>
                    {pLoading ? <><i className="bi bi-arrow-repeat auth-spin" /> Saving…</> : 'Save Changes'}
                  </button>
                </form>
              </div>
            )}

            {/* PASSWORD TAB */}
            {tab === 'password' && (
              <div className="prof-section">
                <h2 className="prof-h2">Change Password</h2>
                <p className="prof-sub">Choose a strong password of at least 6 characters</p>

                {wMsg && <div className="prof-alert prof-alert--ok">{wMsg}</div>}
                {wErr && <div className="prof-alert prof-alert--err">{wErr}</div>}

                <form onSubmit={savePw} className="prof-form">
                  {[
                    { label: 'Current Password',     field: 'current', ac: 'current-password' },
                    { label: 'New Password',          field: 'next',    ac: 'new-password'     },
                    { label: 'Confirm New Password',  field: 'confirm', ac: 'new-password'     },
                  ].map(({ label, field, ac }) => (
                    <div key={field} className="prof-field">
                      <label className="prof-lbl">{label}</label>
                      <div className="auth-input-wrap">
                        <i className="bi bi-lock auth-icon" />
                        <input
                          type="password" autoComplete={ac}
                          className="auth-input"
                          placeholder="••••••••"
                          value={wForm[field]}
                          onChange={e => setWForm(f => ({ ...f, [field]: e.target.value }))}
                        />
                      </div>
                    </div>
                  ))}
                  <button type="submit" className="prof-save-btn" disabled={wLoading}>
                    {wLoading ? <><i className="bi bi-arrow-repeat auth-spin" /> Updating…</> : 'Update Password'}
                  </button>
                </form>
              </div>
            )}

            {/* ORDERS TAB */}
            {tab === 'orders' && (
              <div className="prof-section">
                <h2 className="prof-h2">My Orders</h2>
                <p className="prof-sub">Your purchase history</p>
                {user?.orders?.length > 0 ? (
                  <div className="prof-orders">
                    {user.orders.map((o, i) => (
                      <div key={i} className="prof-order">
                        <div>
                          <p className="prof-order-name">{o.productName}</p>
                          <p className="prof-order-meta">Qty: {o.qty} · Color: {o.color} · ${o.price?.toFixed(2)}</p>
                        </div>
                        <span className="prof-order-date">
                          {new Date(o.orderedAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="prof-empty">
                    <i className="bi bi-bag-x" />
                    <p>No orders yet</p>
                    <button className="prof-save-btn prof-save-btn--auto" onClick={() => navigate('/')}>
                      Start Shopping
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* WISHLIST TAB */}
            {tab === 'wishlist' && (
              <div className="prof-section">
                <h2 className="prof-h2">My Wishlist</h2>
                <p className="prof-sub">Products you've saved</p>
                {user?.wishlist?.length > 0 ? (
                  <div className="prof-wish-grid">
                    {user.wishlist.map(pid => (
                      <div key={pid} className="prof-wish-card" onClick={() => navigate(`/product/${pid}`)}>
                        <i className="bi bi-heart-fill prof-wish-icon" />
                        <p className="prof-wish-name">Product #{pid}</p>
                        <p className="prof-wish-link">View →</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="prof-empty">
                    <i className="bi bi-heart" />
                    <p>Your wishlist is empty</p>
                    <button className="prof-save-btn prof-save-btn--auto" onClick={() => navigate('/')}>
                      Browse Products
                    </button>
                  </div>
                )}
              </div>
            )}

          </main>
        </div>
      </div>

      <SiteFooter />
    </>
  )
}
