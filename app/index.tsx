import { Redirect } from "expo-router"

import { useAuth } from "@/context/auth-context"

const Index = () => {
  const { authState } = useAuth()

  return authState?.authenticated ? (
    <Redirect href="/(tabs)/chats" />
  ) : (
    <Redirect href="/(auth)/sign-in" />
  )
}

export default Index
