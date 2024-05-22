import { Card } from "./Card";
import {
  View,
  ViewProps,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { StyledText } from "./StyledText";
import { SortBy } from "./SortBy";
import { SearchBar } from "./SearchBar";
import { HorizontalDivider } from "./HorizontalDivider";
import { ConnectionDetails } from "./ConnectionDetails";
import { IconButton } from "./IconButton";
import { useState } from "react";
import { Item } from "react-native-picker-select";
import { ConnectionStackParamList } from "../types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useConnections } from "../hooks/useConnections";

export type SearchableConnectionsCardProps = {
  className?: ViewProps["className"];
};

const sortByItems: Item[] = [
  { value: "addedAt", label: "Recently added" },
  { value: "name", label: "Name" },
];

function sortByProperty<T, K extends keyof T>(arr: T[], prop: K): T[] {
  return [...arr].sort((a, b) => {
    const propA = a[prop];
    const propB = b[prop];

    if (propA > propB) return 1;
    if (propA < propB) return -1;
    return 0;
  });
}

export const SearchableConnectionsCard = ({
  className,
}: SearchableConnectionsCardProps) => {
  const connections = useConnections();
  const [sortBy, setSortBy] = useState(sortByItems[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation<NavigationProp<ConnectionStackParamList>>();

  return (
    <Card
      className={className}
      headerComponent={
        <View className="flex-row justify-between p-2 py-4">
          <View>
            <StyledText className="mb-1" weight={500} xl2>{`${
              connections.data?.length || 0
            } connections`}</StyledText>
            <SortBy
              items={sortByItems}
              onSelect={(item: Item) => setSortBy(item)}
            />
          </View>
          <View>
            <SearchBar
              placeholder="Search All"
              containerClassName="mt-2 p-2"
              value={searchTerm}
              onChangeText={(value) => setSearchTerm(value)}
            />
          </View>
        </View>
      }
      hideHeaderDivider={connections?.data?.length == 0}
      bodyComponent={
        <View>
          {connections.isLoading && (
            <ActivityIndicator size="large" className="self-center" />
          )}
          {connections.isFetched && connections.data && (
            <FlatList
              data={sortByProperty(connections.data, sortBy.value).filter(
                (user) =>
                  user.name?.search(searchTerm) !== -1 ||
                  user.headline?.search(searchTerm) !== -1
              )}
              ItemSeparatorComponent={() => (
                <View className="px-2">
                  <HorizontalDivider />
                </View>
              )}
              renderItem={({ item }) => (
                <View className="flex-row justify-between items-center p-4 py-8 px-6 hover:bg-white7 rounded-lg">
                  <Pressable
                    className="flex-grow"
                    onPress={() => {
                      console.log("item.id", item.id);
                      navigation.navigate("Connection", { userId: item.id });
                    }}
                  >
                    <ConnectionDetails
                      avatarSize={86}
                      badgeSize={34}
                      userAvatar={item.profilePictureUrl}
                      userName={item.name!}
                      userPosition={item.headline!}
                      isVerified={item.isEmailVerified}
                    />
                  </Pressable>
                  <View className="flex-row items-center">
                    <IconButton
                      className="mr-2 md:mr-16"
                      onPress={() => {}}
                      iconProps={{ name: "message" }}
                      label="Write review"
                    />

                    <IconButton
                      onPress={() => {}}
                      iconProps={{ name: "dots-horizontal", size: 25 }}
                    />
                  </View>
                </View>
              )}
            />
          )}
        </View>
      }
    />
  );
};
