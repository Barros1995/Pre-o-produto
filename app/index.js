import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const Home = () => {
    const router = useRouter();

    useEffect(() => {
    
        const timer = setTimeout(() => {
            router.push('/login');
        }, 500);  

        
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <Image source={require('../assets/imagens/logotipo.png')} style={styles.logo} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 300,
        height: 300,
    }
});

export default Home;
