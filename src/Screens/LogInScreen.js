import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import Logo from '../../assets/Images/Logo.png'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import CustomInput from '../Components/CustomInput';

const LogInScreen = () => {
    const {height} = useWindowDimensions();
    return (
        <View style = {styles.root}>
       <Image source = {Logo} style = {[styles.logo, {height: height * 0.3}]} 
       resizeMode = "contain" 
       />
        <CustomInput />
        </View>
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
    }
});

export default LogInScreen