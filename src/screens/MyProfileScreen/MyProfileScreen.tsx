import { View, ScrollView } from "react-native";
import React from "react";
import { DrawerHeader } from "../../components/headers/DrawerHeader";
import { HorizontalDivider, ProfileCard } from "../../components";

import { useUser } from "../../hooks";
import { MyLatestReviews } from "../../components/MyLatestReviews";

export const MyProfileScreen = ({}: {}) => {
  const me = useUser()!;

  return (
    <ScrollView>
      <View className="p-4 md:p-9">
        <DrawerHeader title="My Profile" iconProps={{ name: "user" }} />

        <View className="flex w-full">
          <ProfileCard user={me} />

          <HorizontalDivider className="bg-light-primary my-6" />

          <MyLatestReviews allowPlatformWideReviews={false} />
        </View>
      </View>
    </ScrollView>
  );
};
