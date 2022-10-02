import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import Logo from '../../../assets/Images/Logo.png'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import Tabs from '../../Components/BottomNav';
import SocialSignInButtons from '../../Components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase/compat";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import LogInScreen from '../LogInScreen/LogInScreen';
import { NavigationContainer } from '@react-navigation/native';


const SupportScreen = () => {

    const [user, setUser] = useState({ loggedIn: false });


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
    
        return (
            <SafeAreaView >

                <Text>Support</Text>
    
          
            </SafeAreaView>
    
        )
    
    }
    
    export default SupportScreen