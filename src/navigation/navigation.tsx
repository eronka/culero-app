import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { BottomNavigator } from "./BottomTabNavigator";
import { AuthStackNavigator } from "./AuthStack";
import { useUser } from "../hooks";
import { EmailVerificationSuccess } from "../screens/AuthScreens";
import { AuthHeader } from "../components";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const user = useUser();

  console.log(
    "user is ----the fuck?",
    user,
    !!user && user.isEmailVerified,
    !user,
    !!user && !user.isEmailVerified
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="HomeScreen" component={BottomNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="AuthNav" component={AuthStackNavigator} />
        </>
      )}
      <Stack.Screen
        name="EmailVerificationSuccess"
        component={EmailVerificationSuccess}
        options={{
          headerShown: true,
          contentStyle: {
            backgroundColor: "#ffffff",
          },

          header: () => <AuthHeader />,
        }}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
