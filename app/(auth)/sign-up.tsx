import { useState } from "react"
import { router } from "expo-router"
import axios, { AxiosError } from "axios"
import { Ionicons } from "@expo/vector-icons"
import { Alert, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [error, setError] = useState({ name: "", email: "", password: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSignUp = async () => {
    setIsSubmitting(true)

    try {
      const namePattern = /^[a-zA-Z ]+$/
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      const passwordPattern =
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

      if (!namePattern.test(form.name)) {
        setError((prev) => ({ ...prev, name: "Please enter a valid name" }))
      } else {
        setError((prev) => ({ ...prev, name: "" }))
      }
      if (!emailPattern.test(form.email)) {
        setError((prev) => ({ ...prev, email: "Please enter a valid email" }))
      } else {
        setError((prev) => ({ ...prev, email: "" }))
      }
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
        !namePattern.test(form.name) ||
        !emailPattern.test(form.email) ||
        !passwordPattern.test(form.password)
      )
        return

      await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/sign-up`, form)

      return router.push({
        pathname: "/(auth)/otp",
        params: { email: form.email }
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        setForm({ name: "", email: "", password: "" })
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
            Create Account
          </Text>
          <Text className="py-4 text-center font-OutfitSemiBold text-lg leading-5 text-zinc-500">
            Sign up now to connect & chat with other great users!
          </Text>

          <View className="py-10">
            <Input
              label="Name"
              placeholder="Jhon Doe"
              value={form.name}
              onChangeText={(value) => setForm({ ...form, name: value })}
              error={error.name}
              LeftIcon={() => (
                <Ionicons name="person-outline" size={30} color="gray" />
              )}
            />
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
              title="Sign up"
              className="mt-5"
              onPress={handleSignUp}
              disabled={isSubmitting}
            />
          </View>

          <View className="mx-auto">
            <Text
              onPress={() => router.replace("/(auth)/sign-in")}
              className="font-OutfitSemiBold text-base underline"
            >
              Already have an account ?
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
