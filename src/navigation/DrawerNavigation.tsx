import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { BottomNavigator } from "./BottomTabNavigator";
import { Icon } from "../icons";
import colors from "../../colors";
import { View, ViewProps } from "react-native";
import { Avatar, HorizontalDivider, StyledText } from "../components";
import { IconButton } from "../components/IconButton";
import { twMerge } from "tailwind-merge";
import { useScreenInfo } from "../hooks/useScreenInfo";
import { WriteReviewScreen } from "../screens/WriteReviewScreen/WriteReviewScreen";
import { MyReviewsScreen } from "../screens/MyReviewsScreen/MyReviewsScreen";
import { DrawerNavigatorParamList } from "../types";
import { ConnectionStack } from "./ConnectionStack";
import { useUser } from "../hooks";

const Drawer = createDrawerNavigator<DrawerNavigatorParamList>();

const DrawerHeader = ({
  className,
}: {
  className?: ViewProps["className"];
}) => {
  const user = useUser()!;
  return (
    <>
      <View className={twMerge("md:hidden", className)}>
        <View className="flex-row justify-between items-center px-6 py-4">
          <View className="flex-row items-center">
            <Avatar userImage={user.profilePictureUrl} />
            <StyledText weight={600} color="black">
              {user.name}
            </StyledText>
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
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: isPhone,
        headerTitle: "",
        drawerType: isPhone ? "front" : "permanent",
        drawerActiveTintColor: "#F5F6F8",
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
          drawerIcon: () => <Icon name="user-group" size={20} color="gray38" />,
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={BottomNavigator}
        options={{
          drawerIcon: () => (
            <Icon name="notifications" size={20} color="gray38" />
          ),
        }}
      />
      <Drawer.Screen
        name="My profile"
        component={BottomNavigator}
        options={{
          drawerIcon: () => <Icon name="user" size={20} color="gray38" />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={BottomNavigator}
        options={{
          drawerIcon: () => <Icon name="settings" size={20} color="gray38" />,
        }}
      />
    </Drawer.Navigator>
  );
};
