import { get } from './api.js'

export const getProducts    = (params = {}) => get('/products', params)
export const getProductById = (id)          => get(`/products/${id}`)
