import { View, ViewProps } from "react-native";
import colors from "../../../../colors";
import { twMerge } from "tailwind-merge";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useCallback } from "react";
import { useScreenInfo } from "../../../hooks/useScreenInfo";

export type StepIndicatorProps = {
  steps?: number;
  x: SharedValue<number>;
  stepSize?: number;
  className?: ViewProps["className"];
};
export const StepIndicator = ({
  steps = 3,
  x,
  stepSize = 12,
  className,
}: StepIndicatorProps) => {
  const { width: SCREEN_WIDTH } = useScreenInfo();

  const PaginationComponent = useCallback(
    ({ index }: { index: number }) => {
      const itemRnStyle = useAnimatedStyle(() => {
        const width = interpolate(
          x.value,
          [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          [stepSize, stepSize * 2, stepSize],
          Extrapolation.CLAMP
        );

        return {
          width,
        };
      }, [x]);
      return (
        <Animated.View
          style={[
            itemRnStyle,
            {
              height: stepSize,
              borderRadius: 24,
              marginRight: index === steps - 1 ? 0 : 6,
              backgroundColor: colors["light-primary"],
            },
          ]}
        />
      );
    },
    [x]
  );

  return (
    <View className={twMerge("flex-row", className)}>
      {Array(steps)
        .fill(0)
        .map((_, index) => {
          return <PaginationComponent index={index} key={`step-${index}`} />;
        })}
    </View>
  );
};
