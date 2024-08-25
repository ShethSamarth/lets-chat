import { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const ResetPassword = () => {
  const [form, setForm] = useState({ password: "", confirmPassword: "" })
  const [error, setError] = useState({ password: "", confirmPassword: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleResetPassword = () => {
    setIsSubmitting(true)

    try {
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
        form.password !== form.confirmPassword ||
        !passwordPattern.test(form.password)
      )
        return

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
            Reset password
          </Text>
          <Text className="py-4 text-center font-OutfitSemiBold text-lg leading-5 text-zinc-500">
            Enter a new password
          </Text>

          <View className="py-10">
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
