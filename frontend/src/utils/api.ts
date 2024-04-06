import axios, { AxiosInstance } from "axios";

// http://127.0.0.1:4000
export const backendURL = "https://skill-sphere-app-backend.vercel.app";

export const API: AxiosInstance = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});
