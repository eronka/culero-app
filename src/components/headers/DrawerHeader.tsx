import { View } from "react-native";
import { useScreenInfo } from "../../hooks/useScreenInfo";
import { StyledText } from "../StyledText";
import { Icon, IconProps } from "../../icons";
import { HorizontalDivider } from "../HorizontalDivider";
import { ReactElement } from "react";

/** This can be used in the screen components. The reason that this is not
 * added in the navigation header is because on mobile the original header shall be kept.
 */

export type DrawerHeaderProps = {
  iconProps?: IconProps;
  title: string;
  leftIcon?: ReactElement;
};
export const DrawerHeader = ({
  iconProps,
  title,
  leftIcon,
}: DrawerHeaderProps) => {
  const { isPhone } = useScreenInfo();
  console.log(!!leftIcon);
  return (
    <>
      <View className="mb-4">
        <View className="hidden md:block self-start py-4">
          {!!leftIcon && leftIcon}
        </View>
        <View className="flex-row">
          <StyledText weight={600} xl4={!isPhone} lg={isPhone}>
            {title}
          </StyledText>
          {!!iconProps && (
            <Icon className="ml-4" size={isPhone ? 18 : 30} {...iconProps} />
          )}
        </View>
      </View>
      <HorizontalDivider className="md:hidden" />
    </>
  );
};
