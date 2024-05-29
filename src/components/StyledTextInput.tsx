import { TextInput, TextInputProps, View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { Icon, IconProps } from "../icons";
import { twMerge } from "tailwind-merge";
import { StyledPressable, StyledPressableProps } from "./StyledPressable";
import { useState } from "react";
import { StyledText, StyledTextProps } from "./StyledText";

export type StyledTextInputProps = TextInputProps & {
  containerClassName?: ViewProps["className"];
  leftIconProps?: IconProps;
  error?: string;
  label?: string;
  labelProps?: StyledTextProps;
  submitProps?: StyledPressableProps & { onSubmit: (value: string) => void };
};

export const StyledTextInput = ({
  containerClassName,
  submitProps,
  leftIconProps,
  error,
  style,
  editable = true,
  label,
  labelProps,
  ...props
}: StyledTextInputProps) => {
  const [value, setValue] = useState<string>("");

  return (
    <View>
      {label && (
        <StyledText className="italic pl-2" {...labelProps}>
          {label}
        </StyledText>
      )}
      <View
        className={twMerge(
          `bg-white flex rounded-md p-3 flex-row items-center`,
          containerClassName
        )}
      >
        {!!leftIconProps && <Icon {...leftIconProps} />}
        <TextInput
          autoCapitalize="none"
          value={props.value || value}
          textAlignVertical={props.multiline ? "top" : "auto"}
          onChangeText={(newValue) => setValue(newValue)}
          style={[
            {
              fontFamily: "Inter_400Regular",
              flex: 1,
              flexGrow: 1,
              height: "100%",
              //@ts-ignore
              outlineStyle: "none",
            },
            (value === "" && (!props.value || props.value === "")) || !editable
              ? { fontStyle: "italic" }
              : {},
            style,
          ]}
          editable={editable}
          {...props}
        />
        {!!submitProps && (
          <StyledPressable
            onPress={() => submitProps.onSubmit(value)}
            {...submitProps}
          />
        )}
      </View>
      {error && (
        <StyledText color="deep-red" center>
          {error}
        </StyledText>
      )}
    </View>
  );
};
