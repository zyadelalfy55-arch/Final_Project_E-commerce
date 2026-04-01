import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../services/productService.js'
import { LOCAL_PRODUCTS } from '../data/products.js'

const Stars = ({ count = 5 }) => (
  <div className="stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <i key={i} className={`bi ${i < count ? 'bi-star-fill' : 'bi-star'}`} />
    ))}
  </div>
)

function ProductCard({ product, onClick }) {
  // Support both MongoDB _id (string) and local numeric id
  const id = product._id || product.id
  return (
    <div
      className="bs-card"
      onClick={() => onClick(id)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(id)}
      aria-label={`View ${product.name}`}
    >
      <div className="bs-card__img-wrap">
        <img
          src={product.images[0]}
          alt={product.name}
          className="bs-card__img"
          loading="lazy"
        />
        {product.badge    && <span className="bs-badge bs-badge--hot">{product.badge}</span>}
        {product.discount && <span className="bs-badge bs-badge--sale">{product.discount}</span>}
      </div>
      <div className="bs-card__body">
        <Stars count={product.rating} />
        <p className="bs-card__name">{product.name}</p>
        <div className="bs-card__prices">
          <span className="bs-card__price">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="bs-card__was">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function BestSeller() {
  const [products, setProducts] = useState(LOCAL_PRODUCTS)
  const [loading,  setLoading]  = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getProducts()
      .then(data => { if (data.products?.length) setProducts(data.products) })
      .catch(() => { /* keep local fallback silently */ })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="bs-section" id="best-seller">
      <div className="container-xl">
        <h2 className="bs-title">Best Seller</h2>

        {loading ? (
          <div className="bs-loading">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bs-skeleton" />
            ))}
          </div>
        ) : (
          <div className="bs-grid">
            {products.map(p => (
              <ProductCard
                key={p._id || p.id}
                product={p}
                onClick={id => navigate(`/product/${id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
