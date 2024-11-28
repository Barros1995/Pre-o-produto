import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import useStore from '../store/useStore';

const AdicionarCategoria = () => {
  const router = useRouter();
  const { addCategory } = useStore(); 
  const [nomeCategoria, setNomeCategoria] = useState(''); 

  const handleSave = () => {
    if (nomeCategoria.trim() !== '') {
      addCategory(nomeCategoria); 
      setNomeCategoria(''); 
      router.push('/categoria');
    } else {
      alert('Por favor, insira um nome para a categoria.'); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Adicionar Categoria</Text>
        <Text style={styles.label}>Nome *</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da categoria"
          value={nomeCategoria}
          onChangeText={setNomeCategoria} // Atualiza o estado local
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
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
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
});

export default AdicionarCategoria;
