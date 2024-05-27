import { View, ViewProps } from "react-native";
import { Card } from "./Card";
import { VerticalDivider } from "./VerticalDivider";
import { StyledText } from "./StyledText";
import { StyledPressable } from "./StyledPressable";
import { twMerge } from "tailwind-merge";
import { ConnectionDetails } from "./ConnectionDetails";
import { Connection } from "../types";
import { HorizontalDivider } from "./HorizontalDivider";

export type NewUserCardProps = {
  className?: ViewProps["className"];
  connection: Connection;
};
export const NewUserCard = ({ connection, className }: NewUserCardProps) => {
  return (
    <Card
      className={twMerge("bg-primary", className)}
      bodyComponent={
        <View className="md:flex-row ">
          <View className="flex-1 justify-center">
            <ConnectionDetails
              usernameTextClassName="text-white"
              positionTextClassName="text-white7"
              userName={connection.name}
              userPosition={connection.headline}
              userAvatar={connection.profilePictureUrl}
            />
          </View>
          <VerticalDivider className="hidden md:flex" />
          <HorizontalDivider className="md:hidden border-white7/20 my-4" />
          <View className="flex-1">
            <StyledText color="white7">
              This Person is not yet on Culero
            </StyledText>
            <StyledText
              color="white"
              weight={600}
            >{`Be the first to invite ${connection.name} to join!`}</StyledText>
            <StyledPressable
              className="self-end mt-2"
              color="white"
              textVariant={{ color: "primary", weight: 500 }}
              textClassName="w-32"
            >
              Invite
            </StyledPressable>
          </View>
        </View>
      }
    />
  );
};
