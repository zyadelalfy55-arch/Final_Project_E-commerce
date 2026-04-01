import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'

import HomePage          from './pages/HomePage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import LoginPage         from './pages/LoginPage.jsx'
import RegisterPage      from './pages/RegisterPage.jsx'
import ProfilePage       from './pages/ProfilePage.jsx'

// Only accessible when NOT logged in
function GuestRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <PageSpinner />
  return user ? <Navigate to="/profile" replace /> : children
}

// Only accessible when logged in
function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <PageSpinner />
  return user ? children : <Navigate to="/login" replace />
}

function PageSpinner() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="spinner" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/login"       element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/register"    element={<GuestRoute><RegisterPage /></GuestRoute>} />
        <Route path="/profile"     element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="*"            element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
