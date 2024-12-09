import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,SafeAreaView,ScrollView,Alert,ActivityIndicator,}
from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const AdicionarLocal = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
  });
  const [loading, setLoading] = useState(false);

  // Atualiza os dados do formulário
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Função para adicionar um local
  const handleSave = async () => {
    if (!formData.nome.trim() || !formData.cep.trim()) {
      Alert.alert('Erro', 'Os campos Nome e CEP são obrigatórios.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://api-produtos-9jmi.onrender.com/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Sucesso', 'Local adicionado com sucesso!');
        setFormData({
          nome: '',
          cep: '',
          logradouro: '',
          numero: '',
          bairro: '',
          cidade: '',
          estado: '',
        });
        router.push('/local');
      } else {
        const errorData = await response.json();
        Alert.alert('Erro', errorData.message || 'Erro ao adicionar o local.');
      }
    } catch (error) {
      console.error('Erro ao adicionar local:', error);
      Alert.alert('Erro', 'Ocorreu um erro de rede. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Adicionar Local</Text>

        {/* Campos do formulário */}
        {[
          { label: 'Nome *', field: 'nome' },
          { label: 'CEP *', field: 'cep', keyboardType: 'numeric' },
          { label: 'Logradouro', field: 'logradouro' },
          { label: 'Nº', field: 'numero', keyboardType: 'numeric' },
          { label: 'Bairro', field: 'bairro' },
          { label: 'Cidade', field: 'cidade' },
          { label: 'Estado', field: 'estado' },
        ].map(({ label, field, keyboardType }) => (
          <View key={field} style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              style={styles.input}
              placeholder={label}
              value={formData[field]}
              onChangeText={(value) => handleInputChange(field, value)}
              keyboardType={keyboardType || 'default'}
            />
          </View>
        ))}

        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Footer */}
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
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

export default AdicionarLocal;
