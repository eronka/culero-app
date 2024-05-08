import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { InitialAuthScreen } from "../screens/InitialAuthScreen";
import { View } from "react-native";
import { StyledText } from "../components";

const Stack = createNativeStackNavigator();

export const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: "#ffffff",
        },

        header: () => (
          <View className="py-7 px-10 bg-white">
            <StyledText color="light-primary" weight={700} xl2>
              CULERO
            </StyledText>
          </View>
        ),
      }}
    >
      <Stack.Screen name="auth" component={InitialAuthScreen} />
    </Stack.Navigator>
  );
};
