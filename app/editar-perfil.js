import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const EditarPerfil = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Cabeçalho com o botão de voltar e o título centralizado */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Perfil</Text>
        </View>

        {/* Seção de imagem e nome do perfil */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Icon name="person-circle-outline" size={100} color="#fff" />
          </View>
          <Text style={styles.profileName}>Lizza</Text>
        </View>

        {/* Campos de entrada de dados */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome *</Text>
          <TextInput style={styles.input} placeholder="Value" />

          <Text style={styles.label}>E-mail</Text>
          <TextInput style={styles.input} placeholder="Value" />

          <Text style={styles.label}>CPF</Text>
          <TextInput style={styles.input} placeholder="Value" />

          <Text style={styles.label}>Senha</Text>
          <TextInput style={styles.input} placeholder="Value" secureTextEntry />

          <Text style={styles.label}>Telefone</Text>
          <TextInput style={styles.input} placeholder="Value" />
        </View>

        {/* Botão de salvar */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Barra de navegação */}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSection: {
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  iconButton: {
    alignItems: 'center',
  },
});

export default EditarPerfil;
