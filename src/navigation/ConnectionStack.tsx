import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ConnectionScreen,
  SearchConnectionsScreen,
} from "../screens/ConnectionScreens";
import { ConnectionStackParamList } from "../types";
import { useScreenInfo } from "../hooks/useScreenInfo";

const Stack = createNativeStackNavigator<ConnectionStackParamList>();

export const ConnectionStack = () => {
  const { isPhone } = useScreenInfo();
  return (
    <Stack.Navigator screenOptions={{ headerShown: isPhone }}>
      <Stack.Screen
        name="SearchConnection"
        component={SearchConnectionsScreen}
      />
      <Stack.Screen name="Connection" component={ConnectionScreen} />
    </Stack.Navigator>
  );
};
