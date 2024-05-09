import { View } from "react-native";
import { StyledText } from "./StyledText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useScreenInfo } from "../hooks/useScreenInfo";

export const AuthHeader = () => {
  const insets = useSafeAreaInsets();
  const { isPhone } = useScreenInfo();

  return (
    <View
      className="py-7 px-10 bg-white"
      style={
        isPhone
          ? {
              // Paddings to handle safe area
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            }
          : {}
      }
    >
      <StyledText
        color="light-primary"
        weight={700}
        xl2
        className="text-center md:text-left"
      >
        CULERO
      </StyledText>
    </View>
  );
};
