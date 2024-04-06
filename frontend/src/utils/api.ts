import axios, { AxiosInstance } from "axios";

export const backendURL = "http://127.0.0.1:4000";

export const API: AxiosInstance = axios.create({
  // baseURL: "https://skill-sphere-app-backend.vercel.app",
  baseURL: backendURL,
  withCredentials: true,
});
