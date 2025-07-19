import { WEBSOCKET_URL } from "@env";
import { useContext, useState, createContext, useRef, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

type WebsocketContextType = {
    conectado: boolean;
    websocket: WebSocket | null;
    mensaje: string;
    logueado: boolean; // solo boolean
    setLogueado: React.Dispatch<React.SetStateAction<boolean>>; // obligatorio el setter
};


const WebsocketContext = createContext<WebsocketContextType | undefined>(undefined);

export const WebsocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [conectado, setConectado] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const websocket = useRef<WebSocket | null>(null);
    const [logueado, setLogueado] = useState(false);

    useEffect(() => {

        if (!logueado) {
            return;
        }

        const conectarWebSocket = async () => {
            const token = await SecureStore.getItemAsync("access_token");
            if (!token) return;

            websocket.current = new WebSocket(`${WEBSOCKET_URL}api/sensores/ws?tipo=usuario&token=${token}`);

            websocket.current.onopen = () => {
                console.log("Conectado al WebSocket");
                setConectado(true);
            };

            websocket.current.onmessage = (event) => {
                setMensaje(event.data);
            };

            websocket.current.onclose = () => {
                console.log("Desconectado del WebSocket");
                setConectado(false);
            };
        };

        conectarWebSocket();

    }, [logueado])

    return (
        <WebsocketContext.Provider value={{ conectado, websocket: websocket.current, mensaje, logueado: logueado, setLogueado }}>
            {children}
        </WebsocketContext.Provider>)
}

export const useWebsocket = () => {
    const context = useContext(WebsocketContext);
    if (!context) {
        throw new Error("useWebSocket debe usarse dentro de WebSocketProvider");
    }
    return context;
}