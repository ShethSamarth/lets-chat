import { router } from "expo-router"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Button } from "@/components/ui/button"

const NotFoundScreen = () => {
  return (
    <SafeAreaView className="h-full justify-center bg-white p-10">
      <View className="relative">
        <Text className="font-OutfitExtraBold text-7xl text-primary">404</Text>
        <View className="absolute -left-32 -top-20 -z-10 h-52 w-52 rounded-bl-[4444px] rounded-br-[7777px] rounded-tl-[4444px] rounded-tr-[4444px] bg-primary/20" />
      </View>

      <View className="py-7">
        <Text className="font-OutfitExtraLight text-4xl">OOOps!</Text>
        <Text className="font-OutfitExtraLight text-4xl">Page Not Found</Text>
      </View>

      <View className="pb-7">
        <Text className="font-OutfitLight text-base text-zinc-400">
          This page does&apos;t exist or was removed!
        </Text>
        <Text className="font-OutfitLight text-base text-zinc-400">
          We suggest you back to home
        </Text>
      </View>

      <Button title="Back to homepage" onPress={() => router.push("/")} />
    </SafeAreaView>
  )
}

export default NotFoundScreen
