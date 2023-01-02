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
import { Ionicons } from '@expo/vector-icons';
import { color } from 'react-native-reanimated';





const SellScreen = ({navigation, route}) => {

//Opretter database variabel, som kaldes længere ned i kode
  const db = getFirestore()

  //Opretter de forskellige useStates til LogIn og Inputfelter 
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
  const [condition, setCondition] = useState ('New');
  const [image, setImage] = useState (null)
  const [showList, setShowList] = useState('');

    
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

 //useEffect hook som køre hver gang skærmen render. Hvis der er blevet valgt et billede, skal dette være Image nuværende state
        useEffect(() => {
          if (route.params && route.params.image) {
            setImage(route.params.image);
          }
        }, [route.params]);

//Bruges til at lave en funktion til en knap, således brugeren kan vælge et nyt billede hvis det ønskes
        const resetImage = () => {
          setImage('')
        }

//Funktion der nulstiller states til alle inputfelter. Køres når en annonce er oprettet.
        const resetInputFields = () => {
          setTitle("");
          setAuthor("");
          setEdition("");
          setCourse("");
          setReleaseDate("");
          setIsbnNumber("");
          setCondition("New");
          setImage(null);
        };

//Condition options opstilles
        const options = [
          { label: 'New', value: 'New' },
          { label: 'Like new', value: 'Like new' },
          { label: 'Very good', value: 'Very good' },
          { label: 'Good', value: 'Good' },
          { label: 'Acceptable', value: 'Acceptable' },
        ];

//Funktionen til at oprette en annonce i firestore databasen
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

                <View style = {styles.containers}>
                <Ionicons name="text-outline" size={20} color="grey" style={styles.icon}/>
                <TextInput style = {styles.inputFields}
                  placeholder="Title: e.g. 'The Lean Startup'"
                  value={title} 
                  onChangeText={(title) => setTitle(title)}
                  setValue = {setTitle}
                  secureTextEntry = {false}
                />
                </View>

                <View style = {styles.containers}>
                <Ionicons name="ios-person" size={20} color="grey" style={styles.icon}/>
                <TextInput style = {styles.inputFields}
                  placeholder="Author: e.g. 'Eric Reis'"
                  value={author} 
                  onChangeText={(author) => setAuthor(author)}
                  setValue = {setAuthor}
                  secureTextEntry = {false}
                />
                </View>

                <View style = {styles.containers}>
                <Ionicons name="cash-outline" size={20} color="grey" style={styles.icon}/>
                <TextInput style = {styles.inputFields}
                  placeholder="Price: DKK"
                  value={price} 
                  onChangeText={(price) => setPrice(price)}
                  setValue = {setPrice}
                  secureTextEntry = {false}
                />
                </View>


                <View style = {styles.containers}>
                <Ionicons name="library" size={20} color="grey" style={styles.icon}/>
                <TextInput style = {styles.inputFields}
                  placeholder="Edition: e.g. '4th'"
                  value={edition} 
                  onChangeText={(edition) => setEdition(edition)}
                  setValue = {setEdition}
                  secureTextEntry = {false}
                />
                </View>

                <View style = {styles.containers}>
                <Ionicons name="school" size={20} color="grey" style={styles.icon}/>
                <TextInput style = {styles.inputFields}
                  placeholder="Course: e.g. 'Innovation og ny teknologi'"
                  value={course} 
                  onChangeText={(course) => setCourse(course)}
                  setValue = {setCourse}
                  secureTextEntry = {false}
                />
                </View>

                <View style = {styles.containers}>
                <DatePicker
                  style={{width: "100%"}}
                  date={releaseDate}  // This is the state variable for the release date
                  mode="date"
                  placeholder="Click and select release date"
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 10,
                      color: "grey"
                    },
                    dateInput: {
                      marginLeft: 20,
                      marginRight: 30,
                      borderWidth: 0,
                      color: "grey"
                    }
                  }}
                  onDateChange={(date) => {setReleaseDate(date)}}  // This function is called when the user selects a date

                />
                </View>

                <View style = {styles.containers}>
                <Ionicons name="key" size={20} color="grey" style={styles.icon}/>
                 <TextInput style = {styles.inputFields}
                  placeholder="ISBN number"
                  value={isbnNumber} 
                  onChangeText={(isbnNumber) => setIsbnNumber(isbnNumber)}
                  setValue = {setIsbnNumber}
                  secureTextEntry = {false}
                />
                </View>

                <View style = {styles.containers}>
                <Ionicons name="ice-cream" size={20} color="grey" style={styles.icon}/>
                <TouchableOpacity 
                onPress={() => setShowList(true)}
                style ={{
                  width: 310,
                  height: 30,
                  paddingHorizontal: 30,
                  paddingVertical: 0,
                  marginVertical: 10,
                  flex: 1,
                }}
                >
                <Text style = {{color:"grey"}}>Selected condition: <Text style = {{color:"blue", fontSize:"15"}}>{condition}</Text> </Text>
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
                            }}>
                                <Text>{item.label}</Text>
                           </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.value}
                   />
                </Modal>
                </View>


            <View style = {styles.containers}>

                <Button onPress={() => navigation.navigate('PhotoScreen') }> Select Image </Button>
                <Image
                               source={{ uri: image }}
                               style={{
                                 width: 85,
                                 height: 50,
                                 borderRadius: 3,
                                 borderWidth: 2,
                                 borderColor: "white",
                                 marginTop: 0,
                               }}
                />
            </View>


            <View style = {styles.containers}>
                <Button onPress={resetImage} style = {styles.CreateButton} title="Reset Image" Text="Reset Image">Reset Image</Button>
                <Button onPress={createListing} style = {styles.CreateButton} title="Create" Text="Create">Create Listing</Button>
            </View>

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
        height: 800,
      },
      title: {
        color: "#add8e6",
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
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
      icon: {
        padding: 10,
        margin: 5,
      },
      inputFields: {
        width: '80%',
        height: 30,
        paddingHorizontal: 30,
        paddingVertical: 0,
        marginVertical: 10,
        flex: 1,
        backgroundColor: "#e6e6fa"
      },
      CreateButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 0,
        paddingHorizontal: 10,
        borderRadius: 5,
        elevation: 0,
        margin: 5,     
        borderWidth: 2,
        borderColor: "grey"   

      },
      Text: {
        backgroundColor: 'Black',
      },
    
    
      
  
   
    });

    export default SellScreen