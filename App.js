//Importerer alle de forskellige screens til navigering samt hjælpe komponenter til database konfigurering og React-Native frontend

import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import LogInScreen from './src/Screens/LogInScreen/LogInScreen';
import SignUpScreen from './src/Screens/SignUpScreen/SignUpScreen';
import ConfirmEmailScreen from './src/Screens/ConfirmEmailScreen/ConfirmEmailScreen';
import ForgotPasswordScreen from './src/Screens/ForgotPasswordScreen/ForgotPasswordScreen';
import ConfirmPasswordScreen from './src/Screens/ConfirmPasswordScreen/ConfirmPasswordScreen';
import MyListingsScreen from './src/Screens/MyListingsScreen';
import EventScreen from './src/Screens/EventScreen';
import SupportScreen from './src/Screens/SupportScreen';
import BrowseScreen from './src/Screens/BrowseScreen';
import BookDetails from './src/Screens/BookDetailsScreen';
import SellScreen from './src/Screens/SellScreen';
import {initializeApp} from 'firebase/app'
import firebase from 'firebase/compat';
import { getFirestore } from "firebase/firestore";
import HomeScreen from './src/Screens/HomeSceen/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingScreen from './src/Screens/SettingScreen';
import Splash from './src/Screens/SplashScreen';
import { set } from 'react-native-reanimated';
import { AuthContext } from './context';
import ImageScreen from './src/Screens/CameraScreen/Image';
import PhotoScreen from './src/Screens/CameraScreen/Camera';
import { Ionicons } from '@expo/vector-icons';
import { LogBox } from 'react-native';


//Fjerner console warnings fra vores user interface. Dette blev en nødvendighed i sidste ende, da mange af vores dependency programmer 
//var inkompatible i forhold til deres versionsnummer.  
LogBox.ignoreLogs(['Warning: ...']); 
LogBox.ignoreAllLogs();



//Applikationens Firebase konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBC6Gh06IFiHbTovgyMQznav5o_jIeZkLs",
  authDomain: "awesomeproject-2f66b.firebaseapp.com",
  projectId: "awesomeproject-2f66b",
  storageBucket: "awesomeproject-2f66b.appspot.com",
  messagingSenderId: "11773658731",
  appId: "1:11773658731:web:309017ed98e341a3ad132e",
  databaseURL: "https://awesomeproject-2f66b-default-rtdb.europe-west1.firebasedatabase.app"
};


//Opretter fire forskellige stacks, hvoraf en af disse er til authorization siderne, hvor brugerne kan logge ind, lave en profil osv.
//De resterende tre stacks er til vores bottom navigator, når en bruger er logget ind.
const AuthStack = createNativeStackNavigator ();
const HomeStack = createNativeStackNavigator ();
const NotifactionStack = createNativeStackNavigator ();
const TableStack = createNativeStackNavigator ();


//Definerer bottom navigatoren som skal vises når en bruger er logget ind
const Tabs = createBottomTabNavigator();



//Her oprettes selve serveren som omfatter alt logik og frontend 
const App = () => {

//Sætter useState for om en bruger er logget ind eller ej. Den initiale værde er false, således hver gang man åbner appen skal man logge ind først
  const [user, setUser] = useState({ loggedIn: false });

//Inspiration fra øvelsesholdene. If-erklæringen kontrollerer, om der allerede er initialiseret Firebase-apps. 
//Hvis der ikke er nogen, initialiserer den en ny Firebase-app ved hjælp af firebase.initializeApp()-funktionen og firebaseConfig-objektet.
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }


//Inspiration fra øvelsesholdene. Denne funktion lytter til ændringer i den aktuelle brugers godkendelsestilstand. 
//Når staten for authentication ændres, kaldes funktionen med et callback, der modtager et objekt med en loggedIn-egenskab og en brugeregenskab.
  function onAuthStateChange(callback) {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        callback({loggedIn: true, user: user});
      } else {
        callback({loggedIn: false});
      }
    });
  }

  //Inspiration fra øvelsesholdene. UseEffect hooks anvendes her til at tage en funktion som et argument, og funktionen kaldes således hver gang komponenten render. 
  //Funktionen skal indeholde al koden til side effekten, såsom opsætning af en lytter eller et API-kald.
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);


  //Laver vores navigator stack til hjemmetabben
  const HomeStackScreen = () => (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="HomeScreen" 
        component={HomeScreen}
        options={{ title: 'Home' }}
      />  
      <HomeStack.Screen 
        name="SupportScreen" 
        component={SupportScreen}
        options={{ title: 'Support' }}
      /> 
      <HomeStack.Screen 
        name="EventScreen" 
        component={EventScreen}
        options={{ title: 'Events' }}
      /> 
      <HomeStack.Screen 
      name="MyListingsScreen" 
      component={MyListingsScreen}
      options={{ title: 'My Listings' }}
      /> 
      <HomeStack.Screen 
        name="BrowseScreen" 
        component={BrowseScreen}
        options={{ title: 'Browse' }}
      /> 
      <HomeStack.Screen 
      name="SettingScreen" 
      component={SettingScreen}
      options={{ title: 'Settings' }}
      /> 
    </HomeStack.Navigator>
  )

  //Laver vores navigator stack til SellTabben hvor man opretter en annonce

  const SellStackScreen = () => (
    <NotifactionStack.Navigator>
      <NotifactionStack.Screen 
        name="SellScreen" 
        component={SellScreen}
        options={{ title: 'Sell' }}
      />
      <NotifactionStack.Screen 
        name="PhotoScreen" 
        component={PhotoScreen}
        options={{ title: 'Photo' }}
      />
      <NotifactionStack.Screen 
        name="ImageScreen" 
        component={ImageScreen}
        options={{ title: 'Image' }}
      />

    </NotifactionStack.Navigator>
  )

  //Laver vores navigator stack til BrowseTabben
  const BrowseStackScreen = () => (
    <TableStack.Navigator>
      <TableStack.Screen 
        name="BrowseScreen" 
        component={BrowseScreen}
        options={{ title: 'Browse' }}      
      />
      <TableStack.Screen 
      name="BookDetails" 
      component={BookDetails}
      options={{ title: 'Details' }}
      />
    </TableStack.Navigator>
  )


  //https://www.youtube.com/watch?v=nQVCkqvU1uE anvendt til at styre navigationen med en splash screen når der loades og userToken til at afgøre om brugeren er logget ind eller ej. 
  //
  
  const [isLoading, setIsLoading] = React.useState(true)
  const [userToken, setUserToken] = React.useState (null);

  const authContext = React.useMemo (() => {
    return {
      signIn: () => {
        setIsLoading (false);
        setUserToken ("asdf");
      },
      signUp: () => {
        setIsLoading (false);
        setUserToken ("asdf");
      },
      signOut: () => {
        setIsLoading (false);
        setUserToken (null);
        },

}})

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);

    }, 1000);
  }, []);

  if (isLoading) {
    return <NavigationContainer><Splash/></NavigationContainer>
  }
  
//https://www.youtube.com/watch?v=nQVCkqvU1uE Anvendt som inspiration til hele navigationsdelen i applikationen.
  return(
    <AuthContext.Provider value = {authContext}>
    <NavigationContainer>
      {userToken ? (
           <Tabs.Navigator screenOptions={{headerShown: false}}>
    
           <Tabs.Screen 
               name='Sell' 
               component={SellStackScreen}
               options={{
                 tabBarIcon: ({ focused, color, size }) => (
                   <Ionicons name="cash" size={size} color={'#87ceeb'} />
                 ),
           }}/>
             <Tabs.Screen 
               name='Home' 
               component={HomeStackScreen} 
               options={{
                 tabBarIcon: ({ focused, color, size }) => (
                   <Ionicons name="ios-home" size={size} color={'#87ceeb'} />
                 ),
           }}/>
   
           <Tabs.Screen 
             name='Browse' 
             component={BrowseStackScreen}
             options={{
               tabBarIcon: ({ focused, color, size }) => (
                 <Ionicons name="search-circle" size={size} color={'#87ceeb'} />
               ),
           }}/>
  
       </Tabs.Navigator>
      ) : (
      <AuthStack.Navigator>
        <AuthStack.Screen name= "SignIn" component={LogInScreen} options={{title: 'Log In'}}/>
        <AuthStack.Screen name= "SignUp" component={SignUpScreen} options={{title: 'Create an account'}}/>
        <AuthStack.Screen name= "ConfirmEmail" component={ConfirmEmailScreen}/> 
        <AuthStack.Screen name= "ForgotPassword" component={ForgotPasswordScreen}/> 
        <AuthStack.Screen name= "ConfirmPassword" component={ConfirmPasswordScreen}/> 
    
      </AuthStack.Navigator>
      )}
   </NavigationContainer>
   </AuthContext.Provider>

      )}
         
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'White'
  }
});

export default App