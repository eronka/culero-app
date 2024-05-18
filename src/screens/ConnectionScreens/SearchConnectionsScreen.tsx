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
            <SearchableConnectionsCard
              users={[
                {
                  name: "ZAIonel Ionescu",
                  isEmailVerified: true,
                  headline: "Mint rubber",
                  id: "clw4y14gv0000hp3iak2kd6xh",
                  addedAt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
                  profilePictureUrl:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  name: "BIonel Ionescu",
                  isEmailVerified: true,
                  headline: "Mint rubber",
                  addedAt: new Date(),
                  id: "clw4y14gv0000hp3iak2kd6xh",
                  profilePictureUrl:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  name: "Ionel Ionescu",
                  isEmailVerified: true,
                  headline: "Mint rubber",
                  addedAt: new Date(),
                  id: "clw4y14gv0000hp3iak2kd6xh",
                  profilePictureUrl:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  name: "DIonel Ionescu",
                  isEmailVerified: true,
                  headline: "Mint rubber",
                  addedAt: new Date(),
                  id: "clw4y14gv0000hp3iak2kd6xh",
                  profilePictureUrl:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  name: "CIonel Ionescu",
                  isEmailVerified: true,
                  headline: "Mint rubber",
                  addedAt: new Date(),
                  id: "clw4y14gv0000hp3iak2kd6xh",
                  profilePictureUrl:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
              ]}
            />
          </View>
          <View className="md:w-1/4">
            <InviteCard className="mt-8 md:mt-0" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
