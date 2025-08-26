import axios from "axios";

// const baseURL = process.env.NODE_ENV !== "production" ?  "http://localhost:8000/api" : "https://api.bankari.sk/api";
// const baseURL = process.env.NODE_ENV !== "production" ?  "https://api.bankari.sk/api" : "http://localhost:8000/api";

const baseURL = "http://localhost:8000/";

const axi = axios.create({
  baseURL,
  withCredentials: true,
})

export default axi;
