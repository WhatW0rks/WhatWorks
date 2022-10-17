import { StyleSheet, Text, View, Image, Button } from 'react-native';

interface ProductProperties { 
    heading: string; 
    link: string | undefined;
    imageLink:string; 
    description: string; 
    navigation: any;
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    image: {
      width: 50,
      height: 50,
    },
    heading: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#5566BB",
    },
    description: {
        fontSize:14, 
    }
  });

export default function ProductPage(props: ProductProperties) {
    const src = {uri: props.imageLink}; 
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                {props.heading}
            </Text>
            <Image style={styles.image}source={src}/>
            <Text style={styles.description}>
                {props.description}
            </Text>
            <View style={{marginBottom: 10, marginTop:150}}></View>
      <Button title="Go to Home" onPress={() => props.navigation.navigate('MainScreen')} />
      <Button title="Go back" onPress={() => props.navigation.goBack()} />
        </View>
    ); 
}