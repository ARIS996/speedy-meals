import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
})

export const getMeals = () => api.get('/meals')
export const getMeal = (id) => api.get(`/meals/${id}`)
export const createMeal = (data) => api.post('/meals', data)
export const updateMeal = (id, data) => api.put(`/meals/${id}`, data)
export const deleteMeal = (id) => api.delete(`/meals/${id}`)
