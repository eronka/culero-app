import { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { DrawerHeader } from "../../../components/headers/DrawerHeader";
import { IconButton } from "../../../components/IconButton";
import { useNavigation } from "@react-navigation/native";

export type LayoutProps = {
  children: ReactNode;
  canGoBack?: boolean;
};
export const SettingsLayout = ({ children, canGoBack }: LayoutProps) => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View className="p-4 md:p-9" style={{ maxWidth: 1000 }}>
        <DrawerHeader
          title="Settings"
          iconProps={{ name: "settings", color: "black" }}
          leftIcon={
            canGoBack ? (
              <IconButton
                iconProps={{ name: "back", size: 24 }}
                onPress={() => navigation.goBack()}
              />
            ) : undefined
          }
        />
        {children}
      </View>
    </ScrollView>
  );
};
