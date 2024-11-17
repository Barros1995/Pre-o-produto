import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import useStore from '../store/useStore';

const AddProductScreen = () => {
  const router = useRouter();
  const { addProduct } = useStore(); 
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [observation, setObservation] = useState('');

  const handleSave = () => {
    const newProduct = {
      location,
      name,
      price,
      category,
      observation,
    };

    addProduct(newProduct); 
    router.push('/home'); 
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Adicionar Produto</Text>

        <Text style={styles.label}>Local *</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={location}
            onValueChange={(itemValue) => setLocation(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}  
          >
            <Picker.Item label="Selecione o local" value="" />
            <Picker.Item label="Mercale - Avenida Ceará" value="Mercale - Avenida Ceará" />
           
          </Picker>
        </View>
        <TouchableOpacity>
          <Text style={styles.suggestLocation}>Sugerir Local</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Nome *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nome do produto"
        />

        <Text style={styles.label}>Preço *</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Preço"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Categoria *</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}  
          >
            <Picker.Item label="Selecione a categoria" value="" />
            <Picker.Item label="Frutas" value="Frutas" />
            <Picker.Item label="Legumes" value="Legumes" />
        
          </Picker>
        </View>

        <Text style={styles.label}>Observação</Text>
        <TextInput
          style={[styles.input, styles.observationInput]}
          value={observation}
          onChangeText={setObservation}
          placeholder="Observação"
          multiline
        />

        <Text style={styles.label}>Fotos *</Text>
        <View style={styles.photoContainer}>
          <TouchableOpacity style={styles.addPhotoButton}>
            <Text style={styles.addPhotoText}>Adicionar foto</Text>
          </TouchableOpacity>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.photo} />
          <TouchableOpacity>
            <Text style={styles.deleteText}>Excluir</Text>
          </TouchableOpacity>
        </View>

        {/* Botão Salvar */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Rodapé com Ícones */}
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
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
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 10,
    overflow: 'hidden',
    paddingRight: 5, 
  },
  picker: {
    width: '100%',
    paddingRight: 30, 
    height: 50,
  },
  pickerItem: {
    fontSize: 5, 
  },
  suggestLocation: {
    color: '#1E90FF',
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  observationInput: {
    height: 80,
  },
  photoContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  addPhotoButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 8,
  },
  addPhotoText: {
    color: '#fff',
  },
  photo: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  deleteText: {
    color: 'red',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
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

export default AddProductScreen;
