import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, Alert } from 'react-native';
import useStore from '../store/useStore';
import { useRouter } from 'expo-router';

const LoginPagina = () => {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const { login, mensagemErro, usuarioLogado } = useStore();

  // Redirecionar se o login for bem-sucedido
  useEffect(() => {
    if (usuarioLogado) {
      router.push('/home'); 
    }
  }, [usuarioLogado]);

  useEffect(() => {
    if (mensagemErro) {
      Alert.alert(mensagemErro);
    }
  }, [mensagemErro]);

  const logar = async () => {
    if (!usuario || !senha) {
      return Alert.alert('Preencha os campos de usuário e senha');
    }
    await login(usuario, senha);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/imagens/logotipo.png')} style={styles.logo} />
      </View>
      <Text style={styles.texto}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsuario}
        value={usuario}
        placeholder="Usuário"
      />
      <TextInput
        style={styles.input}
        onChangeText={setSenha}
        value={senha}
        placeholder="Senha"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={logar}>
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
