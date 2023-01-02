import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const ConfirmEmailScreen = () => {

    //Opstiller kode staten  
    const [code, setCode] = useState ('');
    
    //Opretter en variabel til navigation
    const navigation = useNavigation ()
    

    //Oprettes navigations logik til knapperne i frontend. Laves alle tre som funktioner.
    const OnConfirmPressed = () => {
        navigation.navigate ('Home')
        console.warn ('Sign In');
    }
    const onResendPressed = () => {
        console.warn ('To Do');
    }
    const onSignInPressed = () => {
        navigation.navigate ('SignIn')
        console.warn ('OnSignInPressed')
    }

    
    const {height} = useWindowDimensions();
    return (
        <ScrollView>
        <View style = {styles.root}>
        <Text style= {styles.title}>Confirm your email</Text>
   
       
        <CustomInput placeholder='Enter your confirmation code here' 
        value={code} 
        setValue = {setCode}
        />

        <CustomButton 
        text='Confirm' 
        onPress={OnConfirmPressed} 
        />

        <CustomButton 
        text='Resend code' 
        onPress={onResendPressed} 
        type = 'SECONDARY'
        />
    
        <CustomButton 
        text='Back to sign in?' 
        onPress={onSignInPressed} 
        type = 'TERTIARY'
        />
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20
    },
    logo: {
        width: '100%',
        height: '80%',
        maxHeight: 200,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10

    },
    text: {
        color: 'gray',
        marginVertical: 10
    },
    link: {
        color: '#FDB075'

    }
});

export default ConfirmEmailScreen