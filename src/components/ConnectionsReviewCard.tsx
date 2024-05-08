import { Pressable, View, ViewProps } from "react-native";
import { Card } from "./Card";
import { StyledText } from "./StyledText";
import { FlatList } from "react-native";
import { HorizontalDivider } from "./HorizontalDivider";
import { ConnectionDetails } from "./ConnectionDetails";
import { useState } from "react";
import { IconButton } from "./IconButton";

export type ConnectionsReviewCardProps = {
  className?: ViewProps["className"];
  title: string;
  subtitle?: string;
  expandable?: boolean;
};

const data = [
  {
    name: "Ion Ionescu",
    isVerified: true,
    position: "Mint rubber",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ion Ionescu",
    isVerified: true,
    position: "Mint rubber",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ion Ionescu",
    isVerified: true,
    position: "Mint rubber",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ion Ionescu",
    isVerified: true,
    position: "Mint rubber",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ion Ionescu",
    isVerified: true,
    position: "Mint rubber",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ion Ionescu",
    isVerified: true,
    position: "Mint rubber",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ion Ionescu",
    isVerified: true,
    position: "Mint rubber",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
export const ConnectionReviewCard = ({
  className,
  title,
  subtitle,
  expandable = true,
}: ConnectionsReviewCardProps) => {
  const [expanded, setExpand] = useState(false);
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
          <FlatList
            data={!expandable || expanded ? data : data.slice(0, 3)}
            ItemSeparatorComponent={() => <HorizontalDivider />}
            renderItem={({ item }) => (
              <View className="flex-row justify-between items-center p-2">
                <ConnectionDetails
                  userAvatar={item.avatar}
                  userName={item.name}
                  userPosition={item.position}
                  isVerified={item.isVerified}
                />
                <IconButton onPress={() => {}} iconProps={{ name: "review" }} />
              </View>
            )}
          />
        </View>
      }
    />
  );
};
