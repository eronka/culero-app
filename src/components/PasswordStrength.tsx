import { View } from "react-native";
import { PercentageBar } from "./PercentageBar";
import { StyledText } from "./StyledText";

export type PasswordStrengthProps = {
  type: "weak" | "strong";
};

export const PasswordStrength = ({ type }: PasswordStrengthProps) => {
  return (
    <View className="w-full">
      <PercentageBar
        value={type === "weak" ? 50 : 100}
        maxValue={100}
        height={9}
        barColor={type === "weak" ? "red" : "green"}
      />
      <View className="flex align-center">
        <StyledText weight={600}>Password strength: {type}.</StyledText>
        {type == "weak" && (
          <StyledText className="text-sm" weight={300} color="gray35">
            Try lengthening it or adding numbers and symbols.
          </StyledText>
        )}
      </View>
    </View>
  );
};
