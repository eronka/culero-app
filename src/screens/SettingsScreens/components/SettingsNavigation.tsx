import { FlatList, Pressable, View } from "react-native";
import { Card, HorizontalDivider, StyledText } from "../../../components";
import { Icon } from "../../../icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SettingsStackParamList } from "../../../types";

export type SettingsNavigationProps = {
  items: SettingsNavigationItem[];
};
export type SettingsNavigationItem = {
  navTo: keyof SettingsStackParamList;
  title: string;
};

export const SettingsNavigation = ({ items }: SettingsNavigationProps) => {
  const navigation = useNavigation<NavigationProp<SettingsStackParamList>>();
  return (
    <Card
      bodyComponent={
        <FlatList
          contentContainerClassName="p-6"
          data={items}
          ItemSeparatorComponent={() => (
            <View className="w-full px-4">
              <HorizontalDivider />
            </View>
          )}
          renderItem={({ item }) => {
            return (
              <Pressable
                className="flex-row justify-between hover:bg-white7 py-8 px-4 rounded-lg"
                onPress={() => navigation.navigate(item.navTo)}
              >
                <StyledText weight={600} xl2>
                  {item.title}
                </StyledText>
                <Icon name="right-arrow" color="black" size={20} />
              </Pressable>
            );
          }}
        />
      }
    />
  );
};
