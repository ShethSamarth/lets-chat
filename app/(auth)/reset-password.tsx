import { useState } from "react"
import axios, { AxiosError } from "axios"
import { Ionicons } from "@expo/vector-icons"
import { OtpInput } from "react-native-otp-entry"
import { router, useLocalSearchParams } from "expo-router"
import { Alert, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const ResetPassword = () => {
  const { email } = useLocalSearchParams<{ email: string }>()

  const [form, setForm] = useState({
    code: "",
    password: "",
    confirmPassword: ""
  })
  const [error, setError] = useState({
    code: "",
    password: "",
    confirmPassword: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleResetPassword = async () => {
    setIsSubmitting(true)

    try {
      if (form.code.length !== 6) {
        setError((prev) => ({
          ...prev,
          code: "Code needs to be exact 6 digits"
        }))
      } else {
        setError((prev) => ({ ...prev, code: "" }))
      }
      if (form.password !== form.confirmPassword) {
        setError((prev) => ({
          ...prev,
          confirmPassword: "Password does not match"
        }))
      } else {
        setError((prev) => ({ ...prev, confirmPassword: "" }))
      }
      const passwordPattern =
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

      if (!passwordPattern.test(form.password)) {
        setError((prev) => ({
          ...prev,
          password:
            "Password must be atleast 8 characters, contain a uppercase letter, lowercase letter, special character and number"
        }))
      } else {
        setError((prev) => ({ ...prev, password: "" }))
      }

      if (
        form.code.length !== 6 ||
        form.password !== form.confirmPassword ||
        !passwordPattern.test(form.password)
      )
        return

      await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/reset-password`,
        { email, code: form.code, password: form.password }
      )

      Alert.alert(
        "Success!",
        "Password has been reset. You can now sign in with your new password."
      )

      return router.replace("/(auth)/sign-in")
    } catch (error) {
      if (error instanceof AxiosError) {
        // setForm({ ...form, password: "", confirmPassword: "" })
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
            Reset password
          </Text>
          <Text className="py-4 text-center font-OutfitSemiBold text-lg leading-5 text-zinc-500">
            Enter a new password
          </Text>

          <View className="py-10">
            <Text className="mb-1 font-OutfitSemiBold text-lg text-primary">
              Code
            </Text>
            <OtpInput
              autoFocus
              type="numeric"
              numberOfDigits={6}
              focusColor="#1F41BB"
              disabled={isSubmitting}
              onTextChange={(text) => setForm({ ...form, code: text })}
            />
            {error.code && (
              <Text className="font-Outfit text-base text-rose-500">
                {error.code}
              </Text>
            )}
            <Input
              secureTextEntry
              label="Password"
              placeholder="********"
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
              error={error.password}
              LeftIcon={() => (
                <Ionicons name="lock-closed-outline" size={30} color="gray" />
              )}
            />
            <Input
              secureTextEntry
              label="Confirm Password"
              placeholder="********"
              value={form.confirmPassword}
              onChangeText={(value) =>
                setForm({ ...form, confirmPassword: value })
              }
              error={error.confirmPassword}
              LeftIcon={() => (
                <Ionicons name="lock-closed-outline" size={30} color="gray" />
              )}
            />

            <Button
              title="Reset password"
              className="mt-5"
              onPress={handleResetPassword}
              disabled={isSubmitting}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ResetPassword
