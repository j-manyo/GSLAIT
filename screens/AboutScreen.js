import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Linking 
} from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../assets/logo-placeholder.png')} 
          style={styles.logo}
          onError={(e) => console.log('Logo image not found')}
        />
        <Text style={styles.title}>Sign Language Translator</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.paragraph}>
          This application uses artificial intelligence to translate sign language into text and speech in real-time. 
          It can recognize hand gestures, facial expressions, and upper body movements to provide accurate translations.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.stepContainer}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>1</Text>
          </View>
          <Text style={styles.stepText}>
            The app captures video from your device's camera
          </Text>
        </View>
        
        <View style={styles.stepContainer}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
          <Text style={styles.stepText}>
            An AI model processes the video to detect sign language
          </Text>
        </View>
        
        <View style={styles.stepContainer}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <Text style={styles.stepText}>
            The detected signs are translated into text
          </Text>
        </View>
        
        <View style={styles.stepContainer}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>4</Text>
          </View>
          <Text style={styles.stepText}>
            Text-to-speech technology converts the text to spoken words
          </Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technology</Text>
        <Text style={styles.paragraph}>
          This app is built using:
        </Text>
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>• React Native & Expo framework</Text>
          <Text style={styles.bulletPoint}>• TensorFlow.js for machine learning</Text>
          <Text style={styles.bulletPoint}>• Neural network models trained on sign language datasets</Text>
          <Text style={styles.bulletPoint}>• Real-time computer vision techniques</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy</Text>
        <Text style={styles.paragraph}>
          We respect your privacy. All video processing happens on your device - no video data is sent to external servers.
          The app only requires camera permission to function.
        </Text>
      </View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => Linking.openURL('https://example.com/help')}
        >
          <Text style={styles.buttonText}>Help & Support</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => Linking.openURL('https://example.com/privacy')}
        >
          <Text style={styles.buttonText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2025 Sign Language Translator App
        </Text>
        <Text style={styles.footerText}>
          Made with ♥ to bridge communication gaps
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
    backgroundColor: 'white',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  version: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  section: {
    backgroundColor: 'white',
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  stepNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4a90e2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  stepNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  bulletPoints: {
    marginTop: 10,
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
  },
  button: {
    backgroundColor: '#5c6bc0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
});

export default AboutScreen;
