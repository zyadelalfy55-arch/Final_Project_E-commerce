import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore session on first load
  useEffect(() => {
    const restore = async () => {
      const token = localStorage.getItem('vc_token')
      if (!token) { setLoading(false); return }
      try {
        const res  = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (data.success) setUser(data.user)
        else localStorage.removeItem('vc_token')
      } catch {
        localStorage.removeItem('vc_token')
      } finally {
        setLoading(false)
      }
    }
    restore()
  }, [])

  const login = (userData, token) => {
    localStorage.setItem('vc_token', token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('vc_token')
    setUser(null)
  }

  const updateUser = (updated) => setUser(updated)

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
