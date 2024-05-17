import { View } from "react-native";
import { useScreenInfo } from "../../hooks/useScreenInfo";
import { StyledText } from "../StyledText";
import { Icon, IconProps } from "../../icons";
import { HorizontalDivider } from "../HorizontalDivider";

/** This can be used in the screen components. The reason that this is not
 * added in the navigation header is because on mobile the original header shall be kept.
 */

export type DrawerHeaderProps = {
  iconProps?: IconProps;
  title: string;
};
export const DrawerHeader = ({ iconProps, title }: DrawerHeaderProps) => {
  const { isPhone } = useScreenInfo();

  return (
    <>
      <View className="flex-row my-4">
        <StyledText weight={600} xl4={!isPhone} lg={isPhone}>
          {title}
        </StyledText>
        {!!iconProps && (
          <Icon className="ml-4" size={isPhone ? 18 : 30} {...iconProps} />
        )}
      </View>
      <HorizontalDivider className="md:hidden" />
    </>
  );
};
