import { useWindowDimensions } from "react-native";

export const useScreenInfo = () => {
  const { width, height } = useWindowDimensions();
  return {
    isPhone: width < 768,
    height,
  };
};
