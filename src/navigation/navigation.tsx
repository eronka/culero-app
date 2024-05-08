import { RootState } from "../store/store";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useSelector } from "react-redux";
import HomeScreen from "../screens/HomeScreen";
import InitialScreen from "../screens/InitialScreen";
import { BottomNavigator } from "./BottomTabNavigator";
import { DrawerNavigator } from "./DrawerNavigation";
import { AuthStackNavigator } from "./AuthStack";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const state = useSelector((state: RootState) => state.userState);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      {state.isLoggedIn ? (
        <>
          <Stack.Screen name="HomeScreen" component={BottomNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="AuthNavigator" component={AuthStackNavigator} />
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
