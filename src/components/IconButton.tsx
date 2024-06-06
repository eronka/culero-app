import { Pressable, PressableProps, View, ViewProps } from "react-native";
import { Icon, IconProps } from "../icons";
import { StyledText } from "./StyledText";
import { twMerge } from "tailwind-merge";

export type IconButtonProps = {
  iconProps: IconProps;
  label?: string;
  className?: ViewProps["className"];
} & PressableProps;

export const IconButton = ({
  iconProps,
  label,
  className,
  ...props
}: IconButtonProps) => {
  return (
    <View className={twMerge("flex items-center justify-center", className)}>
      <Pressable {...props}>
        <Icon {...iconProps} />
      </Pressable>
      {label && <StyledText>{label}</StyledText>}
    </View>
  );
};
