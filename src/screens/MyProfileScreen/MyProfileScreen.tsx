import { View, FlatList, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import { DrawerHeader } from "../../components/headers/DrawerHeader";
import {
  Card,
  HorizontalDivider,
  MyReviewsCard,
  ProfileCard,
  StyledText,
} from "../../components";
import { ConnectionReviewCard } from "../../components/ConnectionsReviewCard";
import { SocialMediaCard } from "../../icons/SocialMediaCard";
import { ReviewsList } from "../../components/ReviewsList";
import { useUser } from "../../hooks";
import { useSelfRatings } from "../../hooks/useSelfRatings";

export const MyProfileScreen = ({}: {}) => {
  const me = useUser();
  const avgs = useSelfRatings();

  return (
    <ScrollView>
      <View className="p-4 md:p-9">
        <DrawerHeader title="My Profile" iconProps={{ name: "user" }} />

        <View className="flex w-full">
          {me.isFetched && me.data && avgs.isFetched && avgs.data && (
            <ProfileCard
              userAvatar={me.data.profilePictureUrl}
              userPosition={me.data.headline}
              userName={me.data.name}
              isVerified={me.data.isEmailVerified}
              revewisCount={-1}
              connectionsCount={-1}
              professionalismRating={avgs.data.professionalism}
              reliabilityRating={avgs.data.reliability}
              communicationRating={avgs.data.communication}
              userLocation={"Location not implemented yet"}
            />
          )}
          <HorizontalDivider className="bg-light-primary my-8" />

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
      </View>
    </ScrollView>
  );
};
