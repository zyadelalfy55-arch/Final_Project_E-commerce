import React from 'react'

const FEATURES = [
  { icon: 'bi-truck',        title: 'Free Shipping',    sub: 'Order above $200'       },
  { icon: 'bi-arrow-repeat', title: 'Money-back',       sub: '30 days guarantee'      },
  { icon: 'bi-shield-lock',  title: 'Secure Payments',  sub: 'Secured by Stripe'      },
  { icon: 'bi-headset',      title: '24/7 Support',     sub: 'Phone and Email support' },
]

export default function FeaturesBar() {
  return (
    <section className="feat-section">
      <div className="container-xl">
        <div className="feat-grid">
          {FEATURES.map(f => (
            <div key={f.title} className="feat-item">
              <i className={`bi ${f.icon} feat-icon`} />
              <p className="feat-title">{f.title}</p>
              <p className="feat-sub">{f.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
