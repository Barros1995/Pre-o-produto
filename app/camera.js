/*
import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { useRouter } from 'expo-router';
import useStore from '../store/useStore';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const router = useRouter();
  const { setCapturedPhoto } = useStore();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCapturePhoto = async () => {
    if (!cameraRef.current) return;
    const photoData = await cameraRef.current.takePictureAsync();
    setCapturedPhoto(photoData.uri); // Armazena a foto no Zustand
    router.push('/addProduct');
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera ref={cameraRef} style={{ flex: 1 }} type={Camera.Constants.Type.back}>
        <View style={styles.cameraContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={handleCapturePhoto}>
            <Text style={styles.captureText}>Tirar Foto</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 50,
  },
  captureText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CameraScreen;*/
