import { View, ScrollView } from "react-native";
import React from "react";
import { DrawerHeader } from "../../components/headers/DrawerHeader";
import { MyReviewsCard } from "../../components";
import { ConnectionReviewCard } from "../../components/ConnectionsReviewCard";
import { SocialMediaCard } from "../../icons/SocialMediaCard";
import { useUser } from "../../hooks";
import { MyLatestReviews } from "../../components/MyLatestReviews";

const HomeScreen = ({}: {}) => {
  return (
    <ScrollView>
      <View className="p-4 md:p-9">
        <DrawerHeader title="Welcome to Culero!" />

        <View className="flex">
          <View className="w-full">
            <MyLatestReviews />
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
