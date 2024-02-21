import axios, { AxiosInstance } from "axios";

export const API: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:4000",
  withCredentials: true,
});
