import { Pressable, PressableProps, TextProps } from "react-native";
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
  children,
  ...props
}: StyledPressableProps) => (
  <Pressable
    className={button({ color, fw, rounded, className })}
    style={props.disabled ? { opacity: 0.5 } : { opacity: 1 }}
    {...props}
  >
    {leftIconProps && <Icon {...leftIconProps} />}
    <StyledText
      weight={500}
      {...textVariant}
      className={twMerge("text-center", textClassName)}
    >
      {children}
    </StyledText>
    {rightIconProps && <Icon {...rightIconProps} />}
  </Pressable>
);
