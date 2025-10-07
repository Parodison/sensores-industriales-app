import axios from "axios";
import { BACKEND_URL } from "@env";

export const backendFetch = axios.create(
    {
    baseURL: BACKEND_URL,
});