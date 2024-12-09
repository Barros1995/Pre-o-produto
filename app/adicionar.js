import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert,} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

const AddProductScreen = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [observation, setObservation] = useState('');
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchCategoriesAndLocations = async () => {
      try {
        const categoryResponse = await fetch('https://api-produtos-9jmi.onrender.com/categories');
        const locationResponse = await fetch('https://api-produtos-9jmi.onrender.com/locations');
        const categoriesData = await categoryResponse.json();
        const locationsData = await locationResponse.json();
        setCategories(categoriesData);
        setLocations(locationsData);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados da API.');
      }
    };
    fetchCategoriesAndLocations();
  }, []);

  const handleInputChange = (text) => {
    const numericValue = text.replace(/[^0-9.]/g, '');
    setPrice(numericValue);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permissão necessária', 'Permita o acesso à galeria para selecionar imagens.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permissão necessária', 'Permita o acesso à câmera para tirar fotos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!photo || !name || !price || !category || !location) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const formData = new FormData();
    formData.append('nome', name);
    formData.append('preco', price);
    formData.append('descricao', observation);
    formData.append('usuario', 'Osvaldo');
    formData.append('categoriaId', category);
    formData.append('localId', location);
    formData.append('image', {
      uri: photo,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      const response = await fetch('https://api-produtos-9jmi.onrender.com/products', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
        setName('');
        setPrice('');
        setObservation('');
        setCategory('');
        setLocation('');
        setPhoto(null);
        router.push('/home');
      } else {
        const errorData = await response.json();
        Alert.alert('Erro', errorData.message || 'Erro ao cadastrar o produto!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao enviar os dados para a API!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Text style={styles.backButton}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adicionar Produto</Text>
      </View>

      <Text style={styles.label}>Nome *</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nome do produto" />

      <Text style={styles.label}>Preço *</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={handleInputChange}
        keyboardType="numeric"
        placeholder="Digite um valor numérico"
      />

      <Text style={styles.label}>Local *</Text>
      <Picker selectedValue={location} onValueChange={setLocation} style={styles.picker}>
        <Picker.Item label="Selecione um local..." value="" />
        {locations.map((loc) => (
          <Picker.Item key={loc.id} label={loc.nome} value={loc.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Categoria *</Text>
      <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
        <Picker.Item label="Selecione uma categoria..." value="" />
        {categories.map((cat) => (
          <Picker.Item key={cat.id} label={cat.nome} value={cat.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Observação</Text>
      <TextInput style={styles.input} value={observation} onChangeText={setObservation} />

      <Text style={styles.label}>Foto *</Text>
      <View style={styles.photoContainer}>
        {photo ? (
          <>
            <Image source={{ uri: photo }} style={styles.photo} />
            <TouchableOpacity onPress={() => setPhoto(null)} style={styles.removePhotoButton}>
              <Text style={styles.removePhotoText}>Remover</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={pickImage} style={styles.addPhotoButton}>
              <Text style={styles.addPhotoText}>Selecionar da Galeria</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={takePhoto} style={styles.addPhotoButton}>
              <Text style={styles.addPhotoText}>Tirar Foto</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 20 },
  backButton: { fontSize: 16, color: '#007BFF' },
  label: { fontSize: 16, marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  picker: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 10, height: 50 },
  photoContainer: { alignItems: 'center', marginBottom: 20 },
  photo: { width: 100, height: 100, marginBottom: 10 },
  addPhotoButton: { backgroundColor: '#007BFF', padding: 10, borderRadius: 8, marginBottom: 10 },
  addPhotoText: { color: '#fff' },
  removePhotoButton: { backgroundColor: '#FF4444', padding: 10, borderRadius: 8 },
  removePhotoText: { color: '#fff' },
  saveButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 8 },
  saveButtonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
});

export default AddProductScreen;
