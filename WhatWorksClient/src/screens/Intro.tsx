import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Flex, Text, Button } from "@react-native-material/core";
import { Image } from '@rneui/themed';

const CONTENT = {
  title: "BUT FIRST ALLOW US TO INTRODUCE OURSELVES",
  imgURL: "https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg",
  subtitle: "It all started in 2020",
  description: "Ashley, the founder of What Works, developed chronic acid reflux. She was 18 years old, a freshman in college, and frustrated since she had never ever heard of the condition and absolutely no idea how to manage her condition",
  buttonText: "LEARN MORE"
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
    backgroundColor: "#70a9a3"
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