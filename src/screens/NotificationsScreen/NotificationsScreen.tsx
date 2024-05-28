import { ActivityIndicator, FlatList, ScrollView, View } from "react-native";
import { DrawerHeader } from "../../components/headers/DrawerHeader";
import {
  Card,
  HorizontalDivider,
  StyledPressable,
  StyledText,
} from "../../components";
import { ConnectionReviewCard } from "../../components/ConnectionsReviewCard";
import { useNotifications } from "../../hooks/useNotifications";
import { useMemo, useState } from "react";
import { Icon } from "../../icons";
import { NotificationType } from "../../types/Notification";
import { formatDistance } from "date-fns/formatDistance";
import colors from "../../../colors";

export const NotificationsScreen = () => {
  const notifications = useNotifications();
  const [selectedNotifications, setSelectedNotifications] = useState<
    "All" | NotificationType
  >("All");

  const displayedNotifications = useMemo(() => {
    if (!notifications.data) {
      return [];
    }

    return notifications.data.filter(
      (n) => selectedNotifications === "All" || n.type == selectedNotifications
    );
  }, [notifications.data, selectedNotifications]);

  return (
    <ScrollView>
      <View className="p-4 md:p-9">
        <DrawerHeader
          title="Notifications"
          iconProps={{ name: "notifications", color: "black" }}
        />
        <View className="md:flex-row gap-4 h-full">
          <View className="basis-3/4 h-full">
            <Card
              className="p-8"
              bodyComponent={
                <View>
                  <View className="flex-wrap flex-row space-x-4 mb-10 ">
                    <StyledPressable
                      color="white"
                      className="h-8 w-32 rounded-sm"
                      textVariant={{ color: "primary", xs: true, weight: 500 }}
                      style={{
                        borderWidth: 1,
                        borderColor:
                          selectedNotifications == "All"
                            ? colors.primary
                            : colors["light-primary"],
                      }}
                      onPress={() => setSelectedNotifications("All")}
                    >
                      All
                    </StyledPressable>
                    <StyledPressable
                      color="white"
                      className="h-8 w-32 rounded-sm"
                      textVariant={{ color: "primary", xs: true, weight: 500 }}
                      style={{
                        borderWidth: 1,
                        borderColor:
                          selectedNotifications == NotificationType.REVIEW
                            ? colors.primary
                            : colors["light-primary"],
                      }}
                      onPress={() =>
                        setSelectedNotifications(NotificationType.REVIEW)
                      }
                    >
                      New reviews
                    </StyledPressable>
                    <StyledPressable
                      color="white"
                      className="h-8 w-38 rounded-sm"
                      textVariant={{ color: "primary", xs: true, weight: 500 }}
                      style={{
                        borderWidth: 1,
                        borderColor:
                          selectedNotifications == NotificationType.CONNECTION
                            ? colors.primary
                            : colors["light-primary"],
                      }}
                      onPress={() =>
                        setSelectedNotifications(NotificationType.CONNECTION)
                      }
                    >
                      New connections
                    </StyledPressable>
                  </View>
                  {!notifications.isFetched && (
                    <ActivityIndicator size="large" className="self-center" />
                  )}
                  {notifications.isFetched && (
                    <FlatList
                      data={displayedNotifications}
                      ItemSeparatorComponent={() => <HorizontalDivider />}
                      ListEmptyComponent={() => (
                        <StyledText>You have no notifications yet</StyledText>
                      )}
                      renderItem={({ item }) => (
                        <View className="flex-row justify-between py-4 px-2">
                          <View className="flex-row items-enter w-1/2">
                            <Icon
                              color="gray38"
                              size={16}
                              name={
                                item.type === NotificationType.CONNECTION
                                  ? "user-group"
                                  : "user-star"
                              }
                            />
                            <StyledText weight={500} className="ml-4">
                              {item.body}
                            </StyledText>
                          </View>
                          <StyledText weight={400} className="text-[#8E8E8E]">
                            {formatDistance(
                              new Date(item.createdAt),
                              new Date(),
                              { addSuffix: true }
                            )}
                          </StyledText>
                        </View>
                      )}
                    />
                  )}
                </View>
              }
            />
          </View>
          <ConnectionReviewCard
            expandable={false}
            className="md:basis-1/4"
            title="Suggested Profiles for Review"
            subtitle="Consider writing reviews for connections you've collaborated with recently."
          />
        </View>
      </View>
    </ScrollView>
  );
};
