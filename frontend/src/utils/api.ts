import axios, { AxiosInstance } from "axios";

export const API: AxiosInstance = axios.create({
  baseURL: "https://skill-sphere-app-backend.vercel.app",
  withCredentials: true,
});
