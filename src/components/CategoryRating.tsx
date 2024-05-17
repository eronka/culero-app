import { View, ViewProps } from "react-native";
import { StyledText } from "./StyledText";
import { PercentageBar } from "./PercentageBar";
import { twMerge } from "tailwind-merge";
export type CategoryRatingProps = {
  maxRating?: number;
  rating: number;
  hideBar?: boolean;
  hideNumbers?: boolean;
  categoryName: string;
  height?: number;
  className?: ViewProps["className"];
};
export const CategoryRating = ({
  maxRating = 5,
  rating,
  categoryName,
  hideBar,
  hideNumbers,
  height = 15,
  className,
}: CategoryRatingProps) => {
  return (
    <View
      className={twMerge(
        "flex-row justify-between my-1 items-center",
        className
      )}
    >
      <View className="w-24 mr-2">
        <StyledText weight={600} className="text-xs" color="darkgrey">
          {categoryName}
        </StyledText>
      </View>
      {!hideBar && (
        <View className="flex-grow mr-2">
          <PercentageBar maxValue={maxRating} value={rating} height={height} />
        </View>
      )}
      {!hideNumbers && (
        <View>
          <StyledText weight={700} className="text-sm">
            {rating.toFixed(1)}
            <StyledText
              weight={500}
              className="text-xs"
            >{` / ${maxRating}`}</StyledText>
          </StyledText>
        </View>
      )}
    </View>
  );
};
