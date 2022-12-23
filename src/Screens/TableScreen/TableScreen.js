import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase/compat";
import { FlatList } from 'react-native-gesture-handler';
import { v4 as uuidv4 } from 'uuid';
import 'firebase/firestore';




const TableScreen = ({navigation, route}) => {

  const firestore = firebase.firestore;
  const db = firebase.firestore();

  const [user, setUser] = useState({ loggedIn: false });
  const [books, setBooks] = useState([])


    //Navigation



    //Definere navigation til at bruge min StackNavigator
    
        function onAuthStateChange(callback) {
            return firebase.auth().onAuthStateChanged(user => {
              if (user) {
                callback({loggedIn: true, user: user});
              } else {
                callback({loggedIn: false});
              }
            });
          }
        
          useEffect(() => {
            const unsubscribe = onAuthStateChange(setUser);
            return () => {
              unsubscribe();
            };
          }, []);


          useEffect(() => {
            const listOfBooks = firebase.firestore()
              .collection('books')
              .onSnapshot((querySnapshot) => {
                const documents = [];
                querySnapshot.forEach((doc) => {
                  documents.push({ ...doc.data(), id: doc.id });
                });
                setBooks(documents);
              });
        
            return () => listOfBooks();
          }, []);


      

        return (
              <View style = {styles.container}>
                <View>
                <Text style = {styles.title}>Browse books</Text>
                <FlatList
                    numColumns={2}
                    data={books}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (

                     <TouchableOpacity
                      style={styles.TouchableOpacity}
                      onPress={() => navigation.navigate('BookDetails', { books: item })}
                    >
                       <View style={{ flex: 1, backgroundColor: '#eee', borderRadius: 10 }}>
                          <Text style={styles.UsersDisplayText}>
                            {item.Title} 
                            <Image
                               source={{ uri: item.Image }}
                               style={{
                                 width: 100,
                                 height: 50,
                                 borderRadius: 10,
                                 marginTop: 10,
                               }}
                />
                           </Text>
                        </View>
                    </TouchableOpacity>
  )}
/>
              </View>
              </View>
        )
    }
    
export default TableScreen







const styles = StyleSheet.create({
  container:{
    backgroundColor: '#fffacd',



  },
  title:{
        color: "#add8e6",
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
  },

  TouchableOpacity: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: 'white',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    padding: 20,
    alignItems: 'center',
  },
  UsersDisplayText:{
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 16,
    fontStyle: "black"
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
 










});