import { Header } from "../../../components/Header"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { ChartConfig } from "react-native-chart-kit/dist/HelperTypes";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { datosSensorRecibido, SensorDataResponse } from "../../../types";
import { backendFetch } from "../../../lib/interceptor";
import { formatearFecha } from "../../../lib/utils";
import FlechaAbajo from "../../../assets/svg/flecha-abajo.svg"
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";

const sensoresSeleccionables = [
    { label: 'Aire', value: 'aire' },
    { label: 'Temperatura', value: 'temperatura' },
    { label: 'Húmedad', value: 'humedad' },
    { label: 'Polvo', value: 'polvo' },
]

export default function HistorialEstadistico() {
    const screenWidth = Dimensions.get('window').width;
    const [sensorData, setSensorData] = useState<datosSensorRecibido[]>([]);
    const [lineChartData, setLineChartData] = useState<LineChartData>({
        labels: [],
        datasets: [{data: []}]
    });
    const [sensorSeleccionado, setSensorSeleccionado] = useState(sensoresSeleccionables[0])
    const [selectorAbierto, setSelectorAbierto] = useState(false);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        setCargando(true);
        const obtenerDatosSensor = async () => {
            const response = await backendFetch.get<SensorDataResponse>('api/sensores/obtener-historial-sensor', {
                params: {
                    sensor: sensorSeleccionado.value
                }
            })
            setCargando(false);
            setSensorData(response.data.datos);
            setLineChartData(response.data.line_chart)

        }
        obtenerDatosSensor()

    }, [sensorSeleccionado])

    const chartConfig: ChartConfig = {
        backgroundGradientFrom: '#5c5c5cff',
        backgroundGradientTo: '#838383ff',
        decimalPlaces: 2, // opcional, número de decimales
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

        propsForDots: {
            r: '5',
            strokeWidth: '2',
            stroke: '#757575ff',
        },
    };


    return (
        <>
            <Header backButton={true}/>
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
                    <View style={styles.seleccionSensorContainer}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>
                            Seleccionar sensor:
                        </Text>
                        <TouchableOpacity
                            style={styles.sensorSelector}
                            onPress={() => setSelectorAbierto(!selectorAbierto)}
                        >
                            <Text
                                style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    fontSize: 18
                                }}
                            >
                                {sensorSeleccionado.label}
                            </Text>
                            <FlechaAbajo fill={'rgba(122, 122, 122, 1)'} />

                            {selectorAbierto &&
                                <View style={styles.selectorAbierto}>
                                    {sensoresSeleccionables.map((sensor, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => {
                                                setSensorSeleccionado(sensor)
                                                setSelectorAbierto(false)
                                            }}
                                            style={{
                                                backgroundColor: sensor.value === sensorSeleccionado.value ? 'blue' : 'white',
                                                padding: 5
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: sensor.value === sensorSeleccionado.value ? 'white' : 'black',
                                                    fontSize: 18
                                                }}
                                            >
                                                {sensor.label}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            }

                        </TouchableOpacity>


                    </View>
                    {!cargando &&
                        <LineChart
                            data={lineChartData}
                            width={screenWidth - 32}
                            height={220}
                            chartConfig={chartConfig}
                            style={{
                                marginVertical: 8,
                                borderRadius: 5,
                            }}
                        />
                    }
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
                            08/10/2025
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
                                <FlatList
                                    data={sensorData}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => {
                                        const fecha = formatearFecha(item.fecha_lectura);
                                        return (
                                            <View style={styles.filaTabla}>
                                                <Text style={styles.textoCuerpo}>
                                                    {`${fecha.hora}:${fecha.minutos}`}
                                                </Text>
                                                <Text style={styles.textoCuerpo}>
                                                    {item.valor} {item.sensor === 'aire' && 'ppm'}
                                                    {item.sensor === 'temperatura' && '°C'}
                                                    {item.sensor === 'humedad' && '%'}
                                                    {item.sensor === 'polvo' && 'µg/m³'}
                                                </Text>
                                                <Text style={styles.textoCuerpo}>
                                                    {item.sensor}
                                                </Text>
                                            </View>
                                        );
                                    }}
                                />

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

    },
    seleccionSensorContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        gap: 10,
    },
    sensorSelector: {
        position: "relative",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        borderWidth: 1,
        padding: 3,
        width: 150,
        borderRadius: 10,
        borderColor: 'rgba(154, 154, 154, 1)',
        zIndex: 1000,
    },
    selectorAbierto: {
        position: "absolute",
        top: 35,
        flexDirection: "column",
        gap: 5,
        width: 150,
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden"
    },
    opcionesSensorItem: {
        padding: 10,
    },
    opcionesSensorItemText: {
        padding: 10,
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