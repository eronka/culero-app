import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SocialAccountsScreen } from "../screens/OnboardingScreens";

const Stack = createNativeStackNavigator();

export const OnboardingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SocialAccounts" component={SocialAccountsScreen} />
    </Stack.Navigator>
  );
};
