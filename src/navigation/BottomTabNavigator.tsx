import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import InitialScreen from "../screens/InitialScreen";
import { Icon } from "../icons";
import { useScreenInfo } from "../hooks/useScreenInfo";
import { WriteReviewScreen } from "../screens/WriteReviewScreen/WriteReviewScreen";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";

const Tab = createBottomTabNavigator();

export function BottomNavigator(props: { initialRoute?: string }) {
  const { isPhone } = useScreenInfo();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarIconStyle: {},
        tabBarStyle: {
          height: 75,
          padding: 10,
          display: isPhone ? "flex" : "none",
          paddingBottom: 10,
        },
        tabBarLabelStyle: { fontFamily: "Inter_400Regular", color: "black" },
      }}
      initialRouteName={props.initialRoute || "Home"}
    >
      <Tab.Screen
        name="Home"
        component={InitialScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Icon name="home" color={focused ? "primary" : "gray38"} />
          ),
        }}
      />
      <Tab.Screen
        name="WriteReview"
        component={WriteReviewScreen}
        options={{
          tabBarLabel: "Write a review",
          tabBarIcon: () => <Icon name="plus" color="primary" size={38} />,
        }}
      />
      <Tab.Screen
        name="Home3"
        component={InitialScreen}
        options={{
          tabBarLabel: "My reviews",
          tabBarIcon: ({ focused }) => (
            <Icon
              name="user-star"
              size={25}
              color={focused ? "primary" : "gray38"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
