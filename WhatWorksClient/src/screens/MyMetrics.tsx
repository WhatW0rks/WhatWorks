import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { database } from '../firebase';
import { onValue, ref } from 'firebase/database';

import DailyProgress from '../components/profile/DailyProgress';
import FancyStats from '../components/profile/FancyStats';
import MonthlyProgress from '../components/profile/MonthlyProgress';


import Analytics from './Analytics';
import { Avatar } from '@rneui/themed';

// Redux
import { selectUsername } from '../userSlice';
import { useAppSelector } from '../hooks';

const db = database;

const dummyData = {
    fancyStats: [
        {
            url: "https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg",
            title: "Flareups",
            value: "2 times"
        },
        {
            url: "https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg",
            title: "Flareups",
            value: "2 times"
        },
        {
            url: "https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg",
            title: "Flareups",
            value: "2 times"
        }
    ],
    monthlyProgress: {
        days: "15/31",
        progress: 0.5
    }
}

// Parent Component
const MyMetrics = ({navigation}) => {
    // fetch plot data on init
    const [plotData, setPlotData] = useState<{ x: string, y: number }[]>([])
    const [fancyStats, setFancyStats] = useState([]);
    
    let username = useAppSelector(selectUsername); 

    // Profile states
    const [metricName, setMetricName] = React.useState("N/A");
    const [metricCondition, setMetricCondition] = React.useState("N/A");
    const [metricYOE, setMetricYOE] = React.useState("N/A");
    const [metricAvatar, setMetricAvatar] = React.useState('https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg');

    const getData = async () => {
        try {
            // Data
            const trendDataRef = ref(db, 'UserTracking/' + "JoeDoe" + '/' + 'check');
            onValue(trendDataRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();

                    if (!data) return;

                    const last7keys = Object.keys(data).slice(-7).sort((a: string, b: string) => Number(a) - Number(b));

                    const data1 = last7keys.map(key => data[key])
                    const sanatizedData = data1.filter((item: any) => {
                        if (item) {
                            const noOfTriggers = item.noOfTriggers
                            const time = item.time

                            return noOfTriggers && time
                        }
                        return false

                    }).map((item: { time: Date, noOfTriggers: number }) => ({
                        x: new Date(item.time).toLocaleDateString('en-US', {

                            weekday: 'short'
                        }), y: Number(item.noOfTriggers)
                    }))
                    setPlotData(sanatizedData);

                    console.log(new Date().getDate())
                    const statData = data1.find((item: any) => new Date(item.time).getDate() === new Date().getDate());
                    if (statData) {
                        console.log(statData)
                        setFancyStats([
                            { title: "Heartburn", value: statData["Heartburn"] },
                            { title: "Medicine", value: statData["Medicine"] },
                            { title: "Flares", value: statData["noOfTriggers"] },
                        ])
                    }
                }

            })

            // Profile Data
            const userIndexReviewsRoute = ref(db, 'Profiles/' + username);
            onValue(userIndexReviewsRoute, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                
                    // Setting values
                    setMetricName(data.displayName);
                    setMetricCondition(data.condition);
                    setMetricYOE(data.yoe);
                    setMetricAvatar(data.profilePhoto);
                }
            });
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <SafeAreaView style={{backgroundColor: "white"}}>
            <ScrollView>
                {/* Profile Header Container */}
                <View style={styles.header}>
                    <View style={{display: "flex", flexDirection: "column"}}>
                        <Avatar size={150} avatarStyle={styles.avatar} source={{uri: metricAvatar}}></Avatar>
                    </View>
                    
                    <View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>
                                {metricName}
                            </Text>
                        </View>

                        <View style={styles.profileInfoContainer}>
                            <View style={styles.profileStateMiniContainer}>
                                <Text style={styles.profileStat}>Condition:</Text>
                                <Text style={styles.Stat}>{metricCondition}</Text>
                            </View>
                            <View style={styles.profileStateMiniContainer}>
                                <Text style={styles.profileStat}>Experience:</Text>
                                <Text style={styles.Stat}>{metricYOE}</Text>
                            </View>
                        </View>

                    </View>
                </View>

                <DailyProgress data={plotData} />

                <View style={styles.fancyStats}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {fancyStats.map((item, index) => <FancyStats
                            key={index}
                            title={item.title}
                            value={item.value} />)}
                    </ScrollView>
                </View>

                <MonthlyProgress days={dummyData.monthlyProgress.days} progress={dummyData.monthlyProgress.progress} />

                <Analytics navigation={navigation} />

            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    fancyStats: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    header: { 
        flexDirection: "row", 
        alignItems: "center", 
    }, 
    avatar: { 
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20
    }, 
    titleContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingTop: 15
    },
    profileInfoContainer: {
        display: "flex",
        flexDirection: "row"
    },
    title: { 
        fontSize: 30, 
        fontWeight: "800", 
        fontFamily: "Futura-Bold"
    }, 
    profileStateMiniContainer: {
        margin: 10
    },
    Stat: {
        fontSize: 10,
        paddingTop: 3,
        fontFamily: "Futura-Medium"
    },
    profileStat: {
        fontSize: 11,
        fontWeight: "700",
        fontFamily: "Futura-Medium"
    },
});

export default MyMetrics
