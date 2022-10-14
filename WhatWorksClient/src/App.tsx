import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ProductPage from './ProductPage';

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <ProductPage 
      heading="Cape Cod Salt and Vinegar Chips" 
      description="Sooo good!!" 
      imageLink="https://www.capecodchips.com/wp-content/uploads/2020/05/sea-salt_vinegar-1.jpg" 
      link={undefined}
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
