// Cart.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

interface CartItem {
  id: number;
  title: string;
  price: number;
}

interface CartProps {
  cartItems: CartItem[];
  onRemoveFromCart: (id: number) => void;
  onPay: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onRemoveFromCart, onPay }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <View style={styles.cartContainer}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItemContainer}>
            <Text style={styles.cartItemTitle}>{item.title}</Text>
            <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => onRemoveFromCart(item.id)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
      <Button title="Pay" onPress={onPay} />
    </View>
  );
};

const styles = StyleSheet.create({
  cartContainer: {
    flex: 1,
    padding: 20,
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  cartItemTitle: {
    fontSize: 16,
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#007BFF',
  },
  removeButton: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 4,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});

export default Cart;
