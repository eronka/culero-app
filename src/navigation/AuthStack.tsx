import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { InitialAuthScreen } from "../screens/InitialAuthScreen";
import { View } from "react-native";
import { AuthHeader, StyledText } from "../components";
import { VerifyEmailScreen } from "../screens/VerifyEmailScreen";
import { AuthStackParamList } from "../types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: "#ffffff",
        },

        header: () => <AuthHeader />,
      }}
    >
      <Stack.Screen name="Auth" component={InitialAuthScreen} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
    </Stack.Navigator>
  );
};
