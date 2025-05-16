import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { Camera } from 'expo-camera';
import * as Speech from 'expo-speech';
import * as tf from '@tensorflow/tfjs';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';

// TensorCamera is a wrapper for Camera which allows tensors to be generated from the camera feed
const TensorCamera = cameraWithTensors(Camera);

// Sample sign language translations (in a real app, these would come from the ML model)
const SAMPLE_TRANSLATIONS = [
  "Hello",
  "Thank you",
  "How are you?",
  "My name is...",
  "Nice to meet you"
];

const TranslatorScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [detectedText, setDetectedText] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [processingActive, setProcessingActive] = useState(true);
  
  const cameraRef = useRef(null);
  const frameProcessor = useRef(null);
  const frameCount = useRef(0);
  const lastDetection = useRef(null);

  // Request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert(
          "Permission needed",
          "Camera access is required to translate sign language.",
          [{ text: "OK" }]
        );
      }
    })();
  }, []);

  // Setup frame processor
  useEffect(() => {
    frameProcessor.current = async (images, updatePreview) => {
      const loop = async () => {
        if (!processingActive) return;
        
        try {
          // Process frames at a reasonable rate (every 30 frames ~ 1s at 30fps)
          if (frameCount.current % 30 === 0) {
            // In a real app, you'd process the image tensor here
            // For demo purposes, we'll just simulate a detection
            
            // Simulate ML model detection with random selection
            if (Math.random() > 0.7) {
              const detectedPhrase = SAMPLE_TRANSLATIONS[
                Math.floor(Math.random() * SAMPLE_TRANSLATIONS.length)
              ];
              
              // Only update if the detection is different
              if (lastDetection.current !== detectedPhrase) {
                lastDetection.current = detectedPhrase;
                setDetectedText(detectedPhrase);
                
                // Speak the detected text
                if (!isSpeaking) {
                  setIsSpeaking(true);
                  Speech.speak(detectedPhrase, {
                    language: 'en',
                    onDone: () => setIsSpeaking(false),
                    onError: (error) => {
                      console.log('Speech error:', error);
                      setIsSpeaking(false);
                    }
                  });
                }
              }
            }
          }
          
          frameCount.current += 1;
        } catch (error) {
          console.log('Processing error:', error);
        }
        
        // Continue the loop
        if (processingActive) {
          requestAnimationFrame(loop);
        }
      };
      
      // Start the processing loop
      loop();
    };
    
    return () => {
      // Clean up processing when component unmounts
      setProcessingActive(false);
    };
  }, [processingActive, isSpeaking]);
  
  // Handle rendering of camera vs permission screens
  if (hasPermission === null) {
    return <View style={styles.container}><ActivityIndicator size="large" color="#4a90e2" /></View>;
  }
  
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>No access to camera</Text>
      </View>
    );
  }
  
  const handleFlipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  
  const handlePauseResume = () => {
    setIsPaused(!isPaused);
    setProcessingActive(!isPaused);
  };
  
  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={type}
        autoFocus={Camera.Constants.AutoFocus.on}
        // In a real app, use TensorCamera for ML processing
      >
        <View style={styles.controlOverlay}>
          {/* Translation Results Display */}
          <View style={styles.translationContainer}>
            {detectedText ? (
              <>
                <Text style={styles.translationLabel}>Detected Sign Language:</Text>
                <Text style={styles.translationText}>{detectedText}</Text>
                {isSpeaking && <ActivityIndicator size="small" color="#fff" />}
              </>
            ) : (
              <Text style={styles.translationText}>Make a sign to translate...</Text>
            )}
          </View>
          
          {/* Controls */}
          <View style={styles.controlsContainer}>
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={handleFlipCamera}
            >
              <Text style={styles.controlText}>Flip</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.controlButton, isPaused ? styles.resumeButton : styles.pauseButton]}
              onPress={handlePauseResume}
            >
              <Text style={styles.controlText}>{isPaused ? 'Resume' : 'Pause'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  controlOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    padding: 20,
  },
  translationContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 15,
    borderRadius: 10,
    marginTop: 40,
    alignItems: 'center',
  },
  translationLabel: {
    color: '#ddd',
    fontSize: 14,
    marginBottom: 5,
  },
  translationText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  controlButton: {
    height: 60,
    width: 120,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(74, 144, 226, 0.8)',
  },
  pauseButton: {
    backgroundColor: 'rgba(235, 87, 87, 0.8)',
  },
  resumeButton: {
    backgroundColor: 'rgba(39, 174, 96, 0.8)',
  },
  controlText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  permissionText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default TranslatorScreen;
