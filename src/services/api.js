// All requests go through /api — proxied to backend by Vite in dev
const BASE = '/api'

const getToken = () => localStorage.getItem('vc_token')

const req = async (endpoint, options = {}) => {
  const token = getToken()
  const res = await fetch(`${BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || `Error ${res.status}`)
  return data
}

export const get  = (url, params = {}) => {
  const q = new URLSearchParams(params).toString()
  return req(`${url}${q ? `?${q}` : ''}`)
}
export const post = (url, body) => req(url, { method: 'POST',   body: JSON.stringify(body) })
export const put  = (url, body) => req(url, { method: 'PUT',    body: JSON.stringify(body) })
export const del  = (url)       => req(url, { method: 'DELETE' })
