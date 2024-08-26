import { TouchableOpacity, Text, ActivityIndicator } from "react-native"

import { ButtonProps } from "@/types"

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500"
    case "danger":
      return "bg-rose-500"
    case "success":
      return "bg-green-500"
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]"
    default:
      return "bg-primary/80"
  }
}

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black"
    case "secondary":
      return "text-gray-100"
    case "danger":
      return "text-rose-100"
    case "success":
      return "text-green-100"
    default:
      return "text-white"
  }
}

export const Button = ({
  onPress,
  title,
  disabled = false,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`w-full flex-row items-center justify-center rounded-xl p-3 ${disabled && "opacity-60"} ${getBgVariantStyle(bgVariant)} ${className}`}
      {...props}
    >
      {IconLeft && <IconLeft />}
      {disabled ? (
        <ActivityIndicator size={30} color="white" />
      ) : (
        <Text
          className={`font-OutfitBold text-lg font-bold ${getTextVariantStyle(textVariant)}`}
        >
          {title}
        </Text>
      )}
      {IconRight && <IconRight />}
    </TouchableOpacity>
  )
}
