import { View, ViewProps } from "react-native";
import { Card } from "./Card";
import { StyledText } from "./StyledText";
import { CategoryRating } from "./CategoryRating";
import { twMerge } from "tailwind-merge";
import { useScreenInfo } from "../hooks/useScreenInfo";
import { useMemo } from "react";

export type OverallRateCardProps = {
  maxRating?: number;
  professionalismRating: number;
  reliabilityRating: number;
  communicationRating: number;
  className?: ViewProps["className"];
  barsContainerClassName?: ViewProps["className"];
};

export type OverallScoreProps = {
  professionalismRating: number;
  reliabilityRating: number;
  communicationRating: number;
  maxRating?: number;
  big?: boolean;
  className?: ViewProps["className"];
};
export const OverallScore = ({
  professionalismRating,
  communicationRating,
  reliabilityRating,
  maxRating = 5,
  big,
  className,
}: OverallScoreProps) => {
  const { isPhone } = useScreenInfo();
  const overallRating = useMemo(
    () => (communicationRating + professionalismRating + reliabilityRating) / 3,
    [communicationRating, professionalismRating, reliabilityRating]
  );

  return (
    <View className={twMerge("md:align-center md:justify-center", className)}>
      <StyledText
        weight={700}
        center={!isPhone}
        xl6={!isPhone || big}
        xl3={isPhone && !big}
      >
        {overallRating.toLocaleString("en", {
          maximumFractionDigits: 1,
        })}
        <StyledText weight={500} xl2>{`/${maxRating}`}</StyledText>
      </StyledText>
      <StyledText weight={500} color="nickel" xl2={!isPhone || big}>
        Overall Rate
      </StyledText>
    </View>
  );
};

export type OverallBarsRatingProps = {
  professionalismRating: number;
  reliabilityRating: number;
  communicationRating: number;
  maxRating?: number;
  className?: ViewProps["className"];
};
export const OverallBarsRating = ({
  professionalismRating,
  communicationRating,
  reliabilityRating,
  maxRating = 5,
  className,
}: OverallBarsRatingProps) => {
  const { isPhone } = useScreenInfo();
  return (
    <View className={twMerge("flex-grow md:ml-10 mt-4 md:mt-0", className)}>
      <CategoryRating
        barBackgroundColor="transparent"
        height={isPhone ? 15 : 20}
        categoryName="Professionalsim"
        rating={professionalismRating}
      />
      <CategoryRating
        className="my-2"
        barBackgroundColor="transparent"
        height={isPhone ? 15 : 20}
        categoryName="Reliability"
        rating={reliabilityRating}
      />
      <CategoryRating
        barBackgroundColor="transparent"
        height={isPhone ? 15 : 20}
        categoryName="Communication"
        rating={communicationRating}
      />
    </View>
  );
};

export const OverallRateCard = ({
  maxRating = 5,
  communicationRating,
  professionalismRating,
  reliabilityRating,
  className,
  barsContainerClassName,
}: OverallRateCardProps) => {
  return (
    <Card
      className={twMerge("border border-primary md:border-none", className)}
      bodyComponent={
        <View className="p-4 md:flex-row md:items-center">
          <OverallScore
            professionalismRating={professionalismRating}
            communicationRating={communicationRating}
            reliabilityRating={reliabilityRating}
            maxRating={maxRating}
          />
          <OverallBarsRating
            professionalismRating={professionalismRating}
            communicationRating={communicationRating}
            reliabilityRating={reliabilityRating}
            maxRating={maxRating}
            className={barsContainerClassName}
          />
        </View>
      }
    />
  );
};
