import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
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
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = (retryCount: number = 3) => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(json => {
        setProducts(json.slice(0, 20));
        setLoading(false);
      })
      .catch(error => {
        if (retryCount > 0) {
          console.log(`Retrying... (${3 - retryCount + 1})`);
          setTimeout(() => fetchProducts(retryCount - 1), 3000);
        } else {
          console.error('Error fetching products:', error);
          setError('Unable to load products. Please try again later.');
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (productTitle: string) => {
    Alert.alert('Product added to cart', `The product "${productTitle}" has been added to your cart.`);
  };

  if (loading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <View style={styles.productWrapper}>
            <View style={styles.productContainer}>
              <Image source={{ uri: item.images[0] }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{truncateTitle(item.title, 5)}</Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item.title)}>
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  error: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productWrapper: {
    width: itemWidth,
    marginBottom: 20,
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
    height: 260,
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
    fontWeight: '600',
  },
});

export default ProductList;
