# Shikshasetu App

A React Native app built with Expo that replicates a government educational platform interface.

## Features

- **Splash Screen**: Government-style splash screen with emblem and "shikshasetu" branding
- **Main Interface**: 
  - Header with government emblem and user/notification icons
  - Clean white content area
  - Bottom navigation with 4 tabs: Home, Guidance, Colleges & Colleges, Updates

## Setup and Run

1. Make sure you have Node.js installed
2. Install Expo CLI globally (if not already installed):
   ```
   npm install -g expo-cli
   ```
3. Navigate to the project directory:
   ```
   cd shikshasetu-app
   ```
4. Start the development server:
   ```
   npm start
   ```
   or
   ```
   npx expo start
   ```

## Running on Device

- **Android**: Install Expo Go from Google Play Store, scan QR code
- **iOS**: Install Expo Go from App Store, scan QR code
- **Web**: Press 'w' in the terminal to open in web browser

## Project Structure

```
shikshasetu-app/
├── App.js                 # Main app entry point
├── components/
│   ├── SplashScreen.js    # Government-style splash screen
│   └── MainScreen.js      # Main app interface
└── package.json
```

## Color Scheme

- Primary Blue: `#1E3A5F` (Government blue)
- Active Blue: `#4A90E2` (Navigation active state)
- Background: `#F5F5F5` and `#FFFFFF`
- Text: Various grays for hierarchy

## Next Steps

You mentioned you'll provide further instructions. The current implementation includes:
- ✅ Splash screen with government emblem
- ✅ "shikshasetu" text in white
- ✅ Main interface matching the provided design
- ✅ Header with emblem and user icons
- ✅ Bottom navigation tabs

The app is ready for additional features and customization as per your requirements.