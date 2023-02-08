import axios from 'axios'

export const api = axios.create({
   baseURL: 'https://prosel-vflows-6su8m2q55-glsvitoria.vercel.app/api'
})