import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Switch, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  Slider
} from 'react-native';

const SettingsScreen = () => {
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [useHighAccuracy, setUseHighAccuracy] = useState(false);
  const [detectionFrequency, setDetectionFrequency] = useState(1.0);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [vibrationFeedback, setVibrationFeedback] = useState(true);
  
  const handleReset = () => {
    Alert.alert(
      "Reset Settings",
      "Are you sure you want to reset all settings to default values?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Reset", 
          onPress: () => {
            setAutoSpeak(true);
            setUseHighAccuracy(false);
            setDetectionFrequency(1.0);
            setShowDebugInfo(false);
            setVibrationFeedback(true);
          },
          style: "destructive"
        }
      ]
    );
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Translation Settings</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Auto speak translations</Text>
            <Text style={styles.settingDescription}>
              Automatically speak detected sign language using text-to-speech
            </Text>
          </View>
          <Switch
            value={autoSpeak}
            onValueChange={setAutoSpeak}
            trackColor={{ false: "#767577", true: "#4a90e2" }}
            thumbColor={autoSpeak ? "#f5f5f5" : "#f4f3f4"}
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>High accuracy mode</Text>
            <Text style={styles.settingDescription}>
              Uses more processing power but improves translation accuracy
            </Text>
          </View>
          <Switch
            value={useHighAccuracy}
            onValueChange={setUseHighAccuracy}
            trackColor={{ false: "#767577", true: "#4a90e2" }}
            thumbColor={useHighAccuracy ? "#f5f5f5" : "#f4f3f4"}
          />
        </View>
        
        <View style={styles.settingSliderRow}>
          <Text style={styles.settingTitle}>Detection frequency</Text>
          <Text style={styles.settingDescription}>
            How often to check for new signs (higher values may affect performance)
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0.2}
            maximumValue={2.0}
            step={0.1}
            value={detectionFrequency}
            onValueChange={setDetectionFrequency}
            minimumTrackTintColor="#4a90e2"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#4a90e2"
          />
          <Text style={styles.sliderValue}>{detectionFrequency.toFixed(1)}x</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Show debug information</Text>
            <Text style={styles.settingDescription}>
              Display technical details about translations and model performance
            </Text>
          </View>
          <Switch
            value={showDebugInfo}
            onValueChange={setShowDebugInfo}
            trackColor={{ false: "#767577", true: "#4a90e2" }}
            thumbColor={showDebugInfo ? "#f5f5f5" : "#f4f3f4"}
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Vibration feedback</Text>
            <Text style={styles.settingDescription}>
              Vibrate when a new sign is detected
            </Text>
          </View>
          <Switch
            value={vibrationFeedback}
            onValueChange={setVibrationFeedback}
            trackColor={{ false: "#767577", true: "#4a90e2" }}
            thumbColor={vibrationFeedback ? "#f5f5f5" : "#f4f3f4"}
          />
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.resetButton}
        onPress={handleReset}
      >
        <Text style={styles.resetButtonText}>Reset to Defaults</Text>
      </TouchableOpacity>
      
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  section: {
    backgroundColor: 'white',
    margin: 16,
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
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingSliderRow: {
    paddingVertical: 12,
  },
  settingTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 10,
  },
  sliderValue: {
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '500',
    color: '#4a90e2',
  },
  resetButton: {
    backgroundColor: '#ff6b6b',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  versionContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  versionText: {
    color: '#999',
    fontSize: 14,
  },
});

export default SettingsScreen;
