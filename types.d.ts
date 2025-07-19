export interface LoginResponse {
    access_token: string;
    refresh_token: string;
}

export interface sensorData {
    operacion: string;
    datos: {
        sensor: string;
        valor: number;
    }
}