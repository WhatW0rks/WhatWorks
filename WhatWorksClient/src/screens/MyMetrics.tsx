import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";

import { database } from '../firebase';
import { onValue, ref } from 'firebase/database';

import Profile from '../components/profile/Profile';
import DailyProgress from '../components/profile/DailyProgress';
import FancyStats from '../components/profile/FancyStats';
import MonthlyProgress from '../components/profile/MonthlyProgress';
import Analytics from './Analytics';

const db = database;

const dummyData = {
    profile: {
        url: 'https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg',
        name: "John Doe",
        stats: [
            { title: 'Condition', desc: 'Acid Reflex' },
            { title: 'Condition', desc: 'Acid Reflex' }
        ]
    },
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

const MyMetrics = () => {

    // fetch plot data on init
    const [plotData, setPlotData] = useState<{ x: string, y: number }[]>([])
    const [fancyStats, setFancyStats] = useState([]);

    useEffect(() => {

        const getData = async () => {

            try {
                const trendDataRef = ref(db, 'UserTracking/' + "JoeDoe" + '/' + 'check');
                onValue(trendDataRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        console.log("++++++++data", data);

                        if (!data) return;

                        const last7keys = Object.keys(data).slice(-7).sort((a: string, b: string) => Number(a) - Number(b));
                        console.log("++++++last7keys", last7keys);

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
                        console.log("++++++sanatizedData", sanatizedData);
                        setPlotData(sanatizedData);

                        console.log("checking date to print the today stats")
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

            } catch (err) {
                console.error(err)
            }

        }


        getData()

    }, [])

    return (

        <SafeAreaView>
            <ScrollView>
                <Profile url={dummyData.profile.url} name={dummyData.profile.name} stats={dummyData.profile.stats} />

                <DailyProgress data={plotData} />

                <View style={styles.fancyStats}>
                    {fancyStats.map((item, index) => <FancyStats
                        key={index}
                        title={item.title}
                        value={item.value} />)}
                </View>

                <MonthlyProgress days={dummyData.monthlyProgress.days} progress={dummyData.monthlyProgress.progress} />

                <Analytics />

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
});

export default MyMetrics
