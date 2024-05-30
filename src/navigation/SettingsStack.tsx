import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsStackParamList } from "../types";
import { useScreenInfo } from "../hooks/useScreenInfo";
import {
  AccountSettingsScreen,
  GivenReviewsSettings,
  PrivacySettingsScreen,
  ReceivedReviewsScreen,
  SettingsScreen,
} from "../screens/SettingsScreens";

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export const SettingsStack = () => {
  const { isPhone } = useScreenInfo();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Account Settings" component={AccountSettingsScreen} />
      <Stack.Screen name="Privacy" component={PrivacySettingsScreen} />
      <Stack.Screen name="Given reviews" component={GivenReviewsSettings} />
      <Stack.Screen name="Received reviews" component={ReceivedReviewsScreen} />
    </Stack.Navigator>
  );
};
