import { ReactElement } from "react";
import { View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { twMerge } from "tailwind-merge";
import { HorizontalDivider } from "./HorizontalDivider";
export type CardProps = {
  headerComponent?: ReactElement;
  footerComponent?: ReactElement;
  bodyComponent?: ReactElement;
  className?: ViewProps["className"];
  headerClassName?: ViewProps["className"];
  footerClassName?: ViewProps["className"];
  bodyClassName?: ViewProps["className"];
};
export const Card = ({
  headerComponent,
  footerComponent,
  bodyComponent,
  className,
  headerClassName,
  footerClassName,
  bodyClassName,
}: CardProps) => {
  return (
    <View className={twMerge("bg-white rounded-lg w-full p-4", className)}>
      {!!headerComponent && (
        <View className={twMerge("", headerClassName)}>{headerComponent}</View>
      )}
      {!!headerComponent && !!bodyComponent && <HorizontalDivider />}
      {!!bodyComponent && (
        <View className={twMerge("", bodyClassName)}>{bodyComponent}</View>
      )}
      {!!footerComponent && !!bodyComponent && <HorizontalDivider />}
      {!!footerComponent && (
        <View className={twMerge("", footerClassName)}>{footerComponent}</View>
      )}
    </View>
  );
};
