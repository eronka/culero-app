import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthHeader } from "../components";

import { AuthStackParamList } from "../types";
import {
  VerifyLoginScreen,
  LoginScreen,
  VerifyEmailScreen,
  SignupScreen,
} from "../screens/AuthScreens";

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
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="VerifyLogin" component={VerifyLoginScreen} />
    </Stack.Navigator>
  );
};
