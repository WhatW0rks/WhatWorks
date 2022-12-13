import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Flex, Text, Button } from "@react-native-material/core";
import { Image } from '@rneui/themed';

// Expo Fonts
import { useFonts } from 'expo-font';


const CONTENT = {
  title: "ALLOW US TO INTRODUCE OURSELVES",
  imgURL: "https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg",
  subtitle: "You know how it goes.",
  description: "A few weeks of flare ups quickly becomes few months. Ashley was in and out of doctor's offices every couple of weeks only to realize that chronic conditions cannot always be cure with the right medication. It's all about daily, long term management.",
  buttonText: "WHAT HAPPENED NEXT?"
}

export default function Intro({navigation}) {
  const { title, imgURL, subtitle, description, buttonText } = CONTENT;

  // Fonts
  const [fontsLoaded] = useFonts({
    'Futura-Light': require('../assets/fonts/futura_light.ttf'),
    'Futura-Medium': require('../assets/fonts/futura_medium.ttf'),
    'Futura-Bold': require('../assets/fonts/futura_bold.ttf'),
  });

  return (
    <Flex fill>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Image
          style={styles.imgHolder}
          source={{ uri: imgURL }}
        />
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.description}>{description}</Text>
        <Button style={styles.button} title={buttonText} onPress={() => navigation.navigate("Intro3")} />
      </View>
    </Flex>

  );
}

const styles = StyleSheet.create({
  outer: {
    flexGrow: 1,
  },
  container: {
    paddingTop: 10,
    paddingBottom: 64,
    paddingHorizontal: 32,

    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    textAlign: 'center',
    fontWeight: "900",
    fontSize: 21,
    fontFamily: "Futura-Bold"
  },
  imgHolder: {
    height: 256,
    width: 256,
    borderRadius: 128,
    backgroundColor: "#70a9a3"
  },
  subtitle: {
    textAlign: 'center',
    fontWeight: "500",
    fontSize: 24,
    fontFamily: "Futura-Bold"

  },
  description: {
    textAlign: 'center',
    marginBottom: 20
  },
  button: {
    backgroundColor: "#70a9a3",
    color: "#fff",
    borderRadius: 20,
    width: "80%"
  }

});