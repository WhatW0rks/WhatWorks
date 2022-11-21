import * as React from 'react';
import { StyleSheet, Text, Image, Button, SafeAreaView, TextInput, View, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';


import { useState } from 'react';
import { createComment, getComments } from '../comments/api';
import CommentPreview from './CommentPreview';
import CommentItem from './CommentItem';




interface CommentPageProps {
    comment : { 
        id: string,
        body: string,
        username: string,
        userId: string,
        parentId: string | null,
        createdAt: string,
        uri:string
    },
    addComment: (value: string)=> void
    
}



export default function CommentsPage(props: CommentPageProps) {

    const comment = props.comment
    const [myComment, setMyComment] = useState("");
    const [ispressed, setIspressed] = useState(false);
    const [comments, setComments] = useState(getComments());

    
    const addComment = (value: string)=>{
        setComments(prev => [...prev, createComment(value)])
        setMyComment("")
    }
    return (
        <SafeAreaView>
            <Text style={styles.heading}>
                Comments: 
            </Text>
            <View style={styles.commentContainer}>
                {/* Comment */}
                {comments.map((comment, index) => <CommentItem comment={comment} addComment={addComment} key={index}/>) }
                </View>
                <View>
                <Pressable
        style={styles.button}
        onPress={() => setIspressed(true)}>
        <Text style={styles.text}>reply</Text>
      </Pressable>
        {ispressed===true && <View><TextInput style={styles.input} onChangeText={setMyComment} value={myComment} placeholder='enter reply'/>
         <Button
            onPress={() => {
                addComment(myComment);
                setIspressed(false);
                setMyComment("")
            }
        }
            title="Submit"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            /> 
            </View>}
            </View>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: 'gray',
        maxWidth: 96,
      },
    image: { 
        height: 200, 
        width: 200, 
        padding: 10, 
        left: 50
    }, 
    heading: {
        fontSize: 30,
        marginLeft: 5,
        fontWeight: "bold",
        color: "black",
        paddingBottom: 5, 
        paddingTop: 5,
    },
    heading2: { 
        fontSize: 18, 
        marginLeft: 5, 
        fontWeight: "bold", 
        color: "#42b0f5"
    },    commentContainer: {
        marginLeft: 10,
        marginTop: 20
    },text: {
        fontSize: 10,
        lineHeight: 16,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black'
      }
   
  });
  