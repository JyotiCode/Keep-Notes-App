import { StyleSheet, Text, View,Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../misc/Colors'

const Note = ({ item, onPress }) => {
     const { title, desc } = item;
     return (
       <TouchableOpacity onPress={onPress} style={styles.container}>
         <Text style={styles.title} numberOfLines={2}>
           {title}
         </Text>
         <Text  style={styles.desc} numberOfLines={3}>{desc}</Text>
       </TouchableOpacity>
     );
   };

export default Note
const width = Dimensions.get('window').width - 40;
const styles = StyleSheet.create({
     container: {
          backgroundColor:Colors.PRIMARY,
          width: width / 2 - 10,
          padding: 8,
          borderRadius: 10,
        },
        title: {
          fontWeight: 'bold',
          fontSize: 16,
          color: Colors.LIGHT,
        },
     desc:{
          color:Colors.DARK
     }
})