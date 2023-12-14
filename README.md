# React Native App - Movie App UI

This repo is a react native app that using Expo, NativeWind / Tailwind CSS (3.3.2), and React Navigation.

## Useful Links
- YouTube Link - https://www.youtube.com/watch?v=Q1xQuCpYIFE
- Tutorial Repo - https://github.com/syednomishah/Movie-App-React-Native
- NativeWind / TailwindCSS / Expo Setup - https://www.nativewind.dev/quick-starts/expo
- TailwindCSS Docs - https://tailwindcss.com/docs/installation

## Project Setup
1. Make sure expo cli is installed and run `expo init`
2. Run the following to install required dev dependencies.
```yarn add @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack axios @react-native-async-storage/async-storage expo-linear-gradient lottie-ios lottie-react-native nativewind tailwindcss@3.3.2 react-native-animatable react-native-feather react-native-heroicons react-native-progress react-native-ratings react-native-safe-area-context react-native-screens react-native-snap-carousel react-native-star-rating react-native-svg```
3. Run `expo start` to run the project. *__NOTE:__ Keep a close eye on the terminal for any comments / logs regarding packages being out of date. You might add versions to a certain dependency or have expo fix by running `npx expo-doctor` to review and checked the project and `npx expo install --check` to fix dependencies.*

## Setting up Tailwind / NativeWind
Make sure to  use version 3.3.2 in this project and make sure to include the following in `App.js` to get it working:

1. Run `npx tailwindcss init` to create `tailwind.config.js` file
2. Open the config file and replace `content` value with the `content: ["./App.{js,jsx,ts,tsx}", "./<custom directory>/**/*.{js,jsx,ts,tsx}"],`

```
import { NativeWindStyleSheet } from 'nativewind'

NativeWindStyleSheet.setOutput({
  default: 'native',
})
```
3. Open `babel.config.js` and add `plugins: ["nativewind/babel"]` after `presets`
4. Stop and Restart server. Might need to clear cache by running `expo start -c`.