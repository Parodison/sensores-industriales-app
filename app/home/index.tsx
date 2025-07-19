import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Header } from '../../components/Header';
import { useState, useEffect, useMemo } from 'react';
import AireSvg from '../../assets/svg/aire.svg';
import TermostatoSvg from '../../assets/svg/termostato.svg';
import GotaSvg from '../../assets/svg/gota.svg';
import { useWebsocket } from '../../contexts/WebsocketContext';
import { sensorData } from '../../types';

interface DatosSensores {
    calidadAire: number;
    temperatura: number;
    humedad: number;
}


export default function Home() {
    const { mensaje } = useWebsocket();
    const [datosSensores, setDatosSensores] = useState<DatosSensores>({
        calidadAire: 0,
        temperatura: 0,
        humedad: 0,
    });


    const sensoresData = [
        {
            label: 'Calidad del aire',
            value: `${datosSensores.calidadAire} ppm`,
            estado: "Bueno",
            icon: <AireSvg width={40} height={40} fill={"rgb(155, 153, 153)"} />,
            borderColor: "rgb(155, 153, 153)"
        },
        {
            label: 'Temperatura',
            value: `${datosSensores.temperatura} °C`,
            estado: "Normal",
            icon: <TermostatoSvg width={40} height={40} fill={"rgb(255, 174, 0)"} />,
            borderColor: "rgb(255, 174, 0)"

        },
        {
            label: 'Humedad',
            value: `${datosSensores.humedad} %`,
            estado: "Normal",
            icon: <GotaSvg width={40} height={40} fill={"rgb(0, 89, 255)"} />,
            borderColor: "rgb(0, 89, 255)"
        }
    ]

    const verPorSelector = [
        {
            label: "Gráficos normales"
        },
        {
            label: "Gráficos estadísticos"
        }
    ]

    useEffect(() => {
        if (!mensaje) return;

        const data: sensorData = JSON.parse(mensaje);
        console.log("Mensaje recibido:", data);
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
            }
        }

    }, [mensaje])


    return (
        <>
            <Header />
            <View style={styles.container}>
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
                        <TouchableOpacity key={index} style={[styles.sensorCard, { borderColor: data.borderColor }]}>

                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold"
                                }}
                            >
                                {data.label}
                            </Text>

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

                        </TouchableOpacity>
                    ))}

                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    subtitulo: {
        fontSize: 20,
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
        flexDirection: "row",
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
        flexDirection: "column",
        alignItems: "center",
        borderWidth: 3,
    },
    iconAndValueContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    estadoContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    }
});
