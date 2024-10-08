import { useState } from "react"
import { router } from "expo-router"
import axios, { AxiosError } from "axios"
import { Ionicons } from "@expo/vector-icons"
import { setItemAsync } from "expo-secure-store"
import { Alert, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"

const SignIn = () => {
  const { setAuthState } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState({ email: "", password: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSignIn = async () => {
    setIsSubmitting(true)

    try {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

      if (!emailPattern.test(form.email)) {
        setError((prev) => ({ ...prev, email: "Please enter a valid email" }))
      } else {
        setError((prev) => ({ ...prev, email: "" }))
      }
      if (form.password.length < 3) {
        setError((prev) => ({
          ...prev,
          password: "Password too short"
        }))
      } else {
        setError((prev) => ({ ...prev, password: "" }))
      }
      if (!emailPattern.test(form.email) || form.password.length < 3) return

      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/sign-in`,
        form
      )

      await setItemAsync("access_token", res.data.accessToken)
      await setItemAsync("refresh_token", res.data.refreshToken)

      setAuthState({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        authenticated: true
      })

      return router.push("/(tabs)/chats")
    } catch (error) {
      if (error instanceof AxiosError) {
        setForm({ email: "", password: "" })
        return Alert.alert("Error!", error.response?.data.error[0].name)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <View className="px-5 py-20">
          <Text className="text-center font-OutfitSemiBold text-3xl text-primary">
            Login here
          </Text>
          <Text className="py-4 text-center font-OutfitSemiBold text-lg leading-5 text-zinc-500">
            Welcome back you have been missed!
          </Text>

          <View className="py-10">
            <Input
              label="Email"
              placeholder="email@example.com"
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
              error={error.email}
              keyboardType="email-address"
              LeftIcon={() => (
                <Ionicons name="mail-outline" size={30} color="gray" />
              )}
            />
            <View className="z-10 -mb-4 ml-auto">
              <Text
                onPress={() => router.push("/(auth)/forgot-password")}
                className="font-OutfitSemiBold text-base underline"
              >
                Forgot password ?
              </Text>
            </View>
            <Input
              secureTextEntry={!showPassword}
              label="Password"
              placeholder="********"
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
              error={error.password}
              LeftIcon={() => (
                <Ionicons name="lock-closed-outline" size={30} color="gray" />
              )}
              RightIcon={() =>
                showPassword ? (
                  <Ionicons
                    onPress={() => setShowPassword(false)}
                    name="eye-off-outline"
                    size={30}
                    color="gray"
                  />
                ) : (
                  <Ionicons
                    onPress={() => setShowPassword(true)}
                    name="eye-outline"
                    size={30}
                    color="gray"
                  />
                )
              }
            />

            <Button
              title="Sign in"
              className="mt-5"
              onPress={handleSignIn}
              disabled={isSubmitting}
            />
          </View>

          <View className="mx-auto">
            <Text
              onPress={() => router.replace("/(auth)/sign-up")}
              className="font-OutfitSemiBold text-base underline"
            >
              Create new account
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
