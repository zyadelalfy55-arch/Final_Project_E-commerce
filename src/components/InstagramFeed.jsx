import React from 'react'

const FEED = [
  { id: 1, src: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&q=80&auto=format&fit=crop', alt: 'Style post 1' },
  { id: 2, src: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400&q=80&auto=format&fit=crop', alt: 'Style post 2' },
  { id: 3, src: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=400&q=80&auto=format&fit=crop', alt: 'Style post 3' },
  { id: 4, src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80&auto=format&fit=crop', alt: 'Style post 4' },
]

export default function InstagramFeed() {
  return (
    <section className="ig-section">
      <div className="container-xl">
        <div className="ig-head">
          <span className="ig-label">NEWSFEED</span>
          <h2 className="ig-title">Instagram</h2>
          <p className="ig-sub">Follow us on social media for more discount &amp; promotions</p>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="ig-handle">
            @VisioCreate_official
          </a>
        </div>
        <div className="ig-grid">
          {FEED.map(img => (
            <a key={img.id} href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="ig-photo">
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="ig-overlay">
                <i className="bi bi-instagram" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
