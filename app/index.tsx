import { StyleSheet, Image, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import CedulaSvg from '../assets/svg/cedula.svg'
import { iniciarSesion } from '../lib/iniciarSesion';
import { useRouter } from 'expo-router';
import { useWebsocket } from '../contexts/WebsocketContext';
import { StatusBar } from 'react-native';
import { InterText as Text } from '../components/InterText';
import CTNLogo from "../assets/Ctn_new_logo-removebg-preview.png"
import EIKLogo from "../assets/eik.png"
import SolarisLogo from "../assets/solaris-logo.png"
import { InterTextInput } from '../components/InterTextInput';

export default function Home() {
    const [cedula, setCedula] = useState("");
    const [iniciandoSesion, setIniciandoSesion] = useState(false);
    const [textWidth, setTextWidth] = useState(0);

    const router = useRouter();
    const { setLogueado } = useWebsocket();

    const handleLogin = async () => {
        setIniciandoSesion(true);
        const inicioExitoso = await iniciarSesion(Number(cedula));

        if (inicioExitoso) {
            console.log("Inicio de sesión exitoso");
            setLogueado(true);
            router.replace("/home");
            setIniciandoSesion(false);
        }

        

    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.welcomeInfo}>
                    <View style={styles.imagesContainer}>
                        <Image
                            source={CTNLogo}
                            style={{ width: 120, height: 120, backgroundColor: '#cdcdcdff' }}
                            resizeMode="cover"
                        />
                        <Image
                            source={EIKLogo}
                            style={{ width: 120, height: 120, backgroundColor: 'transparent' }}
                            resizeMode='cover'
                        />
                        <Image
                            source={SolarisLogo}
                            style={{ width: 120, height: 120, }}
                            resizeMode="none"
                        />
                    </View>
                    <Text style={{ fontSize: 30, marginTop: 20, color: "#5f5f5fff" }} type='bold'>
                        DATA-SENSER
                    </Text>
                    <Text style={{
                        padding: 10,
                        margin: 20,
                        textAlign: "center",
                        fontSize: 17,
                        borderWidth: 1,
                        borderColor: "#bcbcbcff",
                        borderRadius: 20
                    }}>
                        Monitoreo ambiental confiable para procesos industriales
                    </Text>
                </View>
                <View style={styles.accesoContainer}>
                    <View style={{ flexDirection: "column", gap: 5, alignItems: "flex-start" }}>
                        <Text type='bold' style={{
                            fontSize: 18,
                        }}
                            onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
                        >
                            Acceder al sistema
                        </Text>
                        <View style={{ backgroundColor: "#2469ffff", width: textWidth, height: 8, borderRadius: 20 }} />
                    </View>
                    <View style={{ borderWidth: 1, borderColor: "#c9c9c9ff", borderRadius: 10, overflow: "hidden" }}>
                        <InterTextInput
                            placeholder='Ingrese su número de cédula'
                            icon={CedulaSvg}
                            onChangeText={text => setCedula(text)}
                            keyboardType='numeric'
                        />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                            alignItems: "center",
                            backgroundColor: "#2469ffff",
                            padding: 10,
                            borderRadius: 10
                        }}
                        onPress={handleLogin}
                    >
                        {iniciandoSesion ? (
                            <ActivityIndicator
                                color={"white"}
                                size={"small"}
                            />
                        ) : (
                            <Text type='bold' style={{ color: "white", fontSize: 17 }}>Ingresar</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#e6e6e6ff',
        justifyContent: "space-between",
        alignItems: "center"
    },
    welcomeInfo: {
        paddingTop: 50,
        flexDirection: "column",
        alignItems: "center",
    },
    accesoContainer: {
        flex: 3,
        width: "100%",
        backgroundColor: "white",
        padding: 20,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        gap: 20
    },
    imagesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 30
    },
    mainTitle: {
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    loginForm: {
        flexDirection: 'column',
        gap: 20,
    },
    textInputContainer: {
        borderWidth: 1,
        borderColor: 'rgb(201, 199, 199)',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: 320,
        gap: 10,
    },
    textInput: {
        width: '100%',
        height: 50,
        fontSize: 20,
    },
    iconContainer: {
        width: 50, // o el mismo que el height del TextInput
        height: 50,
        backgroundColor: 'rgb(222, 222, 222)',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    loginButton: {
        width: 300,
        backgroundColor: 'rgb(0, 122, 255)',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        position: 'relative',
    }

});
