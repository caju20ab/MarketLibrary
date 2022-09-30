import React, {useState} from 'react';
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


const SettingScreen = () => {

    //Definere navigation til at bruge min StackNavigator
        const navigation = useNavigation ();
    
        const handleLogOut = async () => {
            await firebase.auth().signOut().then((data)=>{
                navigation.navigate ('SignIn')
            });
        }
    
    
        if (!firebase.auth().currentUser) {
            return <View><Text>Not found</Text></View>;
        }
    
        return (
            <SafeAreaView style = {styles.root}>
    
            <Text style={styles.Menu}>Min profil</Text>

            <Text style={styles.Menu}>Personlige oplysninger</Text>
    
    
            <Text style={styles.CurrentUser}>{firebase.auth().currentUser.fullname}</Text>
    
            <Text style={styles.CurrentUser}>{firebase.auth().currentUser.email}</Text>
    
    
            <Text style={styles.Ejendommen}>Ejendommen</Text>
    
    
            <CustomButton  
            text= 'Opslagstavle'
    
            />
    
            <CustomButton
            text= 'Arkiv'
    
            
            />
            <CustomButton
            text= 'Begivenheder'
    
            
            />
            <CustomButton
            text= 'Kontakter'
    
            
            />
            <CustomButton
            text= 'Lejligheder & Beboere'
    
            
            />
            <CustomButton
            text= 'Support'
    
            
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
            fontFamily: 'normal',
            fontSize: 25,
            fontWeight: 'bold', 
            textAlign: 'left',
            margin: 10,
        },
        Ejendommen: {
            fontFamily: 'normal',
            fontSize: 25,
            fontWeight: 'bold', 
            textAlign: 'left',
            margin: 20,
        },
        CurrentUser: {
            fontSize: 10
        
    
        }
    
    })
    
    export default SettingScreen