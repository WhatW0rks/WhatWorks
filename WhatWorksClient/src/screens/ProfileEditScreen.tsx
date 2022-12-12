import * as React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Profile Picker
import * as ImagePicker from 'expo-image-picker';

// React Native Paper
import { Button } from 'react-native-paper';

// UI Elements
import { Avatar } from '@rneui/themed';

// UI Icons
import Ionicons from '@expo/vector-icons/Ionicons';

// Lottie
import Lottie from 'lottie-react-native';

// UI Kitten
import {Input} from '@ui-kitten/components';

export default function LoadingScreen({navigation}) {

    return(
        <SafeAreaView style={styles.Container} edges={['left']}>
            <ScrollView style={{width: "100%"}}>
                <View style={{display:"flex", alignItems: "center", borderBottomColor: "#d3d3d3", borderBottomWidth: 0.2}}>
                    <Image style={{height: 150, width: 300, opacity: 0.6, marginTop: -10}} source={require('../assets/WhatWorksLogo.png')}></Image>
                </View>

                <Pressable style={{position: 'absolute', borderRadius: 100, height: 100, width: 100, left: 5, top: "15%", zIndex: 10}} onPress={() => console.log("Pressed!")}>
                    <Avatar size={300} containerStyle={{position: 'absolute', borderRadius: 100, height: 100, width: 100, left: 5, top: "20%", zIndex: 10}} rounded source={{uri:'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg'}}></Avatar>
                    <Ionicons style={{zIndex: 50, left: 70, top: 90, color: "#e3e3e3"}} name="add-circle" size={30} />
                </Pressable>
                   <View style={{marginTop: 50, width: "100%", flex: 1, alignItems: "center"}}>
                        <View>
                            <Text style={{fontSize: 17, fontWeight: "bold"}}>Display Name</Text>
                        </View>
                        <View style={{width: "90%"}}>
                            <Input
                                size='large'
                                placeholder='What would you like to be called by?'
                                />
                        </View> 
                        <View>
                            <Text style={{fontSize: 17, fontWeight: "bold"}}>Biography</Text>
                        </View>
                        <View style={{width: "90%"}}>
                            <Input
                            multiline={true}
                            textStyle={{ minHeight: 64 }}
                            placeholder='Tell us your story!'
                            />
                        </View>
                        <View style={{width: "95%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent:"center"}}>
                            <View style={{display: "flex", width: "50%", alignContent: "center", justifyContent: "center"}}>
                                <Text style={{fontSize: 15, fontWeight: "bold"}}>Condition</Text>
                                <Input
                                multiline={true}
                                textStyle={{ minHeight: 30 }}
                                placeholder='Tell us your story!'
                                />
                            </View>
                            <View>
                                <Text style={{fontSize: 15, fontWeight: "bold"}}>Years of Experience</Text>
                                <Input
                                multiline={true}
                                textStyle={{ minHeight: 30 }}
                                placeholder='Tell us your story!'
                                />
                            </View>
                        </View>
                    </View>     
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({ 
    Container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    avatar: { 
        margin: 20, 
    }, 
});