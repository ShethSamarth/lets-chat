import { useState } from "react"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const ForgotPassword = () => {
  const [form, setForm] = useState({ email: "" })
  const [error, setError] = useState({ email: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleForgotPassword = () => {
    setIsSubmitting(true)

    try {
      const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

      if (!emailPattern.test(form.email)) {
        return setError((prev) => ({
          ...prev,
          email: "Please enter a valid email"
        }))
      } else {
        setError((prev) => ({ ...prev, email: "" }))
      }

      // Simulate API call
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <View className="px-5 py-20">
          <Text className="text-center font-OutfitSemiBold text-3xl text-primary">
            Forgot password
          </Text>
          <Text className="py-4 text-center font-OutfitSemiBold text-lg leading-5 text-zinc-500">
            Enter the email associated with your account
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

            <Button
              title="Reset password"
              className="mt-5"
              onPress={handleForgotPassword}
              disabled={isSubmitting}
            />
          </View>

          <View className="mx-auto">
            <Text
              onPress={() => router.replace("/(auth)/sign-in")}
              className="font-OutfitSemiBold text-base underline"
            >
              Remember password
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ForgotPassword
