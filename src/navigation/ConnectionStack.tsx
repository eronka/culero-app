import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ConnectionScreen,
  SearchConnectionsScreen,
} from "../screens/ConnectionScreens";
import { ConnectionStackParamList } from "../types";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

const Stack = createNativeStackNavigator<ConnectionStackParamList>();

function useResetScreenOnBlur() {
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      return () =>
        navigation.setParams({ screen: undefined, params: undefined });
    }, [navigation])
  );
}

export const ConnectionStack = () => {
  useResetScreenOnBlur();
  return (
    <Stack.Navigator
      screenOptions={{ header: () => null }}
      initialRouteName="SearchConnection"
    >
      <Stack.Screen
        name="SearchConnection"
        component={SearchConnectionsScreen}
      />
      <Stack.Screen name="Connection" component={ConnectionScreen} />
    </Stack.Navigator>
  );
};
