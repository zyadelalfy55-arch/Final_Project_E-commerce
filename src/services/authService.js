import { post, get } from './api.js'

export const register = (body) => post('/auth/register', body)
export const login    = (body) => post('/auth/login',    body)
export const getMe    = ()     => get('/auth/me')
