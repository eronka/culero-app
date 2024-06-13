import { Pressable, View, ViewProps } from "react-native";
import { Card } from "./Card";
import { StyledText } from "./StyledText";
import { FlatList } from "react-native";
import { HorizontalDivider } from "./HorizontalDivider";
import { ConnectionDetails } from "./ConnectionDetails";
import { useState } from "react";
import { IconButton } from "./IconButton";
import { useSuggestedForReviewConnections } from "../hooks/useSuggestedForReviewConenctions";
import { StyledPressable } from "./StyledPressable";
import { useNavToConnection } from "../hooks/useNavToConnection";

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
  const nav = useNavToConnection();

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
                <StyledPressable
                  color="transparent"
                  onPress={() => setExpand(!expanded)}
                >
                  <StyledText className="text-sm">
                    {expanded ? "See Less" : "See All"}
                  </StyledText>
                </StyledPressable>
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
                <View className="flex-row justify-between items-center p-2 rounded-md">
                  <ConnectionDetails user={item} />
                  <IconButton
                    onPress={() => nav.navigate(item.id, item)}
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
