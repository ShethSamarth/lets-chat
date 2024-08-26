import { Redirect, Tabs } from "expo-router"

import { useAuth } from "@/context/auth-context"

const TabsLayout = () => {
  const { authState } = useAuth()

  if (!authState?.authenticated) return <Redirect href="/(auth)/sign-in" />

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="chats" />
      <Tabs.Screen name="updates" />
      <Tabs.Screen name="contacts" />
      <Tabs.Screen name="calls" />
    </Tabs>
  )
}

export default TabsLayout
