import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const NAV_ITEMS = [
  { label: 'Home' },
  { label: 'Shop',       items: ['Women', 'Men', 'Accessories', 'Sale'] },
  { label: 'Product',    items: ['New Arrivals', 'Best Sellers', 'Collections', 'Lookbook'] },
  { label: 'Contact Us' },
]

export default function SiteNavbar() {
  const [openMenu,   setOpenMenu]   = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userOpen,   setUserOpen]   = useState(false)
  const navRef   = useRef(null)
  const navigate  = useNavigate()
  const { user, logout } = useAuth()

  // Close all menus when clicking outside
  useEffect(() => {
    const handle = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null)
        setMobileOpen(false)
        setUserOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const initials = user
    ? user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : ''

  const handleLogout = () => {
    logout()
    setUserOpen(false)
    navigate('/')
  }

  return (
    <nav className="site-nav" ref={navRef}>
      <div className="container-xl">

        {/* Logo */}
        <a className="nav-logo" href="#" onClick={e => { e.preventDefault(); navigate('/') }}>
          VisioCreate<span className="nav-logo__dot">.</span>
        </a>

        {/* Center links */}
        <ul className={`nav-links ${mobileOpen ? 'nav-links--open' : ''}`}>
          {NAV_ITEMS.map(item => (
            <li
              key={item.label}
              className={`nav-item ${item.items && openMenu === item.label ? 'nav-item--open' : ''}`}
              onMouseEnter={() => item.items && setOpenMenu(item.label)}
              onMouseLeave={() => item.items && setOpenMenu(null)}
            >
              {item.items ? (
                <>
                  <button
                    className="nav-link-btn"
                    onClick={() => setOpenMenu(v => v === item.label ? null : item.label)}
                  >
                    {item.label}
                    <i className="bi bi-chevron-down nav-chevron" />
                  </button>
                  <div className="nav-dropdown">
                    {item.items.map(sub => (
                      <a
                        key={sub}
                        href="#"
                        className="nav-dropdown__item"
                        onClick={e => { e.preventDefault(); setOpenMenu(null) }}
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <a
                  className="nav-link-btn"
                  href="#"
                  onClick={e => { e.preventDefault(); navigate('/') }}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Right icons */}
        <div className="nav-icons">
          <button className="nav-icon-btn" aria-label="Search">
            <i className="bi bi-search" />
          </button>

          {user ? (
            <div className="nav-user" style={{ position: 'relative' }}>
              <button
                className="nav-avatar"
                onClick={() => setUserOpen(v => !v)}
                aria-label="Account menu"
              >
                {user.avatar
                  ? <img src={user.avatar} alt={user.name} className="nav-avatar__img" />
                  : <span className="nav-avatar__initials">{initials}</span>
                }
              </button>

              {userOpen && (
                <div className="nav-user-menu">
                  <div className="nav-user-menu__head">
                    <p className="nav-user-menu__name">{user.name}</p>
                    <p className="nav-user-menu__email">{user.email}</p>
                  </div>
                  <div className="nav-user-menu__divider" />
                  <button
                    className="nav-user-menu__item"
                    onClick={() => { navigate('/profile'); setUserOpen(false) }}
                  >
                    <i className="bi bi-person" /> My Profile
                  </button>
                  <button
                    className="nav-user-menu__item nav-user-menu__item--danger"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="nav-icon-btn" aria-label="Login" onClick={() => navigate('/login')}>
              <i className="bi bi-person" />
            </button>
          )}

          <button className="nav-icon-btn nav-cart" aria-label="Cart">
            <i className="bi bi-bag" />
            <span className="nav-cart__badge">2</span>
          </button>

          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <i className={`bi ${mobileOpen ? 'bi-x-lg' : 'bi-list'}`} />
          </button>
        </div>

      </div>
    </nav>
  )
}
