import { Pressable, View } from "react-native";
import colors from "../../colors";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { twMerge } from "tailwind-merge";
import { Icon } from "../icons";
import { StyledText } from "./StyledText";

export type CheckboxProps = {
  size?: number;
  label?: string;
  className?: ViewProps["className"];
  description?: string;
  color?: keyof typeof colors;
  value: boolean;
  onPress?: () => void;
  checkMarkSize?: number;
};

export const CheckBox = ({
  size = 24,
  checkMarkSize = 24,
  label,
  description,
  color = "primary",
  value,
  onPress,
  className,
}: CheckboxProps) => {
  return (
    <View className={twMerge("flex-row", className)}>
      <Pressable
        onPress={onPress}
        style={{
          height: size,
          width: size,
          borderRadius: 5,
          borderColor: colors[color],
          borderWidth: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value && <Icon name="checkmark" color={color} size={checkMarkSize} />}
      </Pressable>
      <View className="flex-1 ml-2">
        {label && <StyledText weight={500}>{label}</StyledText>}
        {description && (
          <StyledText className="text-sm" color="gray33">
            {description}
          </StyledText>
        )}
      </View>
    </View>
  );
};
