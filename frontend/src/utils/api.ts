import axios from "axios"

const api = axios.create({
    baseURL: 'https://localhost:3000/api/auth'
})

export const googleAuth = (code) => api.get(`/google?code=${code}`)