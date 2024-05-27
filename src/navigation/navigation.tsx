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
import { DrawerNavigator } from "./DrawerNavigation";
import { OnboardingScreen } from "../screens/OnboardingScreen/OnboardingScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const user = useUser();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="AuthNav" component={AuthStackNavigator} />
        </>
      )}
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />

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
