import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, StatusBar } from 'react-native';

// React Native UI Elements Import
import { Avatar } from '@rneui/themed';
import { Image } from '@rneui/themed';
import { Icon } from '@rneui/themed';
// import { Chip } from '@rneui/themed';

interface ProductProperties { 
    heading: string; 
    user: string;
    link: string | undefined;
    imageLink:string; 
    description: string; 
    navigation: any;
}

export default function UserProductReviewPage(props: ProductProperties) {
    const src = {uri: props.imageLink}; 
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Header Container */}
                <View style={styles.usercontainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>{props.heading}</Text>
                        <View style={{flex: 1}}></View>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>3</Text>
                        <Icon name="star" style={{marginRight: 10}} color={"#FDDA0D"} />
                    </View>
                    <View style={styles.usertagline}>
                        <Avatar size={32} rounded source={{uri: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg'}}/>
                        <Text style={styles.profilename}>{props.user}</Text>
                        <View style={{flex: 1}}></View>
                        <Icon name="menu" style={styles.leftIcons}/>
                    </View>
                </View>

                {/* Image Container */}
                <Image style={styles.image}source={src}/>

                {/* Gamification */}
                <View style={styles.gamificationContainer}>
                    {/* Left Side */}
                    <Icon name="favorite" size={27} style={styles.leftIcons} />
                    <Icon name="forum" size={27} style={styles.leftIcons} />
                    <Icon name="send" size={27} style={styles.leftIcons} />

                    <View style={{flex: 1}}></View>

                    {/* Right Side */}
                    <Icon name="bookmark" size={27} style={styles.leftIcons} />
                </View>

                {/* Tags */}
                {/* <ScrollView>
                <View style={styles.tagContainer}>
                        <Chip title="Solid Chip" style={{marginLeft: 5, marginRight: 5}}/>
                        <Chip title="Solid Chip" style={{marginLeft: 5, marginRight: 5}}/>
                        <Chip title="Solid Chip" style={{marginLeft: 5, marginRight: 5}}/>
                        <Chip title="Solid Chip" style={{marginLeft: 5, marginRight: 5}}/>
                        <Chip title="Solid Chip" style={{marginLeft: 5, marginRight: 5}}/>
                        <Chip title="Solid Chip" style={{marginLeft: 5, marginRight: 5}}/>
                </View>
                </ScrollView> */}
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>
                        {props.description}
                    </Text>
                </View>
                <View style={styles.commentContainer}>
                    <Text style={{color: "#808080"}}>View 1000 Comments</Text>
                </View>
                <View style={{marginBottom: 10, marginTop:10}}></View>
                <Button title="Go to Home" onPress={() => props.navigation.navigate('MainScreen')} />
                <Button title="Go back" onPress={() => props.navigation.goBack()} />
            </ScrollView>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    container: {
      paddingTop: StatusBar.currentHeight,
      backgroundColor: "white",
      flex: 1
    },
    usercontainer: {
    },
    usertagline: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 5,
        marginTop: 10,
        marginBottom: 20,
        paddingBottom: 5,
        paddingTop: 5,
        borderBottomWidth: 0.2,
        // borderTopWidth: 0.2,
        borderColor: "#A9A9A9"
    },
    headerContainer: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center'
    },
    heading: {
      fontSize: 30,
      marginLeft: 5,
      fontWeight: "bold",
      color: "black",
    },
    profilename: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold",
        marginLeft: 10
    },
    leftIcons: {
        marginRight: 10,
        color: "black",
    },
    image: {
        width: "100%",
        height: 400,
      },
    gamificationContainer: {
        display: "flex",
        marginTop: 10,
        paddingTop: 5,
        flexDirection: "row",
        borderTopWidth: 0.2,
        borderColor: "#d3d3d3",
        marginLeft: 5,
    },
    tagContainer: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 5
    },
    descriptionContainer: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    description: {
        fontSize:14, 
    },
    commentContainer: {
        marginLeft: 10,
        marginTop: 20
    },
  });

