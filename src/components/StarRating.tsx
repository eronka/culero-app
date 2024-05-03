import React from "react";
import colors from "../../colors";
import { Rating, SwipeRatingProps } from "react-native-ratings";
import { View, ViewProps } from "react-native";

const STAR_IMAGE = require("../../assets/star.png");
const STAR_DARK_IMAGE = require("../../assets/star_dark.png");
const STAR_DARK_BG_WHITE_IMAGE = require("../../assets/star_dark_bg_white.png");

export const StyledStarRating = ({
  containerClassName,
  isDarkBg = false,
  isDarkStarBorder = false,
  color = "light-primary",
  ...props
}: SwipeRatingProps & {
  containerClassName?: ViewProps["className"];
  isDarkBg?: boolean;
  isDarkStarBorder?: boolean;
  color?: keyof typeof colors;
}) => {
  return (
    <View className={containerClassName}>
      <Rating
        type="custom"
        ratingColor={colors[color]}
        ratingImage={
          isDarkBg
            ? STAR_DARK_IMAGE
            : isDarkStarBorder
            ? STAR_DARK_BG_WHITE_IMAGE
            : STAR_IMAGE
        }
        imageSize={18}
        {...props}
      />
    </View>
  );
};
