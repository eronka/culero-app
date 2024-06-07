import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { BottomNavigator } from "./BottomTabNavigator";
import { Icon } from "../icons";
import colors from "../../colors";
import { Pressable, View, ViewProps } from "react-native";
import {
  Avatar,
  HorizontalDivider,
  StyledPressable,
  StyledText,
} from "../components";
import { IconButton } from "../components/IconButton";
import { twMerge } from "tailwind-merge";
import { useScreenInfo } from "../hooks/useScreenInfo";
import { WriteReviewScreen } from "../screens/WriteReviewScreen/WriteReviewScreen";
import { MyReviewsScreen } from "../screens/MyReviewsScreen/MyReviewsScreen";
import { DrawerNavigatorParamList } from "../types";
import { ConnectionStack } from "./ConnectionStack";
import { useUser } from "../hooks";
import { NotificationsScreen } from "../screens/NotificationsScreen/NotificationsScreen";
import { MyProfileScreen } from "../screens/MyProfileScreen";
import { SettingsStack } from "./SettingsStack";
import { useLogout } from "../hooks/useLogout";

import {
  CommonActions,
  DrawerActions,
  DrawerNavigationState,
  ParamListBase,
  useLinkBuilder,
} from "@react-navigation/native";
import * as React from "react";
import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from "@react-navigation/drawer/lib/typescript/src/types";

type Props = {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
};

const Drawer = createDrawerNavigator<DrawerNavigatorParamList>();

/**
 * Component that renders the navigation list in the drawer.
 * WARNING: MAY CHANGE WHEN UPDATING NAVIGATION VERSION
 */
export default function DrawerItemList({
  state,
  navigation,
  descriptors,
}: Props) {
  const buildLink = useLinkBuilder();

  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const focusedOptions = focusedDescriptor.options;

  const {
    drawerActiveTintColor,
    drawerInactiveTintColor,
    drawerActiveBackgroundColor,
    drawerInactiveBackgroundColor,
  } = focusedOptions;

  return state.routes.map((route, i) => {
    const focused = i === state.index;

    const onPress = () => {
      const event = navigation.emit({
        type: "drawerItemPress",
        target: route.key,
        canPreventDefault: true,
      });

      if (!event.defaultPrevented) {
        navigation.dispatch({
          ...(focused
            ? DrawerActions.closeDrawer()
            : CommonActions.navigate({ name: route.name, merge: true })),
          target: state.key,
        });
      }
    };

    const {
      title,
      drawerLabel,
      drawerIcon,
      drawerLabelStyle,
      drawerItemStyle,
      drawerAllowFontScaling,
    } = descriptors[route.key].options;

    return (
      <View
        className="hover:bg-grayF2 rounded-md"
        style={focused ? { backgroundColor: colors.grayF2 } : {}}
      >
        <DrawerItem
          key={route.key}
          label={
            drawerLabel !== undefined
              ? drawerLabel
              : title !== undefined
              ? title
              : route.name
          }
          icon={drawerIcon}
          focused={false}
          activeTintColor={drawerActiveTintColor}
          inactiveTintColor={drawerInactiveTintColor}
          activeBackgroundColor={drawerActiveBackgroundColor}
          inactiveBackgroundColor={drawerInactiveBackgroundColor}
          allowFontScaling={drawerAllowFontScaling}
          labelStyle={drawerLabelStyle}
          style={drawerItemStyle}
          to={buildLink(route.name, route.params)}
          onPress={onPress}
        />
      </View>
    );
  }) as React.ReactNode as React.ReactElement;
}

const DrawerHeader = ({
  className,
}: {
  className?: ViewProps["className"];
}) => {
  const user = useUser()!;
  const logout = useLogout();
  return (
    <>
      <View className={twMerge("md:hidden", className)}>
        <View className="flex-row justify-between items-center px-6 py-4">
          <View className="flex-row items-center">
            <Avatar userImage={user.profilePictureUrl} />
            <StyledText weight={600} color="black">
              {user.name}
            </StyledText>
            <StyledPressable
              color="transparent"
              onPress={() => {
                logout();
              }}
            >
              <StyledText color="black">Logout</StyledText>
            </StyledPressable>
          </View>
          <IconButton
            iconProps={{ name: "notifications", color: "gray38", size: 23 }}
            onPress={() => {}}
          />
        </View>
        <HorizontalDivider />
      </View>

      <View className={twMerge("xs: hidden md:block p-7", className)}>
        <StyledText color="primary" xl4 weight={700}>
          CULERO
        </StyledText>
      </View>
    </>
  );
};

const DrawerFooter = ({
  className,
}: {
  className?: ViewProps["className"];
}) => {
  const user = useUser()!;

  const logout = useLogout();

  return (
    <View className={twMerge("items-center mb-20", className)}>
      <Avatar
        userImage={user.profilePictureUrl}
        borderColor="primary"
        size={50}
      />
      <StyledText weight={500} color="gray39">
        {user.name}
      </StyledText>
      <StyledText color="gray7C" weight={500}>
        {user.email}
      </StyledText>
      <StyledPressable
        color="transparent"
        className="hover:underline"
        onPress={() => {
          logout();
        }}
      >
        <StyledText>Logout</StyledText>
      </StyledPressable>
    </View>
  );
};

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { height } = useScreenInfo();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <DrawerHeader />
      <DrawerItemList {...props} />
      {height > 650 && (
        <DrawerFooter className="absolute bottom-0 right-0 left-0 hidden md:flex" />
      )}
    </DrawerContentScrollView>
  );
}

export const DrawerNavigator = () => {
  const { isPhone } = useScreenInfo();

  return (
    <Drawer.Navigator
      backBehavior="history"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: isPhone,
        headerTitle: "",
        drawerType: isPhone ? "front" : "permanent",

        drawerLabelStyle: {
          fontFamily: "Inter_500Medium",
          fontSize: 18,
          color: colors.gray39,
        },
      }}
    >
      <Drawer.Screen
        name="Home / explore"
        component={BottomNavigator}
        options={{
          drawerIcon: () => <Icon name="home" size={20} color="gray38" />,
        }}
      />
      <Drawer.Screen
        name="My Reviews"
        component={MyReviewsScreen}
        options={{
          drawerIcon: () => <Icon name="user-star" size={20} color="gray38" />,
        }}
      />
      <Drawer.Screen
        name="Write a review"
        component={WriteReviewScreen}
        options={{
          headerTitle: "",
          drawerIcon: () => <Icon name="review" size={20} color="gray38" />,
        }}
      />
      <Drawer.Screen
        name="Connections"
        component={ConnectionStack}
        options={{
          unmountOnBlur: true,
          drawerIcon: () => <Icon name="user-group" size={20} color="gray38" />,
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          drawerIcon: () => (
            <Icon name="notifications" size={20} color="gray38" />
          ),
        }}
      />
      <Drawer.Screen
        name="My profile"
        component={MyProfileScreen}
        options={{
          drawerIcon: () => <Icon name="user" size={20} color="gray38" />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          drawerIcon: () => <Icon name="settings" size={20} color="gray38" />,
        }}
      />
    </Drawer.Navigator>
  );
};
