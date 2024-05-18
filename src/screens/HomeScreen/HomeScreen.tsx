import { View, FlatList, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import { DrawerHeader } from "../../components/headers/DrawerHeader";
import {
  Card,
  MyReviewsCard,
  SmallReviewCard,
  StyledText,
} from "../../components";
import { useSelfReviews } from "../../hooks/useSelfReviews";
import { ConnectionReviewCard } from "../../components/ConnectionsReviewCard";
import { SocialMediaCard } from "../../icons/SocialMediaCard";
import { useScreenInfo } from "../../hooks/useScreenInfo";

const ReviewsList = () => {
  const reviews = useSelfReviews();
  const { isPhone } = useScreenInfo();

  if (reviews.isLoading) {
    return <ActivityIndicator size="large" className="self-center mt-8" />;
  }

  return (
    <View>
      <FlatList
        data={reviews.data}
        ListEmptyComponent={
          <View className="flex">
            <StyledText>You have no reviews.</StyledText>
          </View>
        }
        // list dosen't scroll on web when overflow is visible
        style={isPhone ? { overflow: "visible" } : {}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="pb-4"
        renderItem={({ item }) => (
          <SmallReviewCard
            className="w-80 mr-4 min-w-48"
            professionalismRating={item.professionalism}
            communicationRating={item.communication}
            reliabilityRating={item.reliability}
            userName={item.userName}
            userImage={item.profilePictureUrl}
            isUserVerified={item.isEmailVerified}
            isAnonymous={item.isAnonymous}
            // TODO: Add property after it is implement on the backend
            isFavourite={false}
          />
        )}
      />
    </View>
  );
};

const HomeScreen = ({}: {}) => {
  return (
    <ScrollView>
      <View className="p-4 md:p-9">
        <DrawerHeader title="Welcome to Culero!" />

        <View className="flex">
          <View className="w-full">
            <Card
              bodyComponent={<ReviewsList />}
              hideHeaderDivider
              headerComponent={
                <StyledText xl2 weight={500}>
                  My latest reviews
                </StyledText>
              }
            />
          </View>
          <View className="md:flex-row flex-1">
            <View className="md:w-2/5 md:pr-8">
              <MyReviewsCard className="mt-4 md:h-full" />
            </View>
            <View className="md:w-2/5 md:pr-8">
              <ConnectionReviewCard
                className="mt-4 md:h-full"
                title="Your connections need review"
              />
            </View>
            <View className="md:w-1/5">
              <SocialMediaCard className="mt-4 md:h-full" />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
