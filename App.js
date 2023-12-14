import AppNavigation from './src/navigation'

import { NativeWindStyleSheet } from 'nativewind'

NativeWindStyleSheet.setOutput({
  default: 'native',
})

export default App = () => {
  return <AppNavigation />
}
