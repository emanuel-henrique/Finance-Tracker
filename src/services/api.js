import axios from "axios";

export const api = axios.create({
  baseURL: "https://finance-tracker-api-00hr.onrender.com",
});
