import { View, ViewProps } from "react-native";
import { EditIcon } from "./EditIcon";
import { GoogleIcon } from "./GoogleIcon";
import { SearchIcon } from "./SearchIcon";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5Brands from "@expo/vector-icons/FontAwesome5";
import MaterialCommunity from "@expo/vector-icons/MaterialCommunityIcons";
import Material from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

import colors from "../../colors";
import { twMerge } from "tailwind-merge";
import { MessageIcon } from "./MessageIcon";
import { ReviewIcon } from "./ReviewIcon";
import { InstaIcon } from "./InstagramIcon";
import { TwitterIcon } from "./TwitterIcon";
import { UserStarIcon } from "./UserStarIcon";
import { UserGroupIcon } from "./UserGroupIcon";
import { HomeIcon } from "./HomeIcon";
import { UserIcon } from "./UserIcon";
import { UserAvatar } from "./UserAvatar";
import { UserNotFoundIcon } from "./UserNotFound";

export type IconName =
  | "edit"
  | "google"
  | "search"
  | "arrow-down"
  | "github-square"
  | "facebook-square"
  | "linkedin-square"
  | "heart"
  | "heart-o"
  | "dots-horizontal"
  | "message"
  | "verified"
  | "review"
  | "instagram-color"
  | "linkedin-color"
  | "github-color"
  | "twitter-color"
  | "facebook-color"
  | "user-star"
  | "user-group"
  | "home"
  | "plus"
  | "notifications"
  | "user"
  | "settings"
  | "eye"
  | "checkmark"
  | "user-avatar"
  | "back"
  | "close"
  | "delete"
  | "back"
  | "right-arrow"
  | "user-not-found"
  | "grid"
  | "hamburger";

export type IconProps = {
  name: IconName;
  size?: number;
  className?: ViewProps["className"];
  color?: keyof typeof colors;
};

export const Icon = ({ name, color, size, className }: IconProps) => {
  return (
    <View className={twMerge("mx-1 justify-center", className)}>
      {name == "edit" && <EditIcon color={color} size={size} />}
      {name == "google" && <GoogleIcon />}
      {name == "search" && <SearchIcon />}
      {name == "arrow-down" && (
        <Octicons
          size={size}
          name="triangle-down"
          color={color ? colors[color] : colors["dark-grey"]}
        />
      )}
      {name == "github-square" && (
        <FontAwesome
          size={size}
          name="github-square"
          color={color ? colors[color] : colors["black"]}
        />
      )}
      {name == "linkedin-square" && (
        <FontAwesome
          size={size}
          name="linkedin-square"
          color={color ? colors[color] : colors["black"]}
        />
      )}
      {name == "facebook-square" && (
        <FontAwesome5Brands
          size={size}
          name="facebook-square"
          color={color ? colors[color] : colors["black"]}
        />
      )}
      {name == "heart" && (
        <FontAwesome
          size={size}
          name="heart"
          color={color ? colors[color] : colors["black"]}
        />
      )}
      {name == "heart-o" && (
        <FontAwesome
          size={size}
          name="heart-o"
          color={color ? colors[color] : colors["black"]}
        />
      )}
      {name == "dots-horizontal" && (
        <MaterialCommunity
          size={size}
          name="dots-horizontal"
          color={color ? colors[color] : colors["black"]}
        />
      )}
      {name == "message" && <MessageIcon />}
      {name == "verified" && (
        <Material
          size={size}
          name={"verified"}
          color={color ? colors[color] : colors["black"]}
        />
      )}
      {name == "review" && (
        <ReviewIcon
          size={size}
          color={color ? colors[color] : colors["black"]}
        />
      )}
      {name == "instagram-color" && <InstaIcon />}
      {name == "facebook-color" && (
        <FontAwesome5Brands
          size={size || 51}
          name="facebook"
          color={"#1c6af5"}
        />
      )}
      {name == "linkedin-color" && (
        <Entypo
          size={size || 51}
          name="linkedin-with-circle"
          color={"#1566bb"}
        />
      )}
      {name == "twitter-color" && <TwitterIcon />}
      {name == "github-color" && (
        <FontAwesome5Brands size={size || 51} name="github" />
      )}
      {name == "user-star" && (
        <UserStarIcon size={size} color={color ? colors[color] : undefined} />
      )}
      {name == "user-group" && (
        <UserGroupIcon
          size={size}
          color={color ? colors[color] : colors["black"]}
        />
      )}
      {name == "home" && (
        <HomeIcon
          color={color ? colors[color] : colors["black"]}
          size={size || 25}
        />
      )}
      {name == "plus" && (
        <AntDesign
          size={size}
          name="pluscircle"
          color={color ? colors[color] : colors["black"]}
        />
      )}
      {name == "notifications" && (
        <Ionicons
          name="notifications-outline"
          size={size}
          color={color ? colors[color] : colors["black"]}
        />
      )}
      {name === "user" && (
        <UserIcon size={size} color={color ? colors[color] : colors["black"]} />
      )}
      {name === "settings" && (
        <Ionicons
          name="settings-outline"
          size={size}
          color={color ? colors[color] : colors["black"]}
        />
      )}
      {name === "eye" && (
        <MaterialCommunity
          name="eye"
          size={size}
          color={color ? colors[color] : colors["black"]}
        />
      )}
      {name === "checkmark" && (
        <Ionicons
          name="checkmark"
          size={size}
          color={color ? colors[color] : colors["black"]}
        />
      )}
      {name === "user-avatar" && <UserAvatar color={color || "black"} />}
      {name === "back" && (
        <Material
          name="arrow-back-ios"
          size={size}
          color={color ? colors[color] : colors["black"]}
        />
      )}
      {name === "close" && (
        <Ionicons
          name="close"
          size={size}
          color={color ? colors[color] : colors["black"]}
        />
      )}
      {name === "delete" && (
        <Ionicons
          name="trash-outline"
          size={size}
          color={color ? colors[color] : colors["black"]}
        />
      )}
      {name === "right-arrow" && (
        <Material
          name="arrow-forward-ios"
          size={size}
          color={color ? colors[color] : colors["black"]}
        />
      )}
      {name === "user-not-found" && <UserNotFoundIcon />}
      {name === "grid" && (
        <Ionicons
          name="grid"
          size={size}
          color={color ? colors[color] : colors["black"]}
        />
      )}
      {name === "hamburger" && (
        <Ionicons
          name="menu"
          size={size}
          color={color ? colors[color] : colors["black"]}
        />
      )}
    </View>
  );
};
