import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase/compat";
import { Button } from 'react-native-paper';
import CustomButton from '../../Components/CustomButton';
import CustomInput from '../../Components/CustomInput';
import { collection, addDoc, getDocs, getFirestore } from "firebase/firestore"; 
import * as ImagePicker from 'react-native-image-picker';




const NotificationScreen = () => {
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

        const selectImage = () => {
          const options = {
            title: 'Select Picture',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          }}

        
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
              <View>
                <Text>Create a listing</Text>
                <CustomInput
                  placeholder="Title"
                  value={title} 
                  onChangeText={(title) => setTitle(title)}
                  setValue = {setTitle}
                  secureTextEntry = {false}
                />
                <CustomInput
                  placeholder="Author"
                  value={author} 
                  onChangeText={(author) => setAuthor(author)}
                  setValue = {setAuthor}
                  secureTextEntry = {false}
                />
                <CustomInput
                  placeholder="Edition"
                  value={edition} 
                  onChangeText={(edition) => setEdition(edition)}
                  setValue = {setEdition}
                  secureTextEntry = {false}
                />
                <CustomInput
                  placeholder="Course"
                  value={course} 
                  onChangeText={(course) => setCourse(course)}
                  setValue = {setCourse}
                  secureTextEntry = {false}
                />
                <CustomInput
                  placeholder="Release date"
                  value={releaseDate} 
                  onChangeText={(releaseDate) => setReleaseDate(releaseDate)}
                  setValue = {setReleaseDate}
                  secureTextEntry = {false}
                />
                 <CustomInput
                  placeholder="ISBN number"
                  value={isbnNumber} 
                  onChangeText={(isbnNumber) => setIsbnNumber(isbnNumber)}
                  setValue = {setIsbnNumber}
                  secureTextEntry = {false}
                />
                 <CustomInput
                  placeholder="Condition"
                  value={condition} 
                  onChangeText={(condition) => setCondition(condition)}
                  setValue = {setCondition}
                  secureTextEntry = {false}
                />

                <Button onPress={() => selectImage()}> Select Image </Button>

                <Button onPress={createListing} style = {styles.CreateButton} title="Create" Text="Create" />
                {image && <Image source={{uri: image}} style={{width: 200, height: 200}} />}
              </View>

    
          
            </SafeAreaView>
    
        )
    
    }
    

    const styles = StyleSheet.create({
      CreateButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 2,
        elevation: 3,
        backgroundColor: 'grey',
        margin: 20,
        fontStyle: "Black",
        
      },
    
      
  
   
    });

    export default NotificationScreen