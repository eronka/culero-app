import { Alert, View, ViewProps } from "react-native";
import { Card } from "./Card";
import { VerticalDivider } from "./VerticalDivider";
import { StyledText } from "./StyledText";
import { StyledPressable } from "./StyledPressable";
import { twMerge } from "tailwind-merge";
import { ConnectionDetails } from "./ConnectionDetails";
import { IconButton } from "./IconButton";
import { Icon } from "../icons";

export type UserCardProps = {
  userName: string;
  userPosition: string;
  userAvatar: string;
  className?: ViewProps["className"];
  isVerified?: boolean;
  revewisCount: number;
  connectionsCount: number;
  joinedDate: Date;
  isConnection?: boolean;
};
export const UserCard = ({
  userName,
  isVerified,
  userAvatar,
  userPosition,
  className,
  revewisCount,
  connectionsCount,
  joinedDate,
  isConnection,
}: UserCardProps) => {
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
                userName={userName}
                userPosition={userPosition}
                userAvatar={userAvatar}
                isVerified={isVerified}
              />
            </View>
            <View className="hidden md:flex flex-1">
              <StyledPressable
                disabled={isConnection}
                color="white"
                className="self-end mt-2"
                textVariant={{ color: "primary", weight: 500 }}
              >
                Connect
              </StyledPressable>
            </View>
          </View>
          <View className="flex-row justify-between">
            <View className="md:flex-row md:self-end mt-2">
              <View className="flex-row">
                <Icon name="user-star" color="grayC5" size={15} />
                <StyledText color="whiteFA" sm>
                  {`${revewisCount} reviews`}
                </StyledText>
              </View>

              <View className="flex-row md:mx-4">
                <Icon name="user-group" color="grayC5" size={15} />
                <StyledText color="whiteFA" sm>
                  {`${connectionsCount} connections`}
                </StyledText>
              </View>

              <View className="flex-row">
                <Icon name="verified" color="grayC5" size={15} />
                <StyledText color="whiteFA" sm>
                  {`Member since ${joinedDate.getFullYear()}`}
                </StyledText>
              </View>
            </View>
            <View className="md:hidden self-end">
              <StyledPressable
                disabled={isConnection}
                color="white"
                className="self-end mt-2"
                textVariant={{ color: "primary", weight: 500 }}
              >
                Connect
              </StyledPressable>
            </View>
          </View>
        </View>
      }
    />
  );
};
