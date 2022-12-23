import React, {useState, useEffect, useId} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, Button} from 'react-native';
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


            <Text style={styles.Text}> Hi {userData.fullname}</Text>


        <TouchableOpacity 
        style={styles.button} 
        title = "My Listings"
        text= 'My Listings'
        onPress={onArchive}
        /> 

        <TouchableOpacity 
        style={styles.button}    
        title = "Profile Settings"   
        text= 'Profile Settings'
        onPress={onSettingScreen}
        />

        <TouchableOpacity 
        style={styles.button}    
        title = "Ledig skærm"   
        text= 'Ledig Skærm til en feature (Hedder ContractScreen i fil-mappe)'
        onPress={onContacts}
        />

        <TouchableOpacity 
        style={styles.button}    
        title = "Lejligheder & beboere"   
        text= 'Lejligheder & Beboere'
        onPress={onApartments}
        />

        <TouchableOpacity 
        style={styles.button}    
        title = "Support"   
        text= 'Support'
        onPress={onSupport}
        />

        <TouchableOpacity 
        style={styles.button}    
        title = "Log out"    
        onPress={() => handleLogOut()} 
        text= "Log ud" 
        />

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#708090'
        
    },
    inputFields: {
        backgroundColor: '#fffafa',
        width: 250,
        height: 25,
        borderColor: '#ffffff',
        borderWidth: 6,
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginVertical: 15,
      },
    button: {
        backgroundColor: '#ffffff',
        width: '80%%',
        padding: 20,
        marginVertical: 10,
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 5,
        borderColor: "#87ceeb",
        text: "#87ceeb",
    },
    Text: {
        color: "#87ceeb",
        fontSize: 30,
        fontStyle: 'Italic',
        fontWeight: 'bold',
        letterSpacing: 2,
      },
})

export default HomeScreen