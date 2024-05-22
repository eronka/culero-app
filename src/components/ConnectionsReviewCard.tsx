import { Pressable, View, ViewProps } from "react-native";
import { Card } from "./Card";
import { StyledText } from "./StyledText";
import { FlatList } from "react-native";
import { HorizontalDivider } from "./HorizontalDivider";
import { ConnectionDetails } from "./ConnectionDetails";
import { useState } from "react";
import { IconButton } from "./IconButton";
import { useSuggestedForReviewConnections } from "../hooks/useSuggestedForReviewConenctions";

export type ConnectionsReviewCardProps = {
  className?: ViewProps["className"];
  title: string;
  subtitle?: string;
  expandable?: boolean;
};

export const ConnectionReviewCard = ({
  className,
  title,
  subtitle,
  expandable = true,
}: ConnectionsReviewCardProps) => {
  const [expanded, setExpand] = useState(false);
  const connections = useSuggestedForReviewConnections();
  return (
    <Card
      className={className}
      bodyComponent={
        <View className="p-2">
          <View className="mb-4">
            <View className="flex-row justify-between">
              <StyledText weight={500} lg>
                {title}
              </StyledText>
              {expandable && (
                <Pressable onPress={() => setExpand(!expanded)}>
                  <StyledText className="text-sm">
                    {expanded ? "See Less" : "See All"}
                  </StyledText>
                </Pressable>
              )}
            </View>
            {subtitle && (
              <StyledText weight={400} color="gray33" className="mt-1">
                {subtitle}
              </StyledText>
            )}
          </View>
          {connections.isFetched && connections.data && (
            <FlatList
              data={
                !expandable || expanded
                  ? connections.data
                  : connections.data.slice(0, 3)
              }
              ListEmptyComponent={() => (
                <View>
                  <StyledText>You have no connections</StyledText>
                </View>
              )}
              ItemSeparatorComponent={() => <HorizontalDivider />}
              renderItem={({ item }) => (
                <View className="flex-row justify-between items-center p-2">
                  <ConnectionDetails
                    userAvatar={item.profilePictureUrl}
                    userName={item.name}
                    userPosition={item.headline}
                    isVerified={item.isEmailVerified}
                  />
                  <IconButton
                    onPress={() => {}}
                    iconProps={{ name: "review" }}
                  />
                </View>
              )}
            />
          )}
        </View>
      }
    />
  );
};
