import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

import { NativeWindStyleSheet } from 'nativewind'

NativeWindStyleSheet.setOutput({
  default: 'native',
})

export default function App() {
  return (
    <View className="bg-black flex-1 items-center justify-center text-white">
      <StatusBar style="auto" />
      <Text className="text-white">
        Open up App.js to start working on your app!
      </Text>
      <Text className="text-3xl text-white">TailWindCSS is working!</Text>
    </View>
  )
}
