import axios from "axios";

const https = axios.create({
  baseURL: process.env.APP_BASE_URL,
});

export default https;