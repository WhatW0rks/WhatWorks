import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Flex, Text, Button } from "@react-native-material/core";
import { Image } from '@rneui/themed';

const CONTENT = {
  title: "BUT FIRST ALLOW US TO INTRODUCE OURSELVES",
  imgURL: "https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg",
  subtitle: "You know how it goes",
  description: "A few weeks of flare ups quickly becomes few months. Ashley was in and out of doctor's offices every couple of weeks only to realize that chronic conditions cannot always be cure with the right medication. It's all about daily, long term management.",
  buttonText: "WHAT HAPPENED NEXT"
}

type Props = {
  onButtonClick: () => {}
}

export default function Intro({ onButtonClick }: Props) {
  const { title, imgURL, subtitle, description, buttonText } = CONTENT;


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
        <Button style={styles.button} title={buttonText} onPress={onButtonClick} />
      </View>
    </Flex>

  );
}

const styles = StyleSheet.create({
  outer: {
    flexGrow: 1,
  },
  container: {
    paddingTop: 72,
    paddingBottom: 64,
    paddingHorizontal: 32,

    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    textAlign: 'center',
    fontWeight: "700",
    fontSize: 32
  },
  imgHolder: {
    height: 256,
    width: 256,
    borderRadius: 128,
    //backgroundColor: "#ccc"
  },
  subtitle: {
    textAlign: 'center',
    fontWeight: "500",
    fontSize: 24

  },
  description: {
    textAlign: 'center'
  },
  button: {
    backgroundColor: "#70a9a3",
    color: "#fff"
  }

});