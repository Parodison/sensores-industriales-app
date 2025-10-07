import { useState } from "react";
import { backendFetch } from "./interceptor";
import * as SecureStore from "expo-secure-store";
import { LoginResponse } from "../types";
import { useWebsocket } from "../contexts/WebsocketContext";
import { BACKEND_URL } from "@env";

export const iniciarSesion = async (cedula: number) => {
    try {
        console.log(BACKEND_URL)
        const response = await backendFetch.post<LoginResponse>(
            "api/usuarios/iniciar-sesion",
            { cedula },
            {
                timeout: 10000
            }
        )
        
        await SecureStore.setItemAsync("access_token", response.data.access_token);
        await SecureStore.setItemAsync("refresh_token", response.data.refresh_token);
        return true;
    }
    catch (error) {
        console.error("Error al iniciar sesión:", error);
        return false;
    }
}