import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';


const CameraScreen = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraOpen, setCameraOpen] = useState(false);
    const cameraRef = useRef(null);

    const requestCameraPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    const handleOpenCamera = async () => {
        if (hasPermission === null) {
            await requestCameraPermission();
        }

        if (hasPermission === false) {
            Alert.alert('Permissão negada', 'A câmera precisa de permissão para funcionar.');
            return;
        }

        setCameraOpen(true);
    };

    const handleCapturePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            console.log('Foto capturada:', photo.uri);
            setCameraOpen(false);
        }
    };

    if (cameraOpen) {
        return (
            <Camera.Camera style={{ flex: 1 }} ref={cameraRef}>
                <View style={styles.cameraContainer}>
                    <TouchableOpacity style={styles.captureButton} onPress={handleCapturePhoto}>
                        <Text style={styles.captureText}>Tirar Foto</Text>
                    </TouchableOpacity>
                </View>
            </Camera.Camera>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Teste da Câmera</Text>
            <TouchableOpacity style={styles.openCameraButton} onPress={handleOpenCamera}>
                <Text style={styles.openCameraText}>Abrir Câmera</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    openCameraButton: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 8,
    },
    openCameraText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cameraContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
        backgroundColor: 'red',
        padding: 20,
        borderRadius: 50,
        position: 'absolute',
        bottom: 30,
    },
    captureText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CameraScreen;
