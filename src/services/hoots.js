import axios from 'axios'
import { getToken } from '../utils/token'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/hoots`
})

export const hootCreate = (formData) => {
  return api.post('', formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}

export const hootIndex = () => {
  return api.get('')
}

export const hootShow = (hootId) => {
  return api.get(`/${hootId}`)
}

export const hootUpdate = (hootId, formData) => {
  return api.put(`/${hootId}`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}

export const hootDelete = (hootId) => {
  return api.delete(`/${hootId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}

export const commentCreate = (hootId, formData) => {
  return api.post(`/${hootId}/comments`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}