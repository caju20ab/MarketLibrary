import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase/compat";
import { FlatList } from 'react-native-gesture-handler';
import { v4 as uuidv4 } from 'uuid';
import 'firebase/firestore';
import TableScreen from '../TableScreen';
import ArchiveScreen from '../ArchiveScreen';


const BookDetailsScreen = ({ route, navigation }) => {
    const { books } = route.params;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{books.Title}</Text>
        <Text style={styles.author}>{books.Author}</Text>

        <Button style = {styles.button} title="Buy" Text="Buy" />
        
        <Text style={styles.condition}>{books.Condition}</Text>
        <Text style={styles.condition}>{books.Course}</Text>
        <Text style={styles.condition}>{books.Edition}</Text>
        <Text style={styles.condition}>{books.isbnNumber}</Text>
        <Text style={styles.condition}>{books.releaseDate}</Text>

      </View>
    );
  };

  const styles = StyleSheet.create({
      container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
    },
    author: {
      fontSize: 18,
      color: 'grey',
      marginBottom: 20,
    },
    image: {
      width: 200,
      height: 300,
      resizeMode: 'contain',
      marginBottom: 20,
    },
    description: {
      fontSize: 16,
      marginBottom: 20,
    }, 
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 2,
      elevation: 3,
      backgroundColor: 'grey',
      margin: 20,
      fontStyle: "Black",
    }
})
  

export default BookDetailsScreen
