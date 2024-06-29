import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthHeader } from "../components";

import { AuthStackParamList } from "../types";
import { VerifyEmailScreen, AuthScreen } from "../screens/AuthScreens";

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
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
    </Stack.Navigator>
  );
};
