import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import useStore from '../store/useStore';

const Perfil = () => {
  const router = useRouter();
  const { user, usuarioLogado, logout } = useStore();

  useEffect(() => {
    if (!usuarioLogado) {
      router.push('/login'); // Redireciona para login se não estiver autenticado
    }
  }, [usuarioLogado]);

  const sair = () => {
    logout();
    Alert.alert("Logout", "Você saiu da sua conta.");
    router.replace('/login'); // Substitui a tela para evitar voltar ao perfil com 'Back'
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Perfil</Text>

        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            source={{ uri: user.profileImage || 'https://via.placeholder.com/150' }} // Imagem do estado global ou placeholder
          />
          <Text style={styles.profileName}>{user.name || 'Usuário'}</Text>
        </View>

        <TouchableOpacity style={styles.option} onPress={() => router.push('/editar-perfil')}>
          <Icon name="person-outline" size={24} color="#333" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Editar Perfil</Text>
            <Text style={styles.optionSubtitle}>Email, segurança, mudar número</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => router.push('/notificacoes')}>
          <Icon name="notifications-outline" size={24} color="#333" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Notificações</Text>
            <Text style={styles.optionSubtitle}>Ativar ou desativar notificações</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => router.push('/excluirConta')}>
          <Icon name="trash-outline" size={24} color="#333" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Excluir minha conta</Text>
            <Text style={styles.optionSubtitle}>Remover conta e excluir registros</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={sair}>
          <Icon name="log-out-outline" size={24} color="#333" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Sair</Text>
            <Text style={styles.optionSubtitle}>Fazer logout do aplicativo</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Icon name="home-outline" size={30} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/adicionar')}>
          <Icon name="grid-outline" size={30} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/categoria')}>
          <Icon name="list-outline" size={30} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/local')}>
          <Icon name="location-outline" size={30} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/perfil')}>
          <Icon name="person-outline" size={30} color="#4CAF50" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 30,
    marginTop: 40,
    color: '#333',
  },
  header: {
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionTextContainer: {
    marginLeft: 10,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#777',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
});

export default Perfil;
