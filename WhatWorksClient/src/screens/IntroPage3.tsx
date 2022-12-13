import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Flex, Text, Button } from "@react-native-material/core";
import { Image } from '@rneui/themed';

// Expo Fonts
import { useFonts } from 'expo-font';
import IntroContext from "../IntroState";
import { useContext } from 'react';

const CONTENT = {
  title: "ALLOW US TO INTRODUCE OURSELVES",
  imgURL: "https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg",
  subtitle: "After a year of personal trial and error. ",
  description: "Ashley soon realized that the best way to find what food and other products worked best was to learn what worked for those also suffering from chronic acid reflux. While many of these conversations took place offline, Ashley realized that there was a need for a dedicated online community",
  buttonText: "SHOW ME WHAT WORKS"
}

export default function Intro({navigation}) {
  const { title, imgURL, subtitle, description, buttonText } = CONTENT;

  let {intro, setIntro} = useContext(IntroContext);

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
        <Button style={styles.button} title={buttonText} onPress={() => {
            setIntro(false);

            // Reset and go to home
            navigation.reset({
              index: 0,
              routes: [{name: 'HomeScreen'}],
            });
          }} />
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
    textAlign: 'center'
  },
  button: {
    backgroundColor: "#70a9a3",
    color: "#fff",
    borderRadius: 20,
    width: "80%"
  }

});