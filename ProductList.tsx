// ProductList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const { width } = Dimensions.get('window');
const itemWidth = (width / 2) - 20;

const truncateTitle = (title: string, maxWords: number) => {
  const words = title.split(' ');
  if (words.length > maxWords) {
    return `${words.slice(0, maxWords).join(' ')}...`;
  }
  return title;
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={({ item }) => (
        <View style={styles.productWrapper}>
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{truncateTitle(item.title, 5)}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={() => alert('Product added to cart')}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  loading: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productWrapper: {
    width: itemWidth,
    marginBottom: 20, // Adjust space between product and button
  },
  productContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 260, // Adjusted height to fit without description
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333',
  },
  productPrice: {
    fontSize: 14,
    color: '#007BFF',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
});

export default ProductList;
