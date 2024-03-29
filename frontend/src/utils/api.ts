import axios, { AxiosInstance } from "axios";

export const API: AxiosInstance = axios.create({
  baseURL: "https://skill-sphere-app-frontend.vercel.app",
  withCredentials: true,
});
