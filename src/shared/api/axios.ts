import axios from "axios";
import { API_URL } from "../constants";

export const apiInstance = axios.create({
  baseURL: API_URL,
});
