import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ProductPage from '../components/ProductPage';

export default function Review2({navigation}) {
  return (
    <ProductPage 
      heading="Cape Cod Salt and Vinegar Chips" 
      description="Sooo good!!" 
      imageLink="https://www.capecodchips.com/wp-content/uploads/2020/05/sea-salt_vinegar-1.jpg" 
      link={undefined}
      navigation={navigation}
    />
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});