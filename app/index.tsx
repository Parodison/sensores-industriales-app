import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import CedulaSvg from '../assets/svg/cedula.svg'
import { iniciarSesion } from '../lib/iniciarSesion';
import { useRouter } from 'expo-router';
import { useWebsocket } from '../contexts/WebsocketContext';


export default function Home() {
    const [cedula, setCedula] = useState("");
    const [iniciandoSesion, setIniciandoSesion] = useState(false);

    const router = useRouter();
    const {setLogueado} = useWebsocket();

    const handleLogin = async () => {
        setIniciandoSesion(true);
        const inicioExitoso = await iniciarSesion(Number(cedula));
        setIniciandoSesion(false);
        if (inicioExitoso) {
            console.log("Inicio de sesión exitoso");
        }
        setLogueado(true);
        setIniciandoSesion(false);
        router.replace("/home");
    };

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.mainTitle}>
                    Bienvenido a la App de Sensores Industriales
                </Text>
                <View style={styles.loginForm}>
                    <View style={styles.textInputContainer}>
                        <View style={styles.iconContainer}>
                            <CedulaSvg
                                width={30}
                                height={30}
                                fill={"rgb(117, 117, 117)"}
                            />
                        </View>

                        <TextInput
                            style={styles.textInput}
                            placeholder='Introduce tu número de cédula'
                            placeholderTextColor={"rgb(117, 117, 117)"}
                            keyboardType="numeric"
                            value={cedula}
                            onChangeText={(text) => setCedula(text)}
                        />
                    </View>
                    <TouchableOpacity style={styles.loginButton}
                        onPress={handleLogin}
                    >
                        <Text style={{
                            textAlign: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                        }}>
                            {iniciandoSesion ? "" : "Acceder"}
                        </Text>

                        {iniciandoSesion &&
                            <ActivityIndicator
                                size="small"
                                color="white"
                                style={{ position: "absolute" }}
                            />
                        }
                    </TouchableOpacity>
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
        justifyContent: 'center',
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
