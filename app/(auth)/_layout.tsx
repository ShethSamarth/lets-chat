import { Redirect, Stack } from "expo-router"

import { useAuth } from "@/context/auth-context"

const AuthLayout = () => {
  const { authState } = useAuth()

  if (authState?.authenticated) return <Redirect href="/(tabs)/chats" />

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="reset-password" />
    </Stack>
  )
}

export default AuthLayout
