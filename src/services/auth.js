import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/auth'
})

export const signUpService = (formData) => {
  return api.post('/sign-up', formData)
}