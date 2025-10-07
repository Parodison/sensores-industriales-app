import {ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform, ToastAndroid } from 'react-native';
import { Header } from '../../components/Header';
import { useState, useEffect, useMemo } from 'react';
import AireSvg from '../../assets/svg/aire.svg';
import TermostatoSvg from '../../assets/svg/termostato.svg';
import GotaSvg from '../../assets/svg/gota.svg';
import PolvoSvg from '../../assets/svg/polvo.svg'
import { useWebsocket } from '../../contexts/WebsocketContext';
import { sensorData } from '../../types';
import { getAireStatus, getHumedadStatus, getPolvoStatus, getTemperaturaStatus } from '../../lib/sensorStatusHandler';
import { useRouter } from 'expo-router';

interface DatosSensores {
    calidadAire: number;
    temperatura: number;
    humedad: number;
    polvo: number;
}


export default function Home() {
    const { mensaje } = useWebsocket();
    const [datosSensores, setDatosSensores] = useState<DatosSensores>({
        calidadAire: 0,
        temperatura: 0,
        humedad: 0,
        polvo: 0,
    });
    const router = useRouter();


    const sensoresData = [
        (() => {
            const { estado, color } = getAireStatus(datosSensores.calidadAire)
            return {
                label: 'Calidad del aire',
                value: `${datosSensores.calidadAire} ppm`,
                estado: estado,
                icon: <AireSvg width={40} height={40} fill={color} />,
                borderColor: color
            }

        })(),
        (() => {
            const {estado, color} = getTemperaturaStatus(datosSensores.temperatura);
            return {
                label: 'Temperatura',
                value: `${datosSensores.temperatura} °C`,
                estado: estado,
                icon: <TermostatoSvg width={40} height={40} fill={color} />,
                borderColor: color

            }
        })(),
        (() => {
            const { estado, color } = getHumedadStatus(datosSensores.humedad);
            return {
                label: 'Humedad',
                value: `${datosSensores.humedad} %`,
                estado: estado,
                icon: <GotaSvg width={40} height={40} fill={color} />,
                borderColor: color

            }
        })(),
        (() => {
            const { estado, color } = getPolvoStatus(datosSensores.polvo)
            return {
                label: 'Polvo',
                value: `${datosSensores.polvo} µg/m³`,
                estado: estado,
                icon: <PolvoSvg width={40} height={40} fill={color} />,
                borderColor: color

            }
        })(),
    ]

    useEffect(() => {
        if (!mensaje) return;

        const data: sensorData = JSON.parse(mensaje);
        if (data.operacion === "enviar_datos_sensor") {
            const { sensor, valor } = data.datos;
            if (sensor === "aire") {
                setDatosSensores(prev => ({
                    ...prev,
                    calidadAire: valor
                }));
            }
            else if (sensor === "temperatura") {
                console.log("Temperatura:", valor);
                setDatosSensores(prev => ({
                    ...prev,
                    temperatura: valor
                }));
            } else if (sensor === "humedad") {
                setDatosSensores(prev => ({
                    ...prev,
                    humedad: valor
                }));
            } else if (sensor === "polvo") {
                setDatosSensores(prev => ({
                    ...prev,
                    polvo: valor
                }));
            }
        }

    }, [mensaje])


    return (
        <>
            <Header />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.subtitulo}>DATOS EN TIEMPO REAL</Text>
                    <View
                        style={{
                            borderBottomWidth: 1,
                            width: 300,
                            alignSelf: "center"
                        }}
                    />
                </View>

                <View style={styles.sensoresContainer}>
                    {sensoresData.map((data, index) => (
                        <TouchableOpacity activeOpacity={0.7} key={index} style={[styles.sensorCard, { borderColor: data.borderColor }]}
                            onPress={() => {
                                if (Platform.OS === "android") {
                                    ToastAndroid.show(`VALOR DEL SENSOR: ${data.value}`, ToastAndroid.SHORT)
                                }
                            }}
                        >

                            <View style={styles.iconAndValueContainer}>
                                {data.icon}
                                <Text
                                    style={{
                                        fontSize: 20,
                                    }}
                                >
                                    {data.value}
                                </Text>
                            </View>

                            <View style={{
                                flexDirection: "column",
                            }}>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "bold"
                                    }}
                                >
                                    {data.label}
                                </Text>

                                <View style={styles.estadoContainer}>

                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: "bold"
                                        }}
                                    >
                                        Estado:
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: 20,
                                        }}
                                    >
                                        {data.estado}
                                    </Text>

                                </View>
                            </View>

                        </TouchableOpacity>
                    ))}
                    
                </View>
                <TouchableOpacity
                    style={styles.historialButton}
                    onPress={() => router.push('home/historial-estadistico')}
                >
                    <Text 
                    style={styles.historialButtonText}
                    >
                        Ver Historial Estadistico
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: '#fff',
        alignItems: 'center',
        gap: 20
    },
    subtitulo: {
        fontSize: 25,
        fontWeight: "bold",
        padding: 10,
        marginTop: 20,
    },
    verPorContainer: {
        flexDirection: "row",
        alignSelf: "flex-start",
        marginLeft: 20,
        marginTop: 10,
        gap: 7,
        alignItems: "center",
    },
    verPorSelector: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "rgb(131, 131, 131)",
        borderRadius: 20,
        padding: 10,
        gap: 10,
    },
    sensoresContainer: {
        flexDirection: "column",
        flexWrap: "wrap",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    sensorCard: {
        padding: 10,
        backgroundColor: "white",
        borderRadius: 5,
        elevation: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 3,
        width: 300
    },
    iconAndValueContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: "column",
        alignItems: "center",
        gap: 10
    },
    estadoContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    historialButton: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 50,
        elevation: 3,
        backgroundColor: "white"
    },
    historialButtonText: {
        fontWeight: "bold",
        fontSize: 25,
    }
});
