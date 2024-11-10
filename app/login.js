import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { useRouter } from 'expo-router';

const LoginPagina = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/imagens/logotipo.png')} style={styles.logo} />
            </View>
            <Text style={styles.texto}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Usuário"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/cadastro')}>
                <Text style={styles.registerText}>Registrar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    logoContainer: {
        marginTop: 20, 
        marginBottom: 50,
        alignItems: 'center',
    },
    logo: {
        width: 200,  
        height: 200,  
    },
    texto: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 50, 
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        width: '80%',
        height: 40,
        backgroundColor: '#28a745',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    registerText: {
        color: '#007bff',
        fontSize: 16,
    },
});

export default LoginPagina;
