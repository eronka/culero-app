import { Userpic } from "react-native-userpic";
import colors from "../../colors";
import { View, ViewProps } from "react-native";
import { Icon } from "../icons";
import { twMerge } from "tailwind-merge";
const ANONYMOUS_IMAGE = require("../../assets/anonymous.png");
const USER_DEFAULT_IMAGE = require("../../assets/default-user-image.png");

export type AvatarProps = {
  userImage?: string;
  isAnonymous?: boolean;
  size?: number;
  hasBadge?: boolean;
  isVerified?: boolean;
  badgeSize?: number;
  hideBorder?: boolean;
  className?: ViewProps["className"];
  borderColor?: keyof typeof colors;
};
export const Avatar = ({
  userImage,
  isAnonymous,
  size = 40,
  badgeSize = 20,
  hasBadge,
  isVerified,
  hideBorder = false,
  borderColor = "black",
  className,
}: AvatarProps) => {
  return (
    <View className={twMerge("pb-2 pr-2", className)}>
      <Userpic
        source={
          isAnonymous
            ? ANONYMOUS_IMAGE
            : userImage
            ? { uri: userImage }
            : USER_DEFAULT_IMAGE
        }
        defaultSource={USER_DEFAULT_IMAGE}
        radius={2000}
        size={size}
        style={{
          borderWidth: hideBorder ? 0 : 1,
          borderColor: colors[borderColor],
        }}
      />
      {hasBadge && (
        <View className="absolute bottom-0 right-0">
          <Icon
            name="verified"
            size={badgeSize}
            color={isVerified ? "light-green" : "grayAB"}
          />
        </View>
      )}
    </View>
  );
};
