import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat';
import { FlatList } from 'react-native-gesture-handler';
import { v4 as uuidv4 } from 'uuid';
import 'firebase/firestore';
import TableScreen from '../TableScreen';
import ArchiveScreen from '../ArchiveScreen';

const BookDetailsScreen = ({ route, navigation }) => {
  const { books } = route.params;

  console.log(books);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{books.Title}</Text>
        <Text style={styles.author}>{books.Author}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Image
            source={{ uri: books.Image }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 10,
              marginTop: 10,
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} title="Contact seller" Text="Contact Seller">
              <Text style={styles.buttonText}>Contact seller</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Condition:</Text>
          <Text style={styles.value}>{books.Condition}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Course:</Text>
          <Text style={styles.value}>{books.Course}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Edition:</Text>
          <Text style={styles.value}>{books.Edition}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>ISBN:</Text>
          <Text style={styles.value}>{books.isbnNumber}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Release Date:</Text>
          <Text style={styles.value}>{books.releaseDate}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          padding: 20,
          backgroundColor: '#708090'
        },

        title: {
          color: "#87ceeb",
          fontSize: 30,
          fontStyle: 'Italic',
          fontWeight: 'bold',
          letterSpacing: 2,
        },

        author: {
          color: "#87ceeb",
          fontSize: 20,
          fontStyle: 'Italic',
          fontWeight: 'bold',
          letterSpacing: 2,
        },

        image: {
        width: 200,
        height: 300,
        resizeMode: 'contain',
        marginBottom: 20,
        },

        description: {
        fontSize: 16,
        marginBottom: 20,
        },

        buttonContainer: {
        alignItems: 'center',
        },

        button: {
        backgroundColor: '#ffffff',
        width: 120,
        padding: 20,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 5,
        borderColor: '#87ceeb',
        },

        buttonText: {
        color: '#87ceeb',
        },

        detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        },

        label: {
        fontWeight: 'bold',
        },

        value: {
        color: 'grey',
        },
        });
  

export default BookDetailsScreen
