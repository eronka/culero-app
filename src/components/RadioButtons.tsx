import { Pressable, View, ViewProps } from "react-native";
import { StyledText } from "./StyledText";
import colors from "../../colors";
import { CheckBox } from "./Checkbox";
import { twMerge } from "tailwind-merge";

export type OptionProps = {
  value: any;
  selected: boolean;
  label: string;
};

export type RadioButtonsProps = {
  onSelect: (option: OptionProps) => void;
  options: OptionProps[];
  className?: ViewProps["className"];
};
export const RadioButtons = ({
  options,
  onSelect,
  className,
}: RadioButtonsProps) => {
  return (
    <View className={twMerge("space-y-4", className)}>
      {options.map((option) => (
        <Pressable
          onPress={() => onSelect(option)}
          className="flex-row items-center"
        >
          <CheckBox
            value={option.selected}
            style={{ borderRadius: 99 }}
            checkMarkSize={18}
          />
          <StyledText weight={600} lg className="ml-4">
            {option.label}
          </StyledText>
        </Pressable>
      ))}
    </View>
  );
};
