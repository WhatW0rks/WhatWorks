import * as React from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Redux
import { initializeDisliked, initializeLiked, selectDisliked, selectLiked, selectUsername, switchUser } from '../userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

// Firebase
import { database } from '../firebase';
import { onValue, ref, query, orderByChild, startAt, endAt, get, Query } from "firebase/database";

// Firebase DB
const db = database;

// UI
import { Image } from '@rneui/themed';

// Victory Charts
import { VictoryArea, VictoryAxis, VictoryBar, VictoryBrushContainer, VictoryChart, VictoryLine, VictoryScatter, VictoryTheme, VictoryZoomContainer } from "victory-native";
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import { useState } from 'react';

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

function range(size:number, startAt:number = 0):ReadonlyArray<number> {
  return [...Array(size).keys()].map(i => i + startAt);
}

   // fetch plot data on init
   

const getScatterData = () => {
  const colors =[
    "violet", "cornflowerblue", "gold", "orange",
    "turquoise", "tomato", "greenyellow"
  ];
  const symbols = [
    "circle", "star", "square", "triangleUp",
    "triangleDown", "diamond", "plus"
  ];
  return range(25).map((index) => {
    const scaledIndex = Math.floor(index % 7);
    return {
      x: Math.floor(Math.random() * 50) + 10,
      y: Math.floor(Math.random() * 100) + 2,
      size: (Math.floor(Math.random() * 8) + 0) + 3,
      symbol: symbols[scaledIndex],
      fill: colors[Math.floor(Math.random() * 6) + 0],
      opacity: 0.6
    };
  });
}

export default function OtherScreen({navigation}) {
    const [reviewData, setReviewData] = React.useState([]);
    const [scatter, setScatter] = React.useState(getScatterData);

    const [plotData, setPlotData] = useState<{ x: string, y: number }[]>([])
   React.useEffect(() => {

       const getData = async () => {

           try {
               const trendDataRef = ref(db, 'UserTracking/' + "JoeDoe" + '/' + 'check/');
               onValue(trendDataRef, (snapshot) => {
                   if (snapshot.exists()) {
                       const data = snapshot.val();

                       const sanatizedData = data.filter((item) => {
                           if (item) {
                               const noOfTriggers = item.noOfTriggers
                               const time = item.time

                               return noOfTriggers && time // undefined && '22 nd May' -> false && ' ' 
                           }

                           return false

                       }).map((item) => ({ x: item.time, y: Number(item.noOfTriggers) }))
                       setPlotData(sanatizedData)
                   }

               })

           } catch (err) {
               console.error(err)
           }

       }

       getData()

   }, [])

    let username = useAppSelector(selectUsername); 

    let element
    React.useEffect(() => {
      // let count = 0;
      // element = setInterval(() => {
      //   count += 1
      //   console.log("Run times!", count);
      //   setScatter(getScatterData);
      // }, 3000);
      return () => {
      };
    }, [username]);



    
    

    return(
        <SafeAreaView style={styles.metricsContainer}>
          <ScrollView>
            <View>

              {/* Line Graph Fun */}
              <VictoryChart width={400} height={300} scale={{ x: "time" }}
                containerComponent={
                <VictoryZoomContainer
                  zoomDimension="x"
                />
                }
              >
                   <VictoryArea
                  interpolation="natural"
                  style={{
                    data: {fill: "#37aca4", stroke: "tomato" }
                  }}
                  // data={[
                  //   { a: new Date(1982, 1, 1), b: 125 },
                  //   { a: new Date(1987, 1, 1), b: 257 },
                  //   { a: new Date(1993, 1, 1), b: 345 },
                  //   { a: new Date(1997, 1, 1), b: 515 },
                  //   { a: new Date(2001, 1, 1), b: 132 },
                  //   { a: new Date(2005, 1, 1), b: 305 },
                  //   { a: new Date(2011, 1, 1), b: 270 },
                  //   { a: new Date(2015, 1, 1), b: 470 }
                  // ]}
                  x="a"
                  y="b"
                  labels={({ data, index }) => index == data.length - 1 ? index : index}
                />

              </VictoryChart>
              
              <VictoryChart
                padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
                width={400} height={100} scale={{ x: "time" }}
                containerComponent={
                  <VictoryBrushContainer
                    brushDimension="x"
                  />
                }
                >
                <VictoryAxis
                  tickFormat={(x) => new Date(x).getFullYear()}
                />
                <VictoryLine
                  style={{
                    data: { stroke: "tomato" }
                  }}
                  data={[
                    { key: new Date(1982, 1, 1), b: 125 },
                    { key: new Date(1987, 1, 1), b: 257 },
                    { key: new Date(1993, 1, 1), b: 345 },
                    { key: new Date(1997, 1, 1), b: 515 },
                    { key: new Date(2001, 1, 1), b: 132 },
                    { key: new Date(2005, 1, 1), b: 305 },
                    { key: new Date(2011, 1, 1), b: 270 },
                    { key: new Date(2015, 1, 1), b: 470 }
                  ]}
                  x="key"
                  y="b"
                />
            </VictoryChart>

              {/* Blocky fun */}
              <VictoryChart animate={{ duration: 2000, easing: "bounce" }}>
                <VictoryScatter
                  data={scatter}
                  style={{
                    data: {
                      fill: ({ datum }) => datum.fill,
                      opacity: ({ datum }) => datum.opacity
                    }
                  }}
                />
              </VictoryChart>
              <Button onPress={() => clearInterval(element)}>Clear Interval</Button>

              <Card mode={'elevated'} elevation={5} style={{width: "90%", marginLeft: 20, borderRadius: 10}}>
                <Card.Title title="Card Title" subtitle="Card Subtitle" />
                <Card.Content>
                  <Title>Card title</Title>
                  <Paragraph>Card content</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
              </Card>
            </View>
          </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({ 
    metricsContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        width: "100%"
    },
    list: {
        width: "100%",
        backgroundColor: 'white',
        flex: 1
    },
    item: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
    // borderColor: 'red', 
    // borderWidth: 1
    },
    exploreContainer: {
        width: "100%",
        flex: 1
    },
});