import { Pressable, PressableProps } from "react-native";
import { Icon } from "../icons";
import { twMerge } from "tailwind-merge";

export type FavouriteButtonProps = {
  isFav: boolean;
  size?: number;
} & PressableProps;
export const FavouriteButton = ({
  isFav,
  size = 20,
  className,
  ...props
}: FavouriteButtonProps) => {
  return (
    <Pressable
      className={twMerge(
        "hover:bg-grayF2 rounded-full items-center justify-center flex",
        className
      )}
      style={{ height: size + 23, width: size + 23 }}
      {...props}
    >
      <Icon
        name={isFav ? "heart" : "heart-o"}
        color={isFav ? "deep-red" : "black"}
        size={size}
      />
    </Pressable>
  );
};
