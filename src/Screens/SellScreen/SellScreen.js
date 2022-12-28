import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TextInput, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase/compat";
import { Button } from 'react-native-paper';
import CustomButton from '../../Components/CustomButton';
import CustomInput from '../../Components/CustomInput';
import { collection, addDoc, getDocs, getFirestore } from "firebase/firestore"; 
import * as ImagePicker from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';



const SellScreen = ({navigation, route}) => {
  const db = getFirestore()
  const [user, setUser] = useState({ loggedIn: false });
  const [books, setBooks] = useState ([])
  const [userBooks, setUserBooks] = useState([]);
  const [title, setTitle] = useState ('')
  const [author, setAuthor] = useState ('');
  const [price, setPrice] = useState ('')
  const [edition, setEdition] = useState ('');
  const [course, setCourse] = useState ('');
  const [releaseDate, setReleaseDate] = useState ('');
  const [isbnNumber, setIsbnNumber] = useState ('');
  const [condition, setCondition] = useState ('new');
  const [image, setImage] = useState (null)
  const [showList, setShowList] = useState('');


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


        useEffect(() => {
          if (route.params && route.params.image) {
            setImage(route.params.image);
          }
        }, [route.params]);

        const resetImage = () => {
          setImage('')
        }

        const resetInputFields = () => {
          setTitle("");
          setAuthor("");
          setEdition("");
          setCourse("");
          setReleaseDate("");
          setIsbnNumber("");
          setCondition("new");
          setImage(null);
        };

        //DatePicker options
        const options = [
          { label: 'New', value: 'new' },
          { label: 'Like new', value: 'like new' },
          { label: 'Very good', value: 'very good' },
          { label: 'Good', value: 'good' },
          { label: 'Acceptable', value: 'acceptable' },
        ];

        
          const createListing = async () => {
            if (title === "" || author === "" || edition === "" || course === "" || releaseDate === "" || isbnNumber === "" || condition === "" || image === "") {
              alert("All fields are required!");
              return;
            }
            try {
              const docRef = await addDoc(collection(db, "books"), {
                Title: title,
                Author: author,
                Price: price,
                Edition: edition,
                Course: course,
                releaseDate: releaseDate,
                isbnNumber: isbnNumber ,
                Condition: condition,
                ListedBy: user.user.email,
                Image: image
              });
              resetInputFields()
              alert("New listing created")
              console.log("Document written with ID: ", docRef.id);
          
              // Update the userBooks state with the new book object
              setBooks([...books, {
                Title: title,
                Author: author,
                Price: price,
                Edition: edition,
                Course: course,
                releaseDate: releaseDate,
                isbnNumber: isbnNumber ,
                Condition: condition,
                ListedBy: user.user.email,
                Image: image
              }]);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          };



      
        return (
            <SafeAreaView>

              <ScrollView>
              <View style = {styles.root}>
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
                  placeholder="Price"
                  value={price} 
                  onChangeText={(price) => setPrice(price)}
                  setValue = {setPrice}
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
                <DatePicker
                  style={{width: 200}}
                  date={releaseDate}  // This is the state variable for the release date
                  mode="date"
                  placeholder="Select release date"
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                  }}
                  onDateChange={(date) => {setReleaseDate(date)}}  // This function is called when the user selects a date

                />
                 <TextInput style = {styles.inputFields}
                  placeholder="ISBN number"
                  value={isbnNumber} 
                  onChangeText={(isbnNumber) => setIsbnNumber(isbnNumber)}
                  setValue = {setIsbnNumber}
                  secureTextEntry = {false}
                />

            <TouchableOpacity onPress={() => setShowList(true)}>
                    <Text>{condition}</Text>
                 </TouchableOpacity>

                <Modal visible={showList} animationType="slide" presentationStyle="center">

                <FlatList
                  data={options}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setCondition(item.value);
                        setShowList(false);
                      }}
                      style={{
                        position: "relative", 
                        padding: 60,
                        backgroundColor: item.value === condition ? 'lightgray' : 'white',
                      }}
                    >
                  <Text>{item.label}</Text>
            </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.value}
                />
              </Modal>

                <Button onPress={() => navigation.navigate('PhotoScreen') }> Select Image </Button>
                <Image
                               source={{ uri: image }}
                               style={{
                                 width: 100,
                                 height: 50,
                                 borderRadius: 10,
                                 marginTop: 10,
                               }}
                />


                <Button onPress={resetImage} style = {styles.CreateButton} title="Reset Image" Text="Reset Image">Reset Image</Button>
                <Button onPress={createListing} style = {styles.CreateButton} title="Create" Text="Create">Create Listing</Button>
              </View>

              </ScrollView>
            </SafeAreaView>
    
        )
    
    }
    

    const styles = StyleSheet.create({
      root: {
        flex: 1,
        backgroundColor: '#708090',
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
        borderWidth: 4,
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

    export default SellScreen