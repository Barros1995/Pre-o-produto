import React from 'react';
import { View, Text, Image, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';


const HomeScreen = ({ navigation }) => {
    const router = useRouter();
 
  const products = [
    {
      id: '1',
      name: 'Abacate Paulista',
      location: 'Mercale - Avenida Ceará',
      seller: 'Alan123',
      price: '8,99',
      
    },
   
  ];

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.productDetails}>
          <Icon name="location-outline" size={16} color="#555" />
          <Text style={styles.productLocation}>{item.location}</Text>
        </View>
        <View style={styles.productDetails}>
          <Icon name="person-outline" size={16} color="#555" />
          <Text style={styles.productSeller}>{item.seller}</Text>
        </View>
        <Text style={styles.productPrice}>R$ {item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Pesquisar produto"
          style={styles.searchInput}
        />
        <Icon name="search-outline" size={20} color="#555" style={styles.searchIcon} />
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productList}
      />

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
  productDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  productLocation: {
    marginLeft: 4,
    fontSize: 14,
    color: '#555',
  },
  productSeller: {
    marginLeft: 4,
    fontSize: 14,
    color: '#555',
  },
  productPrice: {
    fontSize: 20,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 4,
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
