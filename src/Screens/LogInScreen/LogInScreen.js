import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import Logo from '../../../assets/Images/Logo.png'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase/compat";
import { AuthContext } from '../../../context';
import { Button, TextInput } from 'react-native-paper';



const LogInScreen = () => {
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    //Sørger for at vindue dimensioner passer til mobilapplikation
    const {height} = useWindowDimensions();

    //Definere navigation til at bruge min StackNavigator
    const navigation = useNavigation ();
    const {signIn} = React.useContext (AuthContext);


    //Håndtere vores login med den indbyggede Firebase metode signInWithEmailAndPassword
    const handleSubmit = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password).then((data)=>{
                signIn();
            });

        } catch (error){
            setErrorMessage(error.message)
        }
    }


    const onForgotPassword = () => {
        navigation.navigate ('ForgotPassword')
    }
    const onSignUpPressed = () => {
        navigation.navigate ('SignUp')
    }

 

    return (
        <ScrollView>
        <View style = {styles.root}>
            <Image source = {Logo} style = {[styles.logo, {height: height * 0.3}]} 
             resizeMode = "contain" 
            />

        <TextInput style = {styles.inputFields} placeholder='Email' 
        value={email} 
        setValue = {setEmail}
        onChangeText = {setEmail}
        />

        <TextInput style = {styles.inputFields}
        placeholder='Password' 
        value={password} 
        setValue = {setPassword}
        onChangeText = {setPassword}
        secureTextEntry = {true}
        />

        <Button 
        style={styles.loginButton} 
        onPress={() => handleSubmit ()} 
        text = 'Login with your user'
        > Login </Button>

        <Button 
        style={styles.loginButton} 
        text='Forgot password?' 
        onPress={onForgotPassword} 
        type = 'TERTIARY'
        > Forgot your password? </Button>
        
        <Button 
        style={styles.loginButton} 
        text='Dont have an account, create one?' 
        onPress={onSignUpPressed} 
        type = 'TERTIARY'
        > Create an account? </Button>
        

        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#778899'
        
    },
    logo: {
        width: '150%',
        height: '100%',
        maxHeight: 200,
        shadowColor: '#ffffff'
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
    loginButton: {
        backgroundColor: '#ffffff',
        width: '100%',
        padding: 5,
        marginVertical: 15,
        alignItems: "center",
        borderRadius: 5,
        text: "black"
    },
    Text: {
        backgroundColor: 'white',
      },
});

export default LogInScreen