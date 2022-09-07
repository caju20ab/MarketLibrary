import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput } from 'react-native';

const CustomInput = () => {
    return (
        <View>
            <TextInput placeholder='placeholder' style={styles.input}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        width: '100%'
    },
    input: {},
});

export default CustomInput