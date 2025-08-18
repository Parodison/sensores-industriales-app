import { Vibration } from "react-native";

export const getAireStatus = (ppm: number) => {
    if (ppm <= 350) {
        return {
            estado: 'Bueno',
            color: 'rgb(0, 89, 255)'
        };
    } else if (ppm <= 550) {
        return {
            estado: 'Moderado',
            color: 'rgb(255, 165, 0)'
        };
    } else {
        return {
            estado: 'Malo',
            color: 'rgb(255, 0, 0)'
        };
    }
};

export const getTemperaturaStatus = (temperatura: number) => {
    if (temperatura >= 20 && temperatura <= 24) {
        return {
            estado: 'Óptimo',
            color: 'rgb(0, 89, 255)'
        };
    } else if ((temperatura >= 18 && temperatura < 20) || (temperatura > 24 && temperatura <= 26)) {
        return {
            estado: 'Moderada',
            color: 'rgb(255, 165, 0)'
        };
    } else {
        return {
            estado: 'Mala',
            color: 'rgb(255, 0, 0)'
        };
    }
};

export const getHumedadStatus = (humedad: number) => {
    if (humedad <= 30 || humedad >= 70) {
        return {
            estado: 'Riesgo de sequedad',
            color: 'rgb(255, 0, 0)'
        }
    } else if (humedad >= 40 || humedad <= 60) {
        return {
            estado: 'Óptimo',
            color: 'rgb(0, 89, 255)'
        }
    } else {
        return {
            estado: 'Moderado',
            color: 'rgb(255, 165, 0)'
        }
    }
}