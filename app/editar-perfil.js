import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import useStore from '../store/useStore';

const EditarPerfil = () => {
  const router = useRouter();
  const { user, setUser } = useStore();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Cabeçalho com o botão de voltar e o título centralizado */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Icon name="arrow-back" size={35} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Perfil</Text>
        </View>

     
        <View style={styles.profileHeader}>
          <Image
            style={styles.profileImage}
            source={{ uri: 'https://via.placeholder.com/150' }}
          />
          <Text style={styles.profileName}>{user.name || 'Usuário'}</Text>
        </View>

        {/* Campos de entrada de dados */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={user.name}
            onChangeText={(text) => setUser({ name: text })}
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            value={user.email}
            onChangeText={(text) => setUser({ email: text })}
          />

          <Text style={styles.label}>CPF</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu CPF"
            value={user.cpf}
            onChangeText={(text) => setUser({ cpf: text })}
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu telefone"
            value={user.phone}
            onChangeText={(text) => setUser({ phone: text })}
          />
        </View>

        {/* Botão de salvar */}
        <TouchableOpacity style={styles.saveButton} onPress={() => router.push('/perfil')}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>

      </ScrollView>

  
      <View style={styles.footer}>
      
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
  profileHeader: {
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
