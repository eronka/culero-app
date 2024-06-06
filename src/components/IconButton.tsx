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
  const btnSize = (iconProps.size || 22) + 14;
  return (
    <View className={twMerge("flex items-center justify-center", className)}>
      <Pressable
        style={{ height: btnSize, width: btnSize }}
        {...props}
        className="rounded-full hover:bg-grayF2 items-center justify-center"
      >
        <Icon {...iconProps} />
      </Pressable>
      {label && <StyledText>{label}</StyledText>}
    </View>
  );
};
