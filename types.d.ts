import { TextInputProps, TouchableOpacityProps } from "react-native"

interface ButtonProps extends TouchableOpacityProps {
  title: string
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success"
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success"
  IconLeft?: React.ComponentType<any>
  IconRight?: React.ComponentType<any>
  className?: string
}

interface InputFieldProps extends TextInputProps {
  label?: string
  error?: string
  LeftIcon?: React.ComponentType<any>
  RightIcon?: React.ComponentType<any>
  secureTextEntry?: boolean
  labelStyle?: string
  containerStyle?: string
  inputStyle?: string
  className?: string
}
