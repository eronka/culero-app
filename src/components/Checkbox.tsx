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
  disabled?: boolean;
  style?: ViewProps["style"];
};

export const CheckBox = ({
  size = 24,
  checkMarkSize = 24,
  label,
  description,
  color = "primary",
  value,
  onPress,
  disabled,
  className,
  style,
}: CheckboxProps) => {
  return (
    <View className={twMerge("flex-row", className)}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={[
          {
            height: size,
            width: size,
            borderRadius: 5,
            borderColor: colors[color],
            borderWidth: 2,
            justifyContent: "center",
            alignItems: "center",
          },
          disabled ? { opacity: 0.5 } : { opacity: 1 },
          style,
        ]}
      >
        {value && <Icon name="checkmark" color={color} size={checkMarkSize} />}
      </Pressable>
      <View className="flex-1 ml-2">
        {label && (
          <StyledText
            weight={500}
            style={disabled ? { fontStyle: "italic" } : {}}
          >
            {label}
          </StyledText>
        )}
        {description && (
          <StyledText
            className="text-sm"
            color="gray33"
            style={disabled ? { fontStyle: "italic" } : {}}
          >
            {description}
          </StyledText>
        )}
      </View>
    </View>
  );
};
