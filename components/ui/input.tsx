import {
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from "react-native"

import { InputFieldProps } from "@/types"

export const Input = ({
  label,
  error,
  LeftIcon,
  RightIcon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          {label && (
            <Text
              className={`mb-1 font-OutfitSemiBold text-lg text-primary ${labelStyle}`}
            >
              {label}
            </Text>
          )}
          <View
            className={`flex-row items-center justify-start rounded-xl border-2 border-transparent bg-primaryForeground px-2 focus:border-2 focus:border-primary ${containerStyle}`}
          >
            {LeftIcon && <LeftIcon />}
            <TextInput
              className={`flex-1 px-4 py-3 font-OutfitSemiBold text-base ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
            {RightIcon && <RightIcon />}
          </View>
          {error && (
            <Text className="font-Outfit text-base text-rose-500">{error}</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
