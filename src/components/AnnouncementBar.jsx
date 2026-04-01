import React, { useState } from 'react'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  return (
    <div className="ann-bar">
      <div className="ann-bar__inner">
        <span className="ann-bar__pill">
          <i className="bi bi-tag-fill" />
          30% off
        </span>
        storewide — Limited time!&nbsp;
        <a href="#" className="ann-bar__link" onClick={e => e.preventDefault()}>
          Shop Now →
        </a>
      </div>
      <button className="ann-bar__close" onClick={() => setVisible(false)} aria-label="Close">
        <i className="bi bi-x-lg" />
      </button>
    </div>
  )
}
