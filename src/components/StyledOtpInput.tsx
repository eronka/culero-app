import { colorScheme } from "nativewind";
import { View, ViewProps, ViewStyle } from "react-native";
import { OtpInput, OtpInputProps } from "react-native-otp-entry";
import colors from "../../colors";
import { twMerge } from "tailwind-merge";

export type StyledOtpInput = {
  containerClassName?: ViewProps["className"];
  height?: number;
  width?: number;
  margin?: number;
  onChangeText?: (value: string) => void;
};

export const StyledOtpInput = ({
  containerClassName,
  onChangeText,
  height = 72,
  width = 82,
  margin = 8,
}: StyledOtpInput) => (
  <View className={twMerge("container flex-shrink", containerClassName)}>
    <OtpInput
      numberOfDigits={6}
      onTextChange={onChangeText}
      onFilled={(text) => console.log(`OTP is ${text}`)}
      // https://github.com/anday013/react-native-otp-entry
      theme={{
        containerStyle: {
          display: "flex",
          flexShrink: 1,
        },
        pinCodeContainerStyle: {
          width,
          height,
          margin,
          flexShrink: 1,
          backgroundColor: colors.grayF2,
          borderWidth: 0,
        },
        pinCodeTextStyle: {
          fontFamily: "Inter_400Regular",
        },
        focusedPinCodeContainerStyle: {
          borderWidth: 1,
          borderColor: colors.primary,
        },
        focusStickStyle: {
          backgroundColor: colors.primary,
        },
      }}
    />
  </View>
);
