import { ScrollView, View } from "react-native";
import { DrawerHeader } from "../../components/headers/DrawerHeader";
import { IconButton } from "../../components/IconButton";
import { useNavigation } from "@react-navigation/native";

export const ConnectionScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View className="p-4 md:p-9">
        <DrawerHeader
          leftIcon={
            <IconButton
              iconProps={{ name: "back", size: 24 }}
              onPress={() => navigation.goBack()}
            />
          }
          title="Connections"
          iconProps={{ name: "user-group", color: "black" }}
        />

        <View className="md:flex-row"></View>
      </View>
    </ScrollView>
  );
};
