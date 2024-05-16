import { View, ViewProps } from "react-native";
import colors from "../../../../colors";
import { twMerge } from "tailwind-merge";

export type StepIndicatorProps = {
  steps?: number;
  currentStep: number;
  stepSize?: number;
  className?: ViewProps["className"];
};
export const StepIndicator = ({
  steps = 3,
  currentStep,
  stepSize = 12,
  className,
}: StepIndicatorProps) => {
  Array(steps).map((_, index) => "lawla");

  return (
    <View className={twMerge("flex-row", className)}>
      {Array(steps)
        .fill(0)
        .map((_, index) => {
          return (
            <View
              key={`step-${index}`}
              style={{
                width: currentStep == index + 1 ? stepSize * 2 : stepSize,
                height: stepSize,
                borderRadius: 24,
                marginRight: index + 1 === steps ? 0 : 6,
                backgroundColor: colors["light-primary"],
              }}
            />
          );
        })}
    </View>
  );
};
