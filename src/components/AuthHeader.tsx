import { View } from "react-native";
import { StyledText } from "./StyledText";

export const AuthHeader = () => {
  return (
    <View className="py-7 px-10 bg-white">
      <StyledText color="light-primary" weight={700} xl2>
        CULERO
      </StyledText>
    </View>
  );
};
