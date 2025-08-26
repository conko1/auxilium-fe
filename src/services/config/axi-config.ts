import axios from "axios";

const baseURL = process.env.NODE_ENV !== "production" ?  "http://localhost:8000/" : "https://api.auxiliumno.sk/";

const axi = axios.create({
  baseURL,
  withCredentials: true,
})

export default axi;
