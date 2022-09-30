import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogInScreen from '../Screens/LogInScreen/LogInScreen';
import SignUpScreen from '../Screens/SignUpScreen/SignUpScreen';
import ConfirmEmailScreen from '../Screens/ConfirmEmailScreen/ConfirmEmailScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen/ForgotPasswordScreen';
import ConfirmPasswordScreen from '../Screens/ConfirmPasswordScreen/ConfirmPasswordScreen';
import HomeScreen from '../Screens/HomeSceen/HomeScreen'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingScreen from "../Screens/SettingScreen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator ();


const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name= "SignIn" component={LogInScreen}/> 
                <Stack.Screen name= "SignUp" component={SignUpScreen}/> 
                <Stack.Screen name= "ConfirmEmail" component={ConfirmEmailScreen}/> 
                <Stack.Screen name= "ForgotPassword" component={ForgotPasswordScreen}/> 
                <Stack.Screen name= "ConfirmPassword" component={ConfirmPasswordScreen}/> 
                <Stack.Screen name= "HomeScreen" component={HomeScreen}/> 
                <Stack.Screen name= "SettingScreen" component={SettingScreen}/> 
            </Stack.Navigator>
            </NavigationContainer>
        
    )}
  


    


//https://www.youtube.com/watch?v=gPaBicMaib4


export default Navigation


