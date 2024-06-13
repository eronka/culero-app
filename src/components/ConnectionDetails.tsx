import { Pressable, TextProps, View, ViewProps } from "react-native";
import { Avatar } from "./Avatar";
import { StyledText } from "./StyledText";
import { twMerge } from "tailwind-merge";
import { Connection } from "../types";
import { useNavToConnection } from "../hooks/useNavToConnection";

type ConnectionDetailsProps = {
  className?: ViewProps["className"];
  usernameTextClassName?: TextProps["className"];
  positionTextClassName?: TextProps["className"];
  avatarSize?: number;
  badgeSize?: number;
  user: Connection;
};

export const ConnectionDetails = ({
  user,
  className,
  usernameTextClassName,
  positionTextClassName,
  avatarSize = 45,
  badgeSize = 22,
}: ConnectionDetailsProps) => {
  const nav = useNavToConnection();
  return (
    <Pressable
      className={twMerge(
        "flex-row items-center bg hover:opacity-50",
        className
      )}
      onPress={() => nav.navigate(user.id, user)}
    >
      <Avatar
        userImage={user.profilePictureUrl}
        isVerified={user.isEmailVerified}
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
          {user.name || ""}
        </StyledText>
        <StyledText color="gray33" className={positionTextClassName}>
          {user.headline || ""}
        </StyledText>
      </View>
    </Pressable>
  );
};
