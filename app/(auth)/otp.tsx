import { useState } from "react"
import axios, { AxiosError } from "axios"
import { OtpInput } from "react-native-otp-entry"
import { router, useLocalSearchParams } from "expo-router"
import { Alert, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Otp = () => {
  const { email } = useLocalSearchParams<{ email: string }>()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleOtp = async (code: string) => {
    setIsSubmitting(true)

    try {
      if (code.length !== 6)
        return Alert.alert("Invalid code", "Enter a valid code")

      await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/verify-email`, {
        email,
        code
      })

      Alert.alert("Success!", "Email verified successfully")

      return router.replace("/(auth)/sign-in")
    } catch (error) {
      if (error instanceof AxiosError) {
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
            Otp verification
          </Text>
          <Text className="py-4 text-center font-OutfitSemiBold text-lg leading-5 text-zinc-500">
            Please enter the 6 digit code that is sent to your email address
          </Text>

          <View className="py-10">
            <OtpInput
              autoFocus
              type="numeric"
              numberOfDigits={6}
              focusColor="#1F41BB"
              onFilled={handleOtp}
              disabled={isSubmitting}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Otp
