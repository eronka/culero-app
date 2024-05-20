import { View, ViewStyle } from "react-native";
import colors from "../../colors";

export type PercentageBarProps = {
  barColor?: keyof typeof colors;
  value: number;
  height?: ViewStyle["height"];
  maxValue: number;
  backgroundColor?: keyof typeof colors | "transparent";
};
export const PercentageBar = ({
  barColor = "light-primary",
  height = 25,
  backgroundColor = "white",
  value,
  maxValue,
}: PercentageBarProps) => {
  const innerWidthPercentage = (value * 100) / maxValue;
  return (
    <View
      className={`rounded-md`}
      style={{
        height,
        backgroundColor: colors[backgroundColor] || backgroundColor,
        width: "100%",
      }}
    >
      <View
        className={`rounded-md `}
        style={{
          height: "100%",
          backgroundColor: colors[barColor],
          width: innerWidthPercentage ? `${innerWidthPercentage}%` : 0,
        }}
      />
    </View>
  );
};
