import { Alert, View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { Card } from "./Card";
import { Avatar } from "./Avatar";
import { OverallRateCard } from "./OverallRateCard";
import { StyledText } from "./StyledText";
import { Icon } from "../icons";
import { StyledPressable } from "./StyledPressable";

export type ProfileCardProps = {
  userName?: string;
  userPosition?: string;
  userAvatar?: string;
  className?: ViewProps["className"];
  isVerified?: boolean;
  revewisCount: number;
  connectionsCount: number;
  professionalismRating: number;
  reliabilityRating: number;
  communicationRating: number;
  userLocation?: string;
};
export const ProfileCard = ({
  userName,
  isVerified,
  userAvatar,
  userPosition,
  userLocation,
  className,
  revewisCount,
  connectionsCount,
  professionalismRating,
  communicationRating,
  reliabilityRating,
}: ProfileCardProps) => {
  return (
    <Card
      className={twMerge("bg-transparent", className)}
      bodyComponent={
        <View>
          <View className="flex-row items-center">
            <Avatar userImage={userAvatar} hasBadge={false} size={151} />
            <OverallRateCard
              className="w-1/2 bg-transparent"
              barsContainerClassName="ml-8"
              professionalismRating={professionalismRating}
              reliabilityRating={reliabilityRating}
              communicationRating={communicationRating}
            />
          </View>
          <View className="flex-row justify-between">
            <View>
              <StyledText weight={600} xl4 color="gray38">
                {userName}
                <Icon
                  name="verified"
                  size={30}
                  color={isVerified ? "light-green" : "gray"}
                  className="ml-2"
                />
              </StyledText>
              <StyledText xl2 color="gray38" weight={400}>
                {userPosition}
              </StyledText>
              <StyledText color="gray38">
                {`${userLocation} . `}
                <StyledText color="primary" weight={600}>
                  Contact info
                </StyledText>
              </StyledText>
              <StyledText color="gray38">
                {`${connectionsCount} Connections . `}{" "}
                <StyledText
                  color="primary"
                  weight={600}
                >{`${revewisCount} Reviews`}</StyledText>
              </StyledText>

              <StyledText weight={600} color="primary">
                My Profile <Icon name="eye" color="primary" size={16} />
              </StyledText>
            </View>
            <View>
              <StyledPressable
                color="white"
                className="mt-2"
                onPress={() => {
                  Alert.alert("I was pressed!");
                }}
                rightIconProps={{ name: "edit" }}
              >
                Edit Profile
              </StyledPressable>
            </View>
          </View>
        </View>
      }
    />
  );
};
