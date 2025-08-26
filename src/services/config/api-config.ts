import axios from "axios";
import axi from "@/services/config/axi-config";
import {refresh} from "@/services/auth-service";

const baseURL = process.env.NODE_ENV !== "production" ?  "http://localhost:8000/" : "https://api.auxiliumno.sk/";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      try {
        await refresh();
      } catch (e) {
        return
      }
      return axi.request(error.config);
    }

    return Promise.reject(error);
  }
);

export default api;
