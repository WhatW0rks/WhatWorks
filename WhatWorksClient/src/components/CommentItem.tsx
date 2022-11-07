import { Avatar } from '@rneui/base';
import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Button, Pressable, Alert, TextInput } from 'react-native';

interface CommentItemProps {
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

const CommentItem = (props: CommentItemProps) => {
    const comment = props.comment
    const [ispressed, setIspressed] = useState(false);
    const [myComment, setMyComment] = useState(""); 
    
  return (
    <View style={styles.container}> 
        <View style={styles.commentHeader}>
            <Avatar size={24} rounded source={{uri: comment.uri}}/>
            <Text style={styles.profilename}>{comment.username}</Text>
            <Text style={{color: "gray"}}> {comment.createdAt.toString()} </Text>
        </View>
        <View style={styles.commentDescription}>
        <Text>
            {comment.body}  
        </Text>
        </View>
        <Pressable
        style={styles.button}
        onPress={() => setIspressed(true)}>
        <Text style={styles.text}>reply</Text>
      </Pressable>
        {ispressed===true && <View><TextInput style={styles.input} onChangeText={setMyComment} value={myComment} placeholder='enter reply'/>
         <Button
            onPress={() => {
                props.addComment(myComment);
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

    
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  
    container: {
        marginBottom:16
    },
    commentHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
}, 
commentDescription: {
    marginBottom: 10,
    marginLeft: 35
},
profilename: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    marginLeft: 10
},
button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'green',
    maxWidth: 96,
  },
  text: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black'
  },
  input: {
      height: 40,
      margin: 8,
      borderWidth: 1,
      padding: 10,
      marginLeft: 16,
    }
});


