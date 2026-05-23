import apiClient from '../utils/axios'

export const matchApi = {
  getAll: (params) => apiClient.get('/matches', { params }),
  getById: (id) => apiClient.get(`/matches/${id}`),
  create: (payload) => apiClient.post('/matches', payload),
  update: (id, payload) => apiClient.put(`/matches/${id}`, payload),
  remove: (id) => apiClient.delete(`/matches/${id}`),
}

export default matchApi
