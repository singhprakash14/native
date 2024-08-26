// App.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ProductList from './components/ProductList'; // Ensure this path is correct

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ProductList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default App;
