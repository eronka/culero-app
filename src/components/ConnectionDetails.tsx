import { TextProps, View, ViewProps } from "react-native";
import { Avatar } from "./Avatar";
import { StyledText } from "./StyledText";
import { twMerge } from "tailwind-merge";

type ConnectionDetailsProps = {
  userName: string;
  userPosition: string;
  userAvatar?: string;
  isVerified?: boolean;
  className?: ViewProps["className"];
  usernameTextClassName?: TextProps["className"];
  positionTextClassName?: TextProps["className"];
  avatarSize?: number;
  badgeSize?: number;
};

export const ConnectionDetails = ({
  userName,
  userPosition,
  userAvatar,
  isVerified,
  className,
  usernameTextClassName,
  positionTextClassName,
  avatarSize = 45,
  badgeSize = 22,
}: ConnectionDetailsProps) => {
  return (
    <View className={twMerge("flex-row items-center", className)}>
      <Avatar
        userImage={userAvatar}
        isVerified={isVerified}
        hasBadge={true}
        size={avatarSize}
        badgeSize={badgeSize}
        hideBorder={true}
      />
      <View className="ml-2">
        <StyledText
          weight={600}
          lg
          className={twMerge("", usernameTextClassName)}
        >
          {userName}
        </StyledText>
        <StyledText color="gray33" className={positionTextClassName}>
          {userPosition}
        </StyledText>
      </View>
    </View>
  );
};
