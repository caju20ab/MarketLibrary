import React, {useEffect, useState} from "react";
import {Dimensions, Image, StyleSheet, View, Text, Button, TouchableOpacity} from "react-native";
import PhotoScreen from "./Camera";
import SellScreen from "../SellScreen";

const ImageScreen = ({route, navigation}) => {

    const [image,setImage] = useState('')



    /* du sætter billedet fra dine parameter og i return fjerne du val*/
    useEffect(() => {
        setImage(route.params.image);

        return () => {
            setImage('')
        }
    },[]);

    return(
        <View>
            {image ? (
              // If the image is set, render the image
              <View style = {styles.image}>
                <Image
                  source={{uri: image}}
                  style={{
                    width: "100%",
                    height: "80%",
                  }}  
                />
                <Button                       
                onPress={() => navigation.navigate('SellScreen', {image})}
                title="Go back to listing" 
                Text="Go back to listing">
                </Button>
              </View>
            ) : (
              // Otherwise, render a placeholder
              <Text>No image</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({

    image: {
        padding: 0,
        margin: 0,
    },

    touchableOpacity: {
        alignItems: 'center',
        backgroundColor: 'Yellow',
        padding: 10,
      },
      text: {
        color: '#333333',
      },
})

export default ImageScreen;




