import apiClient from '../utils/axios'

export const reportApi = {
  getAll: (params) => apiClient.get('/reports', { params }),
  getById: (id) => apiClient.get(`/reports/${id}`),
  create: (payload) => apiClient.post('/reports', payload),
  update: (id, payload) => apiClient.put(`/reports/${id}`, payload),
  submit: (id) => apiClient.post(`/reports/${id}/submit`),
  remove: (id) => apiClient.delete(`/reports/${id}`),
}

export default reportApi
