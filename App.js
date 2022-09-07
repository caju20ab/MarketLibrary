import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import LogInScreen from './src/Screens/LogInScreen'


const App = () => {
  return (
    <SafeAreaView style= {styles.root}>
    <LogInScreen />
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  }
});

export default App