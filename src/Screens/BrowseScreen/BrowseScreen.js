import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase/compat";
import { FlatList } from 'react-native-gesture-handler';
import { v4 as uuidv4 } from 'uuid';
import 'firebase/firestore';
import { TextInput } from 'react-native-paper';
import SearchFilter, {createFilter} from 'react-native-search-filter';
import { Ionicons } from '@expo/vector-icons';






const BrowseScreen = ({navigation, route}) => {

  //Opretter variabler til firebase.firestore

  const firestore = firebase.firestore;
  const db = firebase.firestore();


//opretter de forskellige states
  const [user, setUser] = useState({ loggedIn: false });
  const [books, setBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState('');

    
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


          //Henter og holder øje med de opdatering der sker i books collection som er i databasen
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



          //Anvender den importerede Search-Filter pakke. Hvis at der bruges et SearchFilter skal filteredBooks kun indeholde disse resultater
          //ellers skal filteredBooks bare indeholde alle bøgerne som er oprettet. 
          const filteredBooks = searchTerm ? books.filter(createFilter(searchTerm, ['Title', 'Author', 'Courses'])) : books;


          //Ændre staten af SearchTerm når brugeren ændrer i inputfeltet
          const searchUpdated = (term) => {
            setSearchTerm(term)
          }


        return (
        <View style = {styles.root}>
            <View>
              <View style= {styles.containers}>
              <Ionicons name="search" size={20} color="grey" style={styles.icon}/>
                <TextInput
                  style={styles.searchBar}
                  onChangeText={searchUpdated} 
                  value={searchTerm}
                  placeholder="Search for a title, author or course"
                />
              </View>

              <FlatList
                numColumns={2}
                data={filteredBooks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.TouchableOpacity}
                    onPress={() => navigation.navigate('BookDetails', { books: item })}
                  >
                    <View style={styles.bookContainer}>
                      <Image
                        source={{ uri: item.Image }}
                        style={styles.bookCover}
                      />
                      <Text style={styles.bookTitle}>{item.Title}</Text>
                      <Text style={styles.bookPrice}>{item.Price}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />

              </View>
              </View>
        )
    }
    

const styles = StyleSheet.create({
  root:{
    backgroundColor: '#708090',
  },
  icon: {
    padding: 10,
    margin: 5,   
  }, 
  containers: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6e6fa',
    borderWidth: .5,
    borderColor: "#add8e6",
    height: 50,
    borderRadius: 5,
    margin: 7
  },
  searchBar: {
    width: '70%',
    height: 50.5,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginVertical: 10,
    flex: 1,
    backgroundColor: "#e6e6fa"
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
  },
  bookContainer: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookCover: {
    width: 167,
    height: 150,
    borderRadius: 2,
  },
  bookTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  bookPrice: {
    fontSize: 13,
    marginTop: 10,
    textAlign: 'center',
  },











});

export default BrowseScreen
