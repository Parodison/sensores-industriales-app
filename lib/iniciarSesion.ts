import { useState } from "react";
import { backendFetch } from "./interceptor";
import * as SecureStore from "expo-secure-store";
import { LoginResponse } from "../types";
import { useWebsocket } from "../contexts/WebsocketContext";

export const iniciarSesion = async (cedula: number) => {
    try {
        const response = await backendFetch.post<LoginResponse>(
            "api/usuarios/iniciar-sesion",
            { cedula }
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