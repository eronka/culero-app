import { useWindowDimensions } from "react-native";
import { Platform } from "react-native";

export const useScreenInfo = () => {
  const { width, height } = useWindowDimensions();
  return {
    isPhone: width < 768,
    height,
    width,
    platform: Platform.OS,
  };
};
