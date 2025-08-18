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


export interface datosRegistro {
    encabezados: string[],
    datos: {
        hora: string;
        valor: string;
        estado: string;
    }[]
}

export interface datosSensorRecibido {
    sensor: string;
    valor: number;
    timestamp: string;
}

export interface sensorrData {
    mensaje: string;
    datos: datosSensorRecibido[];
}