import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  TextProps,
} from "react-native";
import React, { Children } from "react";
import { StyledText, StyledTextProps, type TextVariant } from "./StyledText";
import { VariantProps, tv } from "tailwind-variants";
import { Icon, IconProps } from "../icons";
import { twMerge } from "tailwind-merge";

const button = tv({
  base: "rounded-md p-2 px-6 flex items-center justify-center flex-row disabled:bg-opacity-50",
  variants: {
    color: {
      light: "bg-light-primary",
      white: "bg-white",
      primary: "bg-primary weight-900",
      transparent: "bg-transparent",
    },
    // full width button
    fw: {
      true: "w-full",
    },
    rounded: {
      true: "rounded-3xl",
    },
  },
  defaultVariants: { color: "light" },
});

type ButtonVariants = VariantProps<typeof button>;

export type StyledPressableProps = PressableProps &
  ButtonVariants & {
    textVariant?: TextVariant;
    textClassName?: TextProps["className"];
    leftIconProps?: IconProps;
    rightIconProps?: IconProps;
    children?: React.ReactNode;
    isLoading?: boolean;
  };
export const StyledPressable = ({
  color,
  fw,
  rounded,
  className,
  textVariant,
  textClassName,
  leftIconProps,
  rightIconProps,
  isLoading,
  disabled,
  children,
  ...props
}: StyledPressableProps) => (
  <Pressable
    className={button({ color, fw, rounded, className })}
    style={disabled ? { opacity: 0.5 } : { opacity: 1 }}
    disabled={isLoading || disabled}
    {...props}
  >
    {leftIconProps && <Icon {...leftIconProps} />}
    {!isLoading && (
      <StyledText
        weight={500}
        {...textVariant}
        className={twMerge("text-center", textClassName)}
      >
        {children}
      </StyledText>
    )}
    {isLoading && <ActivityIndicator className="self-center" color="#000" />}
    {rightIconProps && <Icon {...rightIconProps} />}
  </Pressable>
);
