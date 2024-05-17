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

const ReviewsList = () => {
  const reviews = useSelfReviews();
  console.log("items", reviews.data?.length);

  if (reviews.isLoading) {
    return <ActivityIndicator size="large" className="self-center mt-8" />;
  }

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 5,
        }}
        data={reviews.data}
        ListEmptyComponent={
          <View className="flex">
            <StyledText>You have no reviews.</StyledText>
          </View>
        }
        style={{ overflow: "visible" }}
        horizontal={true}
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

        <View className="mt-6">
          <Card
            bodyComponent={<ReviewsList />}
            hideHeaderDivider
            headerComponent={
              <StyledText xl2 weight={500}>
                My latest reviews
              </StyledText>
            }
          />
          <MyReviewsCard className="mt-4" />
          <ConnectionReviewCard
            className="mt-4"
            title="Your connections need review"
          />
          <SocialMediaCard className="mt-4" />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
