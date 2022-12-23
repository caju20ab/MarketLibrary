import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase/compat";
import { Button } from 'react-native-paper';
import CustomButton from '../../Components/CustomButton';
import CustomInput from '../../Components/CustomInput';
import { collection, addDoc, getDocs, getFirestore } from "firebase/firestore"; 
import * as ImagePicker from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';




const NotificationScreen = ({navigation, route}) => {
  const db = getFirestore()
  const [user, setUser] = useState({ loggedIn: false });
  const [books, setBooks] = useState ([])
  const [userBooks, setUserBooks] = useState([]);
  const [title, setTitle] = useState ('')
  const [author, setAuthor] = useState ('');
  const [edition, setEdition] = useState ('');
  const [course, setCourse] = useState ('');
  const [releaseDate, setReleaseDate] = useState ('');
  const [isbnNumber, setIsbnNumber] = useState ('');
  const [condition, setCondition] = useState ('');
  const [image, setImage] = useState ('')

  console.log(image)




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
    
    
        if (!firebase.auth().currentUser) {
            return <View><Text>Not found</Text></View>;
        }

        //Fanger Image fra Image.js, så vi kan sætte de i createListing Array

       /*useEffect(() => {
          setImage(route.params.image);
        }, [route.params.image]);*/

        useEffect(() => {
          if (route.params && route.params.image) {
            setImage(route.params.image);
          }
        }, [route.params]);

        const resetImage = () => {
          setImage('')
        }
        
          const createListing = async () => {
            try {
              const docRef = await addDoc(collection(db, "books"), {
                Title: title,
                Author: author,
                Edition: edition,
                Course: course,
                releaseDate: releaseDate,
                isbnNumber: isbnNumber ,
                Condition: condition,
                ListedBy: user.user.email,
                Image: image
              });
              console.log("Document written with ID: ", docRef.id);
          
              // Update the userBooks state with the new book object
              setBooks([...books, {
                Title: title,
                Author: author,
                Edition: edition,
                Course: course,
                releaseDate: releaseDate,
                isbnNumber: isbnNumber ,
                Condition: condition,
                ListedBy: user.user.email,
                id: docRef.id, // add the id field here
              }]);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          };

      
        return (
            <SafeAreaView>

              <ScrollView>
              <View style = {styles.containter}>
                <Text style = {styles.title}>Create a listing</Text>
                <TextInput style = {styles.inputFields}
                  placeholder="Title"
                  value={title} 
                  onChangeText={(title) => setTitle(title)}
                  setValue = {setTitle}
                  secureTextEntry = {false}
                />
                <TextInput style = {styles.inputFields}
                  placeholder="Author"
                  value={author} 
                  onChangeText={(author) => setAuthor(author)}
                  setValue = {setAuthor}
                  secureTextEntry = {false}
                />
                <TextInput style = {styles.inputFields}
                  placeholder="Edition"
                  value={edition} 
                  onChangeText={(edition) => setEdition(edition)}
                  setValue = {setEdition}
                  secureTextEntry = {false}
                />
                <TextInput style = {styles.inputFields}
                  placeholder="Course"
                  value={course} 
                  onChangeText={(course) => setCourse(course)}
                  setValue = {setCourse}
                  secureTextEntry = {false}
                />
                <TextInput style = {styles.inputFields}
                  placeholder="Release date"
                  value={releaseDate} 
                  onChangeText={(releaseDate) => setReleaseDate(releaseDate)}
                  setValue = {setReleaseDate}
                  secureTextEntry = {false}
                />
                 <TextInput style = {styles.inputFields}
                  placeholder="ISBN number"
                  value={isbnNumber} 
                  onChangeText={(isbnNumber) => setIsbnNumber(isbnNumber)}
                  setValue = {setIsbnNumber}
                  secureTextEntry = {false}
                />
                 <TextInput style = {styles.inputFields}
                  placeholder="Condition"
                  value={condition} 
                  onChangeText={(condition) => setCondition(condition)}
                  setValue = {setCondition}
                  secureTextEntry = {false}
                />

                <Button onPress={() => navigation.navigate('PhotoScreen') }> Select Image </Button>

                <Text>Image Selected: {image} </Text>


                <Button onPress={resetImage} style = {styles.CreateButton} title="Reset Image" Text="Reset Image">Reset Image</Button>
                <Button onPress={createListing} style = {styles.CreateButton} title="Create" Text="Create">Create Listing</Button>
              </View>

              </ScrollView>
            </SafeAreaView>
    
        )
    
    }
    

    const styles = StyleSheet.create({
      containter: {
        flex: 1,
        backgroundColor: '#fffacd',
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: {
        color: "#add8e6",
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
      },
      inputFields: {
        backgroundColor: '#e6e6fa',
        width: '80%',
        borderColor: '#add8e6',
        borderWidth: 2,
        borderRadius: 6,
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginVertical: 10,
      },

      CreateButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2,
        paddingHorizontal: 50,
        borderRadius: 2,
        elevation: 3,
        backgroundColor: '#add8e6',
        margin: 5,        
      },
      Text: {
        backgroundColor: 'Black',
      },
    
      
  
   
    });

    export default NotificationScreen