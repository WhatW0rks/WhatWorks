import React, { useState } from 'react'
import { View, Text, StyleSheet } from "react-native";

import { database } from '../../firebase';
import { onValue, ref, set } from 'firebase/database';

import { VictoryTheme, VictoryChart, VictoryArea } from "victory-native";

import { IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { Dialog, Portal, TextInput, Button } from 'react-native-paper';

import DateView from './DateView';

type Props = {
    data: { x: string, y: number }[];
}

const randomIntFromInterval = (min: number, max: number) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const DailyProgress = ({ data }: Props) => {
    const [visible, setVisible] = useState(false);
    const [dialogData, setDialogData] = useState({
        Heartburn: "",
        Medicine: "",
        flareUps: "",
        noOfTriggers: "",
        time: new Date().toISOString()
    })

    const hideDialog = () => setVisible(false);

    const showDialog = () => setVisible(true);




    const submitDialog = () => {
        console.log("submit dialog entered")
        console.log(dialogData);

        try {
            console.log("submit dialog entered0")
            const randomReviewID = new Date(dialogData.time).getDate();

            console.log("submit dialog entered1")
            const dataRef = set(ref(database, "/UserTracking/JoeDoe/check/" + randomReviewID), dialogData);
            console.log("submit dialog entered2")
            // onValue(dataRef, (snapshot) => {
            //     if (snapshot.exists()) {
            //         const data = snapshot.val();
            //         console.log(data)
            //         // hideDialog();
            //         // // submit data
            //         // console.log(dialogData);
            //     }
            // });

            hideDialog();
            console.log("submit dialog exit")
        } catch (err) {
            console.error(err)
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Daily Progress</Text>
                <IconButton icon={props => <Icon name="plus-circle" {...props} color="#70a9a3" onPress={showDialog} />} />

            </View>

            <View style={styles.subContainer}>
                <DateView />
                <VictoryChart theme={VictoryTheme.material} width={320} height={200}>

                    <VictoryArea

                        style={{ data: { fill: "#37aca4", stroke: "tomato" } }}
                        data={data}
                        interpolation="natural"
                        labels={({ data, index }) => {
                            return data[index].y
                        }
                        }

                    />
                </VictoryChart>
            </View>

            {/* take inputs from user */}
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Activity recorder</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            style={styles.m16}
                            label="Heartburn"
                            value={dialogData.Heartburn}
                            onChangeText={text => setDialogData(prev => ({ ...prev, Heartburn: text }))}
                        />
                        <TextInput
                            style={styles.m16}
                            label="Medicine"
                            value={dialogData.Medicine}
                            onChangeText={text => setDialogData(prev => ({ ...prev, Medicine: text }))}
                        />
                        <TextInput
                            style={styles.m16}
                            label="FlareUps"
                            value={dialogData.flareUps}
                            onChangeText={text => setDialogData(prev => ({ ...prev, flareUps: text }))}
                        />
                        <TextInput
                            style={styles.m16}
                            label="No of Triggers"
                            value={dialogData.noOfTriggers}
                            onChangeText={text => setDialogData(prev => ({ ...prev, noOfTriggers: text }))}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>CANCEL</Button>
                        <Button onPress={submitDialog}>SUBMIT</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        padding: 16,

    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold"
    },
    subContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    button: {
        color: "#70a9a3"
    },
    m16: {
        marginBottom: 16
    }
});

export default DailyProgress


