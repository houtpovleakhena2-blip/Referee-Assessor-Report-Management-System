import apiClient from '../utils/axios'

export const refereeApi = {
  getAll: (params) => apiClient.get('/referees', { params }),
  getById: (id) => apiClient.get(`/referees/${id}`),
  create: (payload) => apiClient.post('/referees', payload),
  update: (id, payload) => apiClient.put(`/referees/${id}`, payload),
  remove: (id) => apiClient.delete(`/referees/${id}`),
}

export default refereeApi
