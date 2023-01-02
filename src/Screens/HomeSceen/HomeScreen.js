import React, {useState, useEffect, useId} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase/compat";
import { FlatList } from 'react-native-gesture-handler';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../../context';
import CustomButton from '../../Components/CustomButton';
import { collection, addDoc, getDocs, getFirestore, doc, find } from "firebase/firestore"; 
import { Ionicons } from '@expo/vector-icons';



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
    const onMyListings = () => {
        navigation.navigate ('MyListingsScreen')
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

        <ScrollView>

        <SafeAreaView style = {styles.root}>

        <Text style={styles.Text}> Hi {userData.fullname}</Text>

      <TouchableOpacity
        title = "My Listings"
        text= 'My Listings'
        onPress={onMyListings}        
        >
        <View style ={styles.containers}>
        <Ionicons name="search" size={20} color="#87ceeb" style={styles.icon}/>
        <View>
          <Text style = {styles.Text2}> My listings </Text>
       </View>
       </View>
      </TouchableOpacity>

      <TouchableOpacity 
        title = "Profile Settings"   
        text= 'Profile Settings'
        onPress={onSettingScreen}
        >
       <View style ={styles.containers}>
       <Ionicons name="settings" size={20} color="#87ceeb" style={styles.icon}/>
       <View>
        <Text style = {styles.Text2}> Settings </Text>
       </View>
       </View>
      </TouchableOpacity>


      <TouchableOpacity 
        title = "Support"   
        text= 'Support'
        onPress={onSupport}
        >
        <View style ={styles.containers}>
        <Ionicons name="help-circle" size={20} color="#87ceeb" style={styles.icon}/>
        <View>
          <Text style = {styles.Text2}> Support </Text>
        </View>
      </View>
      </TouchableOpacity>


      <TouchableOpacity 
        title = "Log out"    
        onPress={() => handleLogOut()} 
        text= "Log ud" 
        >
        <View style ={styles.containers}>
          <Ionicons name="log-out" size={20} color="#87ceeb" style={styles.icon}/>
          <View>
            <Text style = {styles.Text2}> Log out </Text>
          </View>
        </View>
      </TouchableOpacity>



        </SafeAreaView>
        </ScrollView>


    )
}


const styles = StyleSheet.create({
  
    root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#708090',
        justifyContent: "space-between",
        height: 550

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
      margin: 10,
      width: 300
    },
    button: {
        backgroundColor: '#e6e6fa',
        width: '50%',
        padding: 20,
        marginVertical: 20,
        alignItems: "center",
        borderRadius: 10,
    },
    Text: {
        color: "#87ceeb",
        fontSize: 30,
        fontStyle: 'Italic',
        fontWeight: 'bold',
        letterSpacing: 2,
      },
    Text2: {
        color: "#87ceeb",
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: 'bold',
        letterSpacing: 0,
      },
})

export default HomeScreen