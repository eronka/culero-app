import { Text, TextProps } from "react-native";
import { tv, type VariantProps } from "tailwind-variants";

import React from "react";
import { twMerge } from "tailwind-merge";

const text = tv({
  base: "text-base",
  variants: {
    weight: {
      100: "font-inter-thin",
      200: "font-inter-extra-light",
      300: "font-inter-light",
      400: "font-inter-regular",
      500: "font-inter-medium",
      600: "font-inter-semi-bold",
      700: "font-inter-bold",
      800: "font-inter-extra-bold",
      900: "font-inter-black",
    },
    color: {
      darkgrey: "text-dark-grey",
      black: "text-black",
      red: "text-red",
      white: "text-white",
      gray35: "text-gray35",
      nickel: "text-nickel-gray",
      gray83: "text-gray83",
      gray33: "text-gray33",
      gray38: "text-gray38",
      gray39: "text-gray39",
      primary: "text-primary",
      white7: "text-white7",
      whiteFA: "text-whiteFA",
      gray7C: "text-gray7C",
      gray65: "text-gray65",
      "deep-red": "text-deep-red",
      "light-primary": "text-light-primary",
    },
    pressable: {
      true: "hover:underline cursor-pointer",
    },
    sm: {
      true: "text-sm",
    },
    xs: {
      true: "text-xs",
    },
    md: {
      true: "text-md",
    },
    lg: {
      true: "text-lg",
    },
    xl: {
      true: "text-xl",
    },
    xl2: {
      true: "text-2xl",
    },
    xl3: {
      true: "text-3xl",
    },
    xl4: {
      true: "text-4xl",
    },
    xl5: {
      true: "text-5xl",
    },
    xl6: {
      true: "text-6xl ",
    },
    xl7: {
      true: "text-7xl",
    },
    xl8: {
      true: "text-8xl",
    },
    xl9: {
      true: "text-9xl",
    },
    center: {
      true: "text-center",
    },
  },
  defaultVariants: {
    weight: 400,
  },
});

export type TextVariant = VariantProps<typeof text>;

export type StyledTextProps = TextProps & TextVariant;
export const StyledText = ({
  weight,
  color,
  sm,
  xs,
  md,
  lg,
  xl,
  xl2,
  xl3,
  xl4,
  xl5,
  xl6,
  xl7,
  xl8,
  xl9,
  center,
  onPress,
  className,
  ...props
}: StyledTextProps) => {
  return (
    <Text
      className={twMerge(
        text({
          weight,
          color,
          sm,
          xs,
          md,
          lg,
          xl,
          xl2,
          xl3,
          xl4,
          xl5,
          xl6,
          xl7,
          xl8,
          xl9,
          pressable: onPress ? true : undefined,
          center,
        }),
        className
      )}
      onPress={onPress}
      {...props}
    />
  );
};
