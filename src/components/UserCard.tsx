import { Alert, View, ViewProps } from "react-native";
import { Card } from "./Card";
import { StyledText } from "./StyledText";
import { StyledPressable } from "./StyledPressable";
import { twMerge } from "tailwind-merge";
import { ConnectionDetails } from "./ConnectionDetails";
import { IconButton } from "./IconButton";
import { Icon } from "../icons";
import { Connection } from "../types";
import { useConnectWithUser } from "../hooks/useConnectWithUser";
import { useUnconnectWithUser } from "../hooks/useUnconnectWIthUser";

export type UserCardProps = {
  className?: ViewProps["className"];
  connection: Connection;
};
export const UserCard = ({ className, connection }: UserCardProps) => {
  const connectMutation = useConnectWithUser();
  const unconnectMutation = useUnconnectWithUser();

  return (
    <Card
      className={twMerge("bg-primary", className)}
      bodyComponent={
        <View className="flex">
          <IconButton
            className="self-end"
            iconProps={{ name: "dots-horizontal", color: "gray", size: 25 }}
            onPress={() => {
              Alert.alert("Settings");
            }}
          />
          <View className="flex-row">
            <View className="flex-1">
              <ConnectionDetails
                usernameTextClassName="text-white"
                positionTextClassName="text-white7"
                user={connection}
              />
            </View>
            <View className="hidden md:flex flex-1">
              <StyledPressable
                color="white"
                className="self-end mt-2"
                textVariant={{ color: "primary", weight: 500 }}
                onPress={() => {
                  if (!connection.isConnection) {
                    connectMutation.mutate(connection.id);
                  } else {
                    unconnectMutation.mutate(connection.id);
                  }
                }}
              >
                {connection.isConnection ? "Unfollow" : "Connect"}
              </StyledPressable>
            </View>
          </View>
          <View className="flex-row justify-between">
            <View className="md:flex-row md:self-end mt-2">
              <View className="flex-row">
                <Icon name="user-star" color="grayC5" size={15} />
                <StyledText color="whiteFA" sm>
                  {`${connection.reviewsCount} reviews`}
                </StyledText>
              </View>

              <View className="flex-row md:mx-4">
                <Icon name="user-group" color="grayC5" size={15} />
                <StyledText color="whiteFA" sm>
                  {`${connection.connectionsCount} connections`}
                </StyledText>
              </View>

              <View className="flex-row">
                <Icon name="verified" color="grayC5" size={15} />
                <StyledText color="whiteFA" sm>
                  {`Member since ${new Date(
                    connection.joinedAt
                  ).getFullYear()}`}
                </StyledText>
              </View>
            </View>
            <View className="md:hidden self-end">
              <StyledPressable
                color="white"
                className="self-end mt-2"
                textVariant={{ color: "primary", weight: 500 }}
                onPress={() => {
                  if (!connection.isConnection) {
                    connectMutation.mutate(connection.id);
                  } else {
                    unconnectMutation.mutate(connection.id);
                  }
                }}
              >
                {connection.isConnection ? "Unfollow" : "Connect"}
              </StyledPressable>
            </View>
          </View>
        </View>
      }
    />
  );
};
