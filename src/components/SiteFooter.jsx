import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PAGE_LINKS = ['Home', 'Shop', 'Product', 'Articles', 'Contact Us']
const INFO_LINKS  = ['Shipping Policy', 'Return & Refund', 'Support', 'FAQs']

export default function SiteFooter() {
  const [email,      setEmail]      = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const navigate = useNavigate()

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) { setSubscribed(true); setEmail('') }
  }

  return (
    <footer className="footer">
      <div className="footer__body">
        <div className="container-xl">
          <div className="footer__grid">

            {/* Brand column */}
            <div>
              <a className="footer__logo" href="#" onClick={e => { e.preventDefault(); navigate('/') }}>
                VisioCreate<span className="footer__logo-dot">.</span>
              </a>
              <address className="footer__addr">
                431/1 Hai Trieu street,<br />
                District 1, HCMC<br />
                Vietnam
              </address>
              <p className="footer__phone">84-756-3237</p>
              <div className="footer__socials">
                {[
                  { icon: 'bi-instagram', label: 'Instagram' },
                  { icon: 'bi-facebook',  label: 'Facebook'  },
                  { icon: 'bi-youtube',   label: 'YouTube'   },
                ].map(s => (
                  <a key={s.label} href="#" className="footer__social" aria-label={s.label}
                     onClick={e => e.preventDefault()}>
                    <i className={`bi ${s.icon}`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Page links */}
            <div>
              <p className="footer__col-title">Page</p>
              <ul className="footer__links">
                {PAGE_LINKS.map(l => (
                  <li key={l}><a href="#" onClick={e => e.preventDefault()}>{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Info links */}
            <div>
              <p className="footer__col-title">Info</p>
              <ul className="footer__links">
                {INFO_LINKS.map(l => (
                  <li key={l}><a href="#" onClick={e => e.preventDefault()}>{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <p className="footer__col-title">Join Newsletter</p>
              <p className="footer__nl-text">
                Subscribe to get more deals, new products and promotions
              </p>
              {subscribed ? (
                <p className="footer__nl-thanks">✓ Thanks for subscribing!</p>
              ) : (
                <form className="footer__nl-form" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    className="footer__nl-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="footer__nl-btn" aria-label="Subscribe">
                    <i className="bi bi-arrow-right" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container-xl">
          <div className="footer__bottom-row">
            <p className="footer__copy">
              Copyright © 2024 VisioCreate. All rights reserved.&nbsp;&nbsp;
              <a href="#" onClick={e => e.preventDefault()}>Privacy Policy</a>&nbsp;&nbsp;
              <a href="#" onClick={e => e.preventDefault()}>Terms &amp; Conditions</a>
            </p>
            <div className="footer__pay">
              {['VISA', 'AMEX', 'MC', 'Stripe', 'PayPal', '⌘ Pay'].map(p => (
                <span key={p} className="footer__pay-badge">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
