import { View, StyleSheet } from "react-native"
import { FC, memo } from "react"

const App: FC<any> = memo((props: { launchScreen?: string }) => {

  return (
    <View/>
  )
})

const styles = StyleSheet.create({
  gestureHandlerRootView: { flex: 1 },
})

export default App
