# Sign Language Translator

A mobile application that uses AI to translate sign language (including hand gestures, upper body movements, and facial expressions) in real-time and converts the translations to speech.

## Features

- **Real-time Sign Language Detection**: Capture and process sign language through your device's camera
- **AI-Powered Translation**: Convert sign language gestures to text
- **Text-to-Speech**: Convert translated text to spoken words
- **Customizable Settings**: Adjust detection frequency, accuracy modes, and more
- **Privacy-Focused**: All processing happens on-device, no data sent to external servers

## Technology Stack

- React Native
- Expo
- TensorFlow.js for machine learning
- Expo Camera for video capture
- Expo Speech for text-to-speech

## Prerequisites

- Node.js (v14 or higher)
- npm or Yarn
- Expo CLI
- iOS/Android device or emulator

## Setup and Installation

1. **Clone the repository**
   ```
   git clone <repository-url>
   cd sign-language-translator
   ```

2. **Install dependencies**
   ```
   npm install
   # or
   yarn install
   ```

3. **Add a logo image**
   - Place your logo image in the `assets` folder
   - Name it `logo-placeholder.png`

4. **Start the development server**
   ```
   npm start
   # or
   yarn start
   ```

5. **Run on a device or emulator**
   - Scan the QR code with the Expo Go app on your device
   - Or press 'a' for Android emulator / 'i' for iOS simulator

## Project Structure

```
sign-language-translator/
├── assets/                  # Images, fonts, and other static assets
├── screens/                 # Screen components
│   ├── HomeScreen.js        # App's landing screen
│   ├── TranslatorScreen.js  # Main camera and translation screen
│   ├── SettingsScreen.js    # User preferences
│   └── AboutScreen.js       # App information
├── App.js                   # Main app component with navigation
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## ML Model Integration

This app currently uses a simulated ML model for demonstration purposes. To integrate a real sign language recognition model:

1. Train or obtain a TensorFlow.js compatible model for sign language recognition
2. Place the model files in the `assets/model/` directory
3. Update the model loading code in `App.js` to use your actual model

Example:
```javascript
const modelJson = require('./assets/model/model.json');
const modelWeights = require('./assets/model/weights.bin');
const loadedModel = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
setModel(loadedModel);
```

## Usage

1. Launch the app and grant camera permissions
2. Navigate to the "Translator" screen
3. Position your device to capture your signs
4. The app will display detected signs as text and speak them aloud
5. Use the controls to pause/resume or flip the camera

## Customization

Adjust settings in the Settings screen:
- Turn on/off automatic speech
- Enable high accuracy mode
- Adjust detection frequency
- Show/hide debug information
- Enable/disable vibration feedback

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- TensorFlow team for providing mobile ML capabilities
- React Native and Expo for the development framework

## Contact

For support or inquiries, please contact [manyoj247@gmail.com](mailto:your-email@example.com)
