import { ScrollView, View } from "react-native";
import { DrawerHeader } from "../../components/headers/DrawerHeader";
import { SearchableConnectionsCard } from "../../components/SearchableConnectionsCard";
import { InviteCard } from "../../components";

export const SearchConnectionsScreen = () => {
  return (
    <ScrollView>
      <View className="p-4 md:p-9">
        <DrawerHeader
          title="Connections"
          iconProps={{ name: "user-group", color: "black" }}
        />

        <View className="md:flex-row">
          <View className="md:w-3/4 md:pr-4">
            <SearchableConnectionsCard />
          </View>
          <View className="md:w-1/4">
            <InviteCard className="mt-8 md:mt-0" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
