import axios from "axios"



export const  apiClient = axios.create({
    baseURL: process.env.BASE_URL
})

