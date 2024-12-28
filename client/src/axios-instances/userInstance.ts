import axios from 'axios';





// Create axios instance : 
export const axiosUserInstances = axios.create({
    baseURL: "http://localhost:8000/user/api",
    withCredentials: true,
})