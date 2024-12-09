import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import useStore from '../store/useStore';

const HomeScreen = () => {
  const router = useRouter();
  const { products, setProducts } = useStore();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

 
  const loadProducts = async () => {
    const url = "https://api-produtos-9jmi.onrender.com/products";
    try {
      setLoading(true);
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProducts(data); 
      } else {
        alert('Erro ao buscar produtos');
      }
    } catch (error) {
      alert('Erro ao carregar os produtos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Chama a função para carregar os produtos assim que o componente for montado
  useEffect(() => {
    loadProducts();
  }, []);

  
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  
  const filterProducts = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = products.filter((product) =>
        product.nome.toLowerCase().includes(query.toLowerCase()) ||
        product.descricao?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  
  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image
        source={{ uri:`htpps://api-produtos-9jmi.onrender.com/products/${item.image}`}} style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
      <Text style={styles.productName}>{item.nome}</Text>
      <Text style={styles.productLocation}>
        <Icon name="location-outline" size={14} color="#555" />
        {' '}{item.Location?.nome || 'Local não especificado'}
      </Text>
      <Text style={styles.productPrice}>R$ {item.preco}</Text>
    </View>
  </View>
);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar produto"
          value={searchQuery}
          onChangeText={filterProducts} 
        />
        <Icon name="search-outline" size={20} color="#999" style={styles.searchIcon} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.productList}
          ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhum produto encontrado.</Text>}
        />
      )}

      <View style={styles.footer}>
        <Icon name="home-outline" size={30} color="#4CAF50" onPress={() => router.push('/home')} />
        <Icon name="grid-outline" size={30} color="#4CAF50" onPress={() => router.push('/adicionar')} />
        <Icon name="list-outline" size={30} color="#4CAF50" onPress={() => router.push('/categoria')} />
        <Icon name="location-outline" size={30} color="#4CAF50" onPress={() => router.push('/local')} />
        <Icon name="person-outline" size={30} color="#4CAF50" onPress={() => router.push('/perfil')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  searchIcon: {
    paddingHorizontal: 5,
  },
  productList: {
    paddingHorizontal: 16,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productLocation: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 20,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 4,
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 20,
    fontSize: 16,
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

export default HomeScreen;
