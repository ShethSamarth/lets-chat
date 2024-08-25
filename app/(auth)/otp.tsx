import { useState } from "react"
import { OtpInput } from "react-native-otp-entry"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Otp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleOtp = (code: string) => {
    setIsSubmitting(true)

    try {
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
