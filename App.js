import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import LogInScreen from './src/Screens/LogInScreen/LogInScreen';
import SignUpScreen from './src/Screens/SignUpScreen/SignUpScreen';
import ConfirmEmailScreen from './src/Screens/ConfirmEmailScreen/ConfirmEmailScreen';
import ForgotPasswordScreen from './src/Screens/ForgotPasswordScreen/ForgotPasswordScreen';
import ConfirmPasswordScreen from './src/Screens/ConfirmPasswordScreen/ConfirmPasswordScreen';
import Navigation from './src/Navigation';
import {initializeApp} from 'firebase/app'
import firebase from 'firebase/compat';
import HomeScreen from './src/Screens/HomeSceen/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Add SDKs for the i want to use


//Applikationen Firebase konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBC6Gh06IFiHbTovgyMQznav5o_jIeZkLs",
  authDomain: "awesomeproject-2f66b.firebaseapp.com",
  projectId: "awesomeproject-2f66b",
  storageBucket: "awesomeproject-2f66b.appspot.com",
  messagingSenderId: "11773658731",
  appId: "1:11773658731:web:309017ed98e341a3ad132e"
};



const App = () => {
  const [user, setUser] = useState({ loggedIn: false });

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

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

  return (
    <SafeAreaView style= {styles.root}>
      <Navigation/>
    </SafeAreaView>

  );

};




const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'White'
  }
});

export default App