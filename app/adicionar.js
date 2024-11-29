import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import useStore from '../store/useStore';

const AddProductScreen = () => {
  const router = useRouter();
  const { categories, addProduct } = useStore();
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [observation, setObservation] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleOpenCamera = () => {
    router.push('/camera'); // Navega para a tela da câmera
  };

  const handleSave = () => {
    if (!name || !price || !category || !location) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const newProduct = {
      location,
      name,
      price,
      category,
      observation,
      photo, // Salva a foto no estado
    };

    addProduct(newProduct);
    router.push('/home');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Icon name="arrow-back" size={35} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adicionar Produto</Text>
      </View>

      <Text style={styles.label}>Local *</Text>
      <View style={styles.input}>
        <Picker
          selectedValue={location}
          onValueChange={setLocation}
          style={styles.picker}
        >
          <Picker.Item label="Selecione o local" value="" />
          <Picker.Item label="Mercale - Avenida Ceará" value="Mercale - Avenida Ceará" />
        </Picker>
      </View>

      <Text style={styles.label}>Nome *</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nome do produto" />

      <Text style={styles.label}>Preço *</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder="Preço" keyboardType="numeric" />

      <Text style={styles.label}>Categoria *</Text>
      <View style={styles.input}>
        <Picker
          selectedValue={category}
          onValueChange={setCategory}
          style={styles.picker}
        >
          <Picker.Item label="Selecione a categoria" value="" />
          {categories.map((cat, index) => (
            <Picker.Item key={index} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Fotos *</Text>
      <View style={styles.photoContainer}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.photo} />
        ) : (
          <Text style={styles.noPhotoText}>Nenhuma foto adicionada</Text>
        )}
        <TouchableOpacity style={styles.addPhotoButton} onPress={handleOpenCamera}>
          <Text style={styles.addPhotoText}>Tirar Foto</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  photoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  addPhotoButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  addPhotoText: {
    color: '#fff',
  },
  photo: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddProductScreen;
