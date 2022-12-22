import React, {useState, useEffect, useId} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase/compat";
import { FlatList } from 'react-native-gesture-handler';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../../context';
import CustomButton from '../../Components/CustomButton';
import { collection, addDoc, getDocs, getFirestore, doc, find } from "firebase/firestore"; 



const HomeScreen = () => {

    const firestore = firebase.firestore;
    const db = firebase.firestore();
    
    const [user, setUser] = useState({ loggedIn: false });
    const [userData, setUserData] = useState('');


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
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          if (user) {
            // Get the user's email address from the currentUser object
            const userEmail = user.email;
      
            // Use the user's email address to retrieve the user's data from the Firestore database
            firebase
              .firestore()
              .collection("users")
              .where("email", "==", userEmail)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // Set the userData state with the user's data from the Firestore database
                  setUserData(doc.data());
                });
              })
              .catch(error => {
                console.log("Error getting documents:", error);
              });
          } else {
            // Reset the userData state to an empty array when the user is not logged in
            setUserData([]);
          }
        });
      
        // Unsubscribe from the auth state change event when the component unmounts
        return () => unsubscribe();
      }, [user]);

  console.log(userData)




    
    
    //Navigationerne
    const onSettingScreen = () => {
        navigation.navigate ('SettingScreen')
    }
    const onTable = () => {
        navigation.navigate ('TableScreen')
    }
    const onArchive = () => {
        navigation.navigate ('ArchiveScreen')
    }
    const onContacts = () => {
        navigation.navigate ('ContactScreen')
    }
    const onApartments = () => {
        navigation.navigate ('ApartmentScreen')
    }
    const onSupport = () => {
        navigation.navigate ('SupportScreen')
    }


//Definere navigation til at bruge min StackNavigator
    const navigation = useNavigation ();
//Definere SignOut og anvender useContext for at gøre dataen tilgåeligt fra flere komponenter (eks. LogIn)
    const {signOut} = React.useContext (AuthContext);


    const handleLogOut = async () => {
        await firebase.auth().signOut().then((data)=>{
            signOut()
        });
    }

//Hvis den nuværende bruger ikke er FireBase autoriseret, så skal den returne Not Found
    if (!firebase.auth().currentUser) {
        return <View><Text>Not found</Text></View>;
    }

//Ellers returneres følgende:
    return (
        <SafeAreaView style = {styles.root}>


            <Text style={styles.Menu}> {userData.fullname}'s Profile</Text>


        <CustomButton
        text= 'My Listings'
        onPress={onArchive}
        />

        <CustomButton  
        text= 'Profile Settings'
        onPress={onSettingScreen}
        />

        <CustomButton
        text= 'Ledig Skærm til en feature (Hedder ContractScreen i fil-mappe)'
        onPress={onContacts}

        
        />
        <CustomButton
        text= 'Lejligheder & Beboere'
        onPress={onApartments}


        />
        <CustomButton
        text= 'Support'
        onPress={onSupport}


        
        />
        <CustomButton onPress={() => handleLogOut()} text= "Log ud" />



   
        </SafeAreaView>

    )

}


const styles = StyleSheet.create({
    root: {
        padding: 20,
        marginVertical: 0,
        backgroundColor: 'white',
    },
    Menu: {
        fontSize: 25,
        fontWeight: 'bold', 
        textAlign: 'left',
        margin: 10,
    },
    Ejendommen: {
        fontSize: 25,
        fontWeight: 'bold', 
        textAlign: 'left',
        margin: 20,
    },
    CurrentUser: {
        fontSize: 10
    

    }

})

export default HomeScreen