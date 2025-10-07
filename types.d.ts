import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";

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
    fecha_lectura: string;
}

export interface SensorDataResponse {
    mensaje: string;
    datos: datosSensorRecibido[];
    line_chart: LineChartData
}