import "react-native-reanimated"
import { useEffect } from "react"
import { Stack } from "expo-router"
import { useFonts } from "expo-font"
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen"

import { AuthProvider, useAuth } from "@/context/auth-context"

preventAutoHideAsync()

const RootLayout = () => {
  const [loaded, error] = useFonts({
    "Outfit-ExtraLight": require("@/assets/fonts/Outfit-ExtraLight.ttf"),
    "Outfit-Light": require("@/assets/fonts/Outfit-Light.ttf"),
    Outfit: require("@/assets/fonts/Outfit-Regular.ttf"),
    "Outfit-Medium": require("@/assets/fonts/Outfit-Medium.ttf"),
    "Outfit-SemiBold": require("@/assets/fonts/Outfit-SemiBold.ttf"),
    "Outfit-Bold": require("@/assets/fonts/Outfit-Bold.ttf"),
    "Outfit-ExtraBold": require("@/assets/fonts/Outfit-ExtraBold.ttf")
  })

  if (!loaded && !error) return null

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  )
}

const RootNavigator = () => {
  const { authState } = useAuth()

  useEffect(() => {
    if (authState !== null) hideAsync()
  }, [authState])

  if (authState === null) return null

  return (
    <Stack screenOptions={{ headerShown: false, statusBarStyle: "dark" }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  )
}

export default RootLayout
