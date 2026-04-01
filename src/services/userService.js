import { get, put, post } from './api.js'

export const getProfile     = ()     => get('/users/profile')
export const updateProfile  = (body) => put('/users/profile', body)
export const changePassword = (body) => put('/users/password', body)
export const getWishlist    = ()     => get('/users/wishlist')
export const toggleWishlist = (id)   => post(`/users/wishlist/${id}`)
