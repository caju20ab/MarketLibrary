import React from "react";
import {view, text} from 'react-native'
import CustomButton from "../CustomButton";

//Her laves der et custom compenent i form af en universel knap til at logge ind med CBS konti, hvis et partnerskab med dem blev aktuelt en dag.

const SocialSignInButtons = () => {
    const onSignInCBS = () => {
        console.warn ('CBS');
    }

    return (
        <>
        <CustomButton 
        text='Sign In With CBS credentials' 
        onPress={onSignInCBS} 
        bgColor = "#E7EAF4"
        fgColor= "#4765A9"
        />
        </>
    )
}
export default SocialSignInButtons