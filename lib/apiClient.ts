import axios from "axios"


const  baseURL = process.env.BASE_URL
export const  apiClient = axios.create({
    baseURL :baseURL
})

