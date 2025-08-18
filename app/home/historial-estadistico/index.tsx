import { Header } from "../../../components/Header"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { Dimensions } from "react-native";
import { useWebsocket } from "../../../contexts/WebsocketContext";
import sensorDataJson from "../../../mock/sensorData.json"
import { useEffect, useState } from "react";
import { datosSensorRecibido, sensorrData } from "../../../types";

export default function HistorialEstadistico() {
    const screenWidth = Dimensions.get('window').width;
    const { enviarMensaje, mensaje } = useWebsocket();
    const [sensorData, setSensorData] = useState<datosSensorRecibido[]>([]);

    useEffect(() => {
        enviarMensaje(JSON.stringify({
            operacion: "obtener_historial_monitoreo",
            sensor: "aire"
        }))
        const mensajeDatosSensor: sensorrData = JSON.parse(mensaje);

        if (mensajeDatosSensor.mensaje === "Datos de sensor obtenidos") {
            setSensorData(mensajeDatosSensor.datos)
            console.log(mensajeDatosSensor.datos)
        }
    }, [])

    const data = {
        labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'], // Horas (eje X)
        datasets: [
            {
                data: [35, 40, 55, 50, 60, 100], // Porcentaje del sensor (eje Y)
            }
        ],
    };

    const chartConfig = {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 1, // opcional, número de decimales
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
        },
    };


    return (
        <>
            <Header />
            <View style={styles.container}>
                <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.subtitulo}>HISTORIAL ESTADISTICO</Text>
                    <View
                        style={{
                            borderBottomWidth: 1,
                            width: 300,
                            alignSelf: "center"
                        }}
                    />
                </View>
                <View>
                    <Text>Line chart</Text>
                    <LineChart
                        data={data}
                        width={screenWidth - 32} // padding lateral
                        height={220}
                        chartConfig={chartConfig}
                        bezier // para curvas suaves (opcional)
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                </View>

                <View style={styles.registroSensor}>
                    <Text
                        style={styles.registroSensorText}
                    >
                        REGISTRO DEL SENSOR
                    </Text>
                    <View
                        style={{
                            borderBottomWidth: 1,
                            width: 300,
                            alignSelf: "center"
                        }}
                    />
                    <View style={styles.tablaSensor}>
                        <Text style={styles.fechaSensor}>
                            07/08/2025
                        </Text>
                        <View style={styles.contenidoTabla}>
                            <View style={styles.encabezadoTabla}>

                                <Text style={styles.textoEncabezado}>
                                    HORA
                                </Text>
                                <Text style={styles.textoEncabezado}>
                                    VALOR
                                </Text>
                                <Text style={styles.textoEncabezado}>
                                    ESTADO
                                </Text>


                            </View>

                            <View style={styles.cuerpoTabla}>
                                <ScrollView>
                                    {sensorData.map((dato, indice) => (
                                        <View style={styles.filaTabla}>
                                            <Text key={indice} style={styles.textoCuerpo}>
                                                {dato.timestamp}
                                            </Text>
                                            <Text style={styles.textoCuerpo}>
                                                {dato.valor}
                                            </Text>
                                            <Text style={styles.textoCuerpo}>
                                                {dato.sensor}
                                            </Text>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>

                        </View>
                    </View>
                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: "column",
        padding: 10,
        marginTop: 20
    },
    subtitulo: {
        fontSize: 25,
        fontWeight: "bold",
        padding: 10,
        marginTop: 20,
    },
    registroSensor: {
        flexDirection: "column"
    },
    registroSensorText: {
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 15,
        textAlign: "center",
    },
    tablaSensor: {
        flex: 1,
        flexDirection: "column",

    },
    fechaSensor: {
        textAlign: "left",
        fontSize: 20,
        marginTop: 10,
        color: "rgba(139, 139, 139, 1)",
        fontWeight: 400,
    },
    contenidoTabla: {
        flexDirection: "column",

    },
    encabezadoTabla: {

        flexDirection: "row",
        justifyContent: "space-between",
    },
    textoEncabezado: {
        flex: 1,
        fontWeight: "bold",
        marginTop: 10,
        fontSize: 20,
        color: "rgba(108, 108, 108, 1)",
        textAlign: "center"
    },
    cuerpoTabla: {
        flexDirection: "column",
        height: 260,
        
        overflow: 'scroll',
    },
    filaTabla: {

        flexDirection: "row",
        justifyContent: "space-between",
    },
    textoCuerpo: {
        flex: 1,
        fontWeight: "bold",
        marginTop: 10,
        fontSize: 20,
        color: "rgba(108, 108, 108, 1)",
        textAlign: "center",
        borderBottomWidth: 0.5
    },
})