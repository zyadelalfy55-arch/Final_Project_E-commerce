import React from 'react'

const MODEL = 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=85&auto=format&fit=crop'

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__circle" aria-hidden="true" />
      <div className="hero__frame"  aria-hidden="true" />

      <div className="hero__model" aria-hidden="true">
        <img src={MODEL} alt="" draggable="false" />
      </div>

      <div className="container-xl hero__container">
        <div className="row">
          <div className="col-xl-5 col-lg-6 col-md-7">
            <h1 className="hero__title">
              Unveil Your Style,<br />
              Elevate <span className="hero__accent">Every Day</span>
            </h1>
            <p className="hero__sub">
              Everyone needs a good winter jacket.<br />
              Find yours with our collection and more.
            </p>
            <a href="#best-seller" className="hero__btn">Shop Now</a>
          </div>
        </div>
      </div>
    </section>
  )
}
