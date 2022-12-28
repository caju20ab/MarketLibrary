import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase/compat";
import { FlatList } from 'react-native-gesture-handler';
import 'firebase/firestore';




const MyListingsScreen = () => {


  const firestore = firebase.firestore;
  const db = firebase.firestore();
  
  const [user, setUser] = useState({ loggedIn: false });
  const [userBooks, setUserBooks] = useState([])



    //Definere navigation til at bruge min StackNavigator
        const navigation = useNavigation ();
    
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
    
    
        if (!firebase.auth().currentUser) {
            return <View><Text>Not found</Text></View>;
        }

  // Use the useEffect hook to retrieve the user's data when the component mounts
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Get the user's email address from the currentUser object
        const userEmail = user.email;
        console.log(userEmail);
  
        // Use the user's email address to retrieve the user's data from the Firestore database
        firebase
          .firestore()
          .collection("books")
          .where("ListedBy", "==", userEmail)
          .get()
          .then(querySnapshot => {
            // Create an array to store the data for the books
            const books = [];
  
            querySnapshot.forEach(doc => {
              // Add each book's data to the array
              books.push(doc.data());
            });
  
            // Set the userBooks state with the array of books
            setUserBooks(books);
          })
          .catch(error => {
            console.log("Error getting documents:", error);
          });
      }
    });
  
    // Unsubscribe from the auth state change event when the component unmounts
    return () => unsubscribe();
  }, []); // An empty array means that the useEffect hook will only be called when the component mounts



    
        return (
            <View>


                <FlatList
                    numColumns={2}
                    data={userBooks}
                    keyExtractor={(item, index) => index.toString()} // Use the id field as the unique key for each item
                    renderItem={({ item }) => (

                     <TouchableOpacity
                      style={{ flex: 1, margin: 10 }}
                      onPress={() => navigation.navigate('BookDetails', { books: item })}
                    >
                       <View style={{ flex: 1, backgroundColor: '#eee', borderRadius: 10 }}>
                          <Text style={styles.UsersDisplayText}>
                            {item.Title} <Text> made by </Text>{item.Author}
                           </Text>
                        </View>
                    </TouchableOpacity>
  )}
/>
    
          
            </View>
    
        )
    
    }
    
    const styles = StyleSheet.create({

      UsersDisplayText:{
        textAlign: 'center',
        marginVertical: 8,
        fontSize: 16,
        fontStyle: "black"
      },


    })
    
    export default MyListingsScreen