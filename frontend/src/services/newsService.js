import api, { apiFormData } from './api'

export const getPublisherDashboard = async () => {
  const response = await api.get('/dashboard-publisher')
  return response.data
}

export const addNews = async (newsData) => {
  const formData = new FormData()
  formData.append('title', newsData.title)
  formData.append('content', newsData.content)
  formData.append('category', newsData.category)
  if (newsData.thumbnail) {
    formData.append('thumbnail', newsData.thumbnail)
  }
  
  const response = await apiFormData.post('/addNews', formData)
  return response.data
}

export const getConsumerDashboard = async () => {
  const response = await api.get('/dashboard-consumer')
  return response.data
}

export const getNews = async () => {
  const response = await api.get('/getNews')
  return response.data
}

export const getNewsById = async (id) => {
  const response = await api.get(`/news/${id}`)
  return response.data
}
