import { View, Text, Alert, ScrollView } from "react-native";
import React from "react";
import {
  StyledPressable,
  StyledText,
  StyledTextInput,
  SearchBar,
  SortBy,
  HorizontalDivider,
  SocialMediaConnections,
  StyledStarRating,
  OverallRateCard,
  ReviewCard,
  SmallReviewCard,
  MyReviewsCard,
  ConnectionDetails,
  InviteCard,
  NewUserCard,
  UserCard,
  ProfileCard,
  GiveReviewCard,
} from "../../components";
import { StyledOtpInput } from "../../components/StyledOtpInput";
import { PasswordStrength } from "../../components/PasswordStrength";
import { ConnectionReviewCard } from "../../components/ConnectionsReviewCard";
import { Icon } from "../../icons";
import { SocialMediaCard } from "../../icons/SocialMediaCard";
import { SearchableConnectionsCard } from "../../components/SearchableConnectionsCard";
import { useLogout } from "../../hooks/useLogout";
import { useUser } from "../../hooks";
import { ReviewState } from "../../types/Review";
import { AuthType } from "../../types";

const InitialScreen = ({}: {}) => {
  const user = useUser()!;
  const logout = useLogout();
  return (
    <ScrollView>
      <StyledText center onPress={() => logout()} className="mt-16">
        {`Logout ${user.data?.email}`}
      </StyledText>
      <View className="flex-1 bg-dark-gray items-center h-full py-20 px-4 md:px-80">
        <StyledText>
          Hello, here are your components. For starters, this is the default
          text
        </StyledText>
        <StyledText>Buttons:</StyledText>
        <StyledPressable
          onPress={() => {
            Alert.alert("I was pressed!");
          }}
        >
          I am a default btn
        </StyledPressable>
        <StyledPressable
          color="primary"
          className="mt-2"
          textVariant={{ weight: 900 }}
          onPress={() => {
            Alert.alert("I was pressed!");
          }}
        >
          I am a blue btn with weight 900
        </StyledPressable>
        <StyledPressable
          className="mt-2"
          color="primary"
          fw
          onPress={() => {
            Alert.alert("I was pressed!");
          }}
        >
          I am a full width btn
        </StyledPressable>
        <StyledPressable
          color="white"
          className="mt-2"
          onPress={() => {
            Alert.alert("I was pressed!");
          }}
          rightIconProps={{ name: "edit" }}
        >
          Edit Profile
        </StyledPressable>
        <StyledPressable
          color="primary"
          rounded
          className="mt-2"
          textVariant={{ color: "white" }}
          onPress={() => {
            Alert.alert("I was pressed!");
          }}
        >
          Search
        </StyledPressable>
        <StyledPressable
          fw
          color="white"
          className="mt-2 border"
          onPress={() => {
            Alert.alert("I was pressed!");
          }}
          leftIconProps={{ name: "google" }}
        >
          Continue with Google
        </StyledPressable>
        <StyledTextInput
          containerClassName="mt-2"
          placeholder="Enter your email addres"
        />
        <StyledOtpInput containerClassName="mt-2" />
        <SearchBar
          placeholder="Discover and review people"
          containerClassName="mt-2"
        />
        <SearchBar
          placeholder="Enter social link"
          containerClassName="mt-2"
          onSubmit={(value) => Alert.alert(`Submitted with value ${value}`)}
        />
        <SortBy
          items={[
            { value: "Recently added", label: "Recently added" },
            { value: "smth else", label: "Something else" },
          ]}
          onSelect={(item) => console.log("selected item", item)}
        />
        <StyledText>Divider: </StyledText>
        <HorizontalDivider className="my-6" />
        <PasswordStrength type="weak" />
        <PasswordStrength type="strong" />
        <SocialMediaConnections />
        <StyledStarRating />
        <OverallRateCard
          className="mt-8"
          professionalismRating={4.1}
          reliabilityRating={5}
          communicationRating={2}
        />
        <ReviewCard
          className="mt-8"
          review={{
            professionalism: 2,
            reliability: 4,
            communication: 2,
            postedBy: {
              profilePictureUrl:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              name: "asdas",
              id: "sdas",
            },
            isFavorite: true,
            postedToId: "dasda",
            isAnonymous: false,
            isOwnReview: false,
            state: ReviewState.APPROVED,
            id: "dasdas",
            createdAt: new Date().toISOString(),
            comment:
              "What impressed me the most was Logan Davis's strategic thinking and the way they handled challenges. Their clear communication and willingness to listen to team members' ideas created a positive and collaborative work environment.",
          }}
        />
        <ReviewCard
          className="mt-8"
          review={{
            professionalism: 2,
            reliability: 4,
            communication: 2,
            postedBy: {
              profilePictureUrl:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              name: "asdas",
              id: "sdas",
            },
            isFavorite: true,
            postedToId: "dasda",
            isAnonymous: false,
            isOwnReview: false,
            state: ReviewState.APPROVED,
            id: "dasdas",
            createdAt: new Date().toISOString(),
            comment:
              "What impressed me the most was Logan Davis's strategic thinking and the way they handled challenges. Their clear communication and willingness to listen to team members' ideas created a positive and collaborative work environment.",
          }}
        />
        <SmallReviewCard
          className="mt-8 w-2/3"
          review={{
            professionalism: 2,
            reliability: 4,
            communication: 2,
            postedBy: {
              profilePictureUrl:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              name: "asdas",
              id: "sdas",
            },
            isFavorite: true,
            postedToId: "dasda",
            isAnonymous: false,
            isOwnReview: false,
            state: ReviewState.APPROVED,
            id: "dasdas",
            createdAt: new Date().toISOString(),
            comment:
              "What impressed me the most was Logan Davis's strategic thinking and the way they handled challenges. Their clear communication and willingness to listen to team members' ideas created a positive and collaborative work environment.",
          }}
        />
        <SmallReviewCard
          className="mt-8 flex-auto w-2/3"
          review={{
            professionalism: 2,
            reliability: 4,
            communication: 2,
            postedBy: {
              profilePictureUrl:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              name: "asdas",
              id: "sdas",
            },
            isFavorite: true,
            postedToId: "dasda",
            isAnonymous: false,
            isOwnReview: false,
            state: ReviewState.APPROVED,
            id: "dasdas",
            createdAt: new Date().toISOString(),
            comment:
              "What impressed me the most was Logan Davis's strategic thinking and the way they handled challenges. Their clear communication and willingness to listen to team members' ideas created a positive and collaborative work environment.",
          }}
        />
        <MyReviewsCard className="mt-8 " />
        <ConnectionDetails
          className="mt-8"
          userName="Ionel Ionescu"
          isVerified={true}
          userPosition="Mint rubber"
          userAvatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <ConnectionReviewCard
          className="mt-8"
          title="Your connections need review"
        />
        <View className="flex-row mt-8">
          <Icon name="github-color" />
          <Icon name="linkedin-color" />
          <Icon name="instagram-color" />
          <Icon name="twitter-color" />
        </View>
        <SocialMediaCard className="mt-8 w-1/2" />
        <InviteCard className="mt-8 w-3/4" />
        <NewUserCard
          className="mt-8"
          connection={{
            name: "Logan Davis",
            headline: "UX designer",
            isEmailVerified: true,
            reviewsCount: 20,
            connectionsCount: 100,
            joinedAt: new Date(),
            authType: AuthType.EMAIL,
            id: "321312",
            isConnection: false,
            email: "daskdla@dasl.com",
            profilePictureUrl:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        />
        <UserCard
          className="mt-8"
          connection={{
            name: "Logan Davis",
            headline: "UX designer",
            isEmailVerified: true,
            reviewsCount: 20,
            connectionsCount: 100,
            joinedAt: new Date(),
            authType: AuthType.EMAIL,
            id: "321312",
            isConnection: false,
            email: "daskdla@dasl.com",
            profilePictureUrl:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        />
        <ProfileCard
          className="hidden md:block mt-8"
          userName="Logan Davis"
          userPosition="UX designer"
          userLocation="Los Angeles Metropolitan Area"
          isVerified={true}
          revewisCount={20}
          connectionsCount={100}
          professionalismRating={4.1}
          reliabilityRating={5}
          communicationRating={2.3}
          userAvatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <GiveReviewCard className="hidden md:block mt-8" />
        <SearchableConnectionsCard className="mt-2" />
      </View>
    </ScrollView>
  );
};

export default InitialScreen;
