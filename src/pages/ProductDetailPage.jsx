import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../services/productService.js'
import { findLocalProduct } from '../data/products.js'
import AnnouncementBar from '../components/AnnouncementBar.jsx'
import SiteNavbar      from '../components/SiteNavbar.jsx'
import SiteFooter      from '../components/SiteFooter.jsx'

/* ── Countdown timer ── */
function useCountdown() {
  const [t, setT] = useState({ d: 2, h: 12, m: 45, s: 5 })
  useEffect(() => {
    const id = setInterval(() => {
      setT(prev => {
        let { d, h, m, s } = prev
        if (s > 0)  return { d, h, m, s: s - 1 }
        if (m > 0)  return { d, h, m: m - 1, s: 59 }
        if (h > 0)  return { d, h: h - 1, m: 59, s: 59 }
        if (d > 0)  return { d: d - 1, h: 23, m: 59, s: 59 }
        clearInterval(id)
        return prev
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

const pad = n => String(n).
(2, '0')

const Stars = ({ n = 5 }) => (
  <div className="pd-stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <i key={i} className={`bi ${i < n ? 'bi-star-fill' : 'bi-star'}`} />
    ))}
  </div>
)

export default function ProductDetailPage() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const countdown  = useCountdown()

  const [product,     setProduct]     = useState(null)
  const [loading,     setLoading]     = useState(true)
  const [notFound,    setNotFound]    = useState(false)
  const [activeImg,   setActiveImg]   = useState(0)
  const [activeColor, setActiveColor] = useState(0)
  const [qty,         setQty]         = useState(1)
  const [wishlisted,  setWishlisted]  = useState(false)
  const [cartDone,    setCartDone]    = useState(false)

  useEffect(() => {
    setLoading(true)
    setActiveImg(0)
    setActiveColor(0)
    setQty(1)

    getProductById(id)
      .then(data => setProduct(data.product))
      .catch(() => {
        // Try local fallback
        const local = findLocalProduct(id)
        if (local) setProduct(local)
        else setNotFound(true)
      })
      .finally(() => setLoading(false))
  }, [id])

  // Sync image when color changes
  useEffect(() => {
    if (!product) return
    const colorImg = product.colors?.[activeColor]?.image
    if (!colorImg) return
    const idx = product.images.indexOf(colorImg)
    setActiveImg(idx >= 0 ? idx : 0)
  }, [activeColor, product])

  const prev = () => setActiveImg(i => (i - 1 + product.images.length) % product.images.length)
  const next = () => setActiveImg(i => (i + 1) % product.images.length)

  const addToCart = () => {
    setCartDone(true)
    setTimeout(() => setCartDone(false), 2200)
  }

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <>
        <AnnouncementBar />
        <SiteNavbar />
        <div className="pd-loading">
          <div className="pd-skel pd-skel--img" />
          <div className="pd-skel-info">
            {[180, 280, 120, 200, 160].map((w, i) => (
              <div key={i} className="pd-skel pd-skel--line" style={{ width: w }} />
            ))}
          </div>
        </div>
        <SiteFooter />
      </>
    )
  }

  /* ── Not found ── */
  if (notFound || !product) {
    return (
      <>
        <AnnouncementBar />
        <SiteNavbar />
        <div className="pd-not-found">
          <i className="bi bi-bag-x" />
          <h2>Product not found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate('/')} className="hero__btn">← Back to Home</button>
        </div>
        <SiteFooter />
      </>
    )
  }

  return (
    <>
      <AnnouncementBar />
      <SiteNavbar />

      <div className="container-xl">

        {/* Breadcrumb */}
        <nav className="pd-breadcrumb" aria-label="breadcrumb">
          {product.breadcrumb?.map((crumb, i, arr) => (
            <React.Fragment key={crumb}>
              <a
                href="#"
                onClick={e => { e.preventDefault(); if (i === 0) navigate('/') }}
                className={i === arr.length - 1 ? 'pd-breadcrumb__active' : ''}
              >
                {crumb}
              </a>
              {i < arr.length - 1 && <i className="bi bi-chevron-right pd-breadcrumb__sep" />}
            </React.Fragment>
          ))}
          {product.breadcrumb && <><i className="bi bi-chevron-right pd-breadcrumb__sep" /><span className="pd-breadcrumb__active">Product</span></>}
        </nav>

        {/* Main layout */}
        <div className="pd-layout">

          {/* LEFT — Gallery */}
          <div className="pd-gallery">
            <div className="pd-main-img">
              <img src={product.images[activeImg]} alt={product.name} key={activeImg} />

              {/* Badges */}
              <span className="pd-badge pd-badge--new">NEW</span>
              {product.discount && <span className="pd-badge pd-badge--sale">{product.discount}</span>}

              {/* Arrows */}
              <button className="pd-arrow pd-arrow--l" onClick={prev} aria-label="Previous">
                <i className="bi bi-chevron-left" />
              </button>
              <button className="pd-arrow pd-arrow--r" onClick={next} aria-label="Next">
                <i className="bi bi-chevron-right" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="pd-thumbs">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  className={`pd-thumb ${activeImg === i ? 'pd-thumb--active' : ''}`}
                  onClick={() => setActiveImg(i)}
                  aria-label={`Image ${i + 1}`}
                >
                  <img src={src} alt={`View ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Info */}
          <div className="pd-info">

            {/* Stars + reviews */}
            <div className="pd-stars-row">
              <Stars n={product.rating} />
              <span className="pd-review-count">{product.reviews} Reviews</span>
            </div>

            <h1 className="pd-name">{product.name}</h1>
            <p className="pd-desc">{product.description}</p>

            {/* Price */}
            <div className="pd-price-row">
              <span className="pd-price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="pd-price-was">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Countdown */}
            <p className="pd-countdown-label">Offer expires in:</p>
            <div className="pd-countdown">
              {[
                { v: pad(countdown.d), l: 'Days'    },
                { v: pad(countdown.h), l: 'Hours'   },
                { v: pad(countdown.m), l: 'Minutes' },
                { v: pad(countdown.s), l: 'Seconds' },
              ].map(({ v, l }) => (
                <div key={l} className="pd-countdown__box">
                  <span className="pd-countdown__num">{v}</span>
                  <span className="pd-countdown__lbl">{l}</span>
                </div>
              ))}
            </div>

            {/* Measurements */}
            <p className="pd-section-label">Measurements</p>
            <p className="pd-measurements">{product.measurements}</p>

            {/* Color */}
            <p className="pd-section-label">
              Choose Color <i className="bi bi-chevron-right" style={{ fontSize: 11 }} />
            </p>
            <p className="pd-color-name">{product.colors?.[activeColor]?.name}</p>
            <div className="pd-swatches">
              {product.colors?.map((c, i) => (
                <button
                  key={c.name}
                  className={`pd-swatch ${activeColor === i ? 'pd-swatch--active' : ''}`}
                  onClick={() => setActiveColor(i)}
                  title={c.name}
                  aria-label={`Color: ${c.name}`}
                >
                  <img src={c.image} alt={c.name} />
                </button>
              ))}
            </div>

            {/* Qty + Wishlist */}
            <div className="pd-actions">
              <div className="pd-qty">
                <button className="pd-qty__btn" onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease">
                  <i className="bi bi-dash" />
                </button>
                <span className="pd-qty__val">{qty}</span>
                <button className="pd-qty__btn" onClick={() => setQty(q => q + 1)} aria-label="Increase">
                  <i className="bi bi-plus" />
                </button>
              </div>
              <button
                className={`pd-btn-wish ${wishlisted ? 'pd-btn-wish--active' : ''}`}
                onClick={() => setWishlisted(w => !w)}
              >
                <i className={`bi ${wishlisted ? 'bi-heart-fill' : 'bi-heart'}`} />
                Wishlist
              </button>
            </div>

            {/* Add to Cart */}
            <button className="pd-btn-cart" onClick={addToCart}>
              {cartDone ? <><i className="bi bi-check-lg" /> Added to Cart!</> : 'Add to Cart'}
            </button>

            {/* Meta */}
            <div className="pd-meta">
              <div className="pd-meta__row">
                <span className="pd-meta__key">SKU</span>
                <span className="pd-meta__val">{product.sku}</span>
              </div>
              <div className="pd-meta__row">
                <span className="pd-meta__key">Category</span>
                <span className="pd-meta__val">{product.category}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <SiteFooter />
    </>
  )
}
