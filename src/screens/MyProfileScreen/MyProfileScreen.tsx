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

import { ReviewsList } from "../../components/ReviewsList";
import { useUser } from "../../hooks";
import { useUserRatings } from "../../hooks/useUserRatings";

export const MyProfileScreen = ({}: {}) => {
  const me = useUser()!;

  return (
    <ScrollView>
      <View className="p-4 md:p-9">
        <DrawerHeader title="My Profile" iconProps={{ name: "user" }} />

        <View className="flex w-full">
          <ProfileCard user={me} />

          <HorizontalDivider className="bg-light-primary my-6" />

          <Card
            bodyComponent={<ReviewsList userId={me!.id} />}
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
