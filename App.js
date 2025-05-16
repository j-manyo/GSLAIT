import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

// Import screens
import HomeScreen from './screens/HomeScreen';
import TranslatorScreen from './screens/TranslatorScreen';
import SettingsScreen from './screens/SettingsScreen';
import AboutScreen from './screens/AboutScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isTfReady, setIsTfReady] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [model, setModel] = useState(null);

  // Initialize TensorFlow.js
  useEffect(() => {
    const initTensorFlow = async () => {
      try {
        await tf.ready();
        setIsTfReady(true);
        console.log('TensorFlow.js is ready');
        
        // Note: In a real app, you would load your trained model here.
        // For this example, we're just setting a placeholder.
        // Example of how to load a model:
        // const modelJson = require('./assets/model/model.json');
        // const modelWeights = require('./assets/model/weights.bin');
        // const loadedModel = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
        // setModel(loadedModel);
        // setIsModelReady(true);
        
        // For demo purposes, we'll just set isModelReady to true
        setIsModelReady(true);
      } catch (error) {
        console.error('Failed to initialize TensorFlow.js', error);
      }
    };

    initTensorFlow();
  }, []);

  if (!isTfReady || !isModelReady) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading TensorFlow and Model...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4a90e2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Sign Language Translator' }} 
        />
        <Stack.Screen 
          name="Translator" 
          component={TranslatorScreen} 
          options={{ title: 'Translate Sign Language' }} 
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ title: 'Settings' }} 
        />
        <Stack.Screen 
          name="About" 
          component={AboutScreen} 
          options={{ title: 'About' }} 
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
});
