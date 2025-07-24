import axios from "axios";
import { BACKEND_URL } from "@env";

export const backendFetch = axios.create(
    {
    baseURL: "http://192.168.1.111:8000/",
});