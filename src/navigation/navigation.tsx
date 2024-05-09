import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import HomeScreen from "../screens/HomeScreen";
import InitialScreen from "../screens/InitialScreen";
import { BottomNavigator } from "./BottomTabNavigator";
import { DrawerNavigator } from "./DrawerNavigation";
import { AuthStackNavigator } from "./AuthStack";
import { useUser } from "../hooks";
import { VerifyEmailScreen } from "../screens/VerifyEmailScreen";

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
