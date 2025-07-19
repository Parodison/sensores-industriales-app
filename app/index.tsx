import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { useState } from 'react';
import AireSvg from '../assets/svg/aire.svg';
import TermostatoSvg from '../assets/svg/termostato.svg';
import GotaSvg from '../assets/svg/gota.svg';

export default function Home() {


    const sensoresData = [
        {
            label: 'Calidad del aire',
            value: `${300} ppm`,
            estado: "Bueno",
            icon: <AireSvg width={40} height={40} fill={"rgb(155, 153, 153)"} />,
            borderColor: "rgb(155, 153, 153)"
        },
        {
            label: 'Temperatura',
            value: `${25} °C`,
            estado: "Normal",
            icon: <TermostatoSvg width={40} height={40} fill={"rgb(255, 174, 0)"} />,
            borderColor: "rgb(255, 174, 0)"

        },
        {
            label: 'Humedad',
            value: 60,
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
                <View style={styles.verPorContainer}>
                    <Text
                        style={{
                            fontWeight: 600,
                            fontSize: 16
                        }}
                    >
                        Ver por:
                    </Text>
                    <TouchableOpacity style={styles.verPorSelector}>
                        <Text>
                            Gráficos normales
                        </Text>
                        <Text>
                            ▼
                        </Text>
                    </TouchableOpacity>
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
