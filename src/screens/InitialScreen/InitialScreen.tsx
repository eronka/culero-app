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

const InitialScreen = ({}: {}) => {
  return (
    <ScrollView>
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
          overallRating={4.5}
          professionalismRating={4.1}
          reliabilityRating={5}
          communicationRating={2}
        />
        <ReviewCard
          className="mt-8"
          professionalismRating={4.1}
          reliabilityRating={5}
          communicationRating={2.3}
          overallRating={4.5}
          date={new Date()}
          isFavourite={true}
          userImage="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          review="What impressed me the most was Logan Davis's strategic thinking and the way they handled challenges. Their clear communication and willingness to listen to team members' ideas created a positive and collaborative work environment."
        />
        <ReviewCard
          className="mt-8"
          professionalismRating={4.1}
          reliabilityRating={5}
          communicationRating={2.3}
          overallRating={4.5}
          date={new Date()}
          isFavourite={false}
          isAnonymous={true}
          userImage="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          review="What impressed me the most was Logan Davis's strategic thinking and the way they handled challenges. Their clear communication and willingness to listen to team members' ideas created a positive and collaborative work environment."
        />
        <SmallReviewCard
          className="mt-8 w-2/3"
          professionalismRating={4.1}
          reliabilityRating={5}
          communicationRating={2.3}
          overallRating={4.5}
          isFavourite={false}
          userName="Ionel Ionescu"
          isUserVerified={true}
          userImage="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <SmallReviewCard
          className="mt-8 flex-auto w-2/3"
          professionalismRating={4.1}
          reliabilityRating={5}
          communicationRating={2.3}
          overallRating={4.5}
          isFavourite={true}
          userName="Ionel Ionescu"
          isUserVerified={false}
          userImage="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <MyReviewsCard
          className="mt-8 "
          professionalismRating={4.1}
          reliabilityRating={5}
          communicationRating={2.3}
          overallRating={4.5}
        />
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
          userName="Ethan Moore"
          userPosition="profession"
        />
        <UserCard
          className="mt-8"
          userName="Logan Davis"
          userPosition="UX designer"
          isVerified={true}
          revewisCount={20}
          connectionsCount={100}
          joinedDate={new Date()}
          userAvatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
          overallRating={4.5}
          userAvatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <GiveReviewCard className="hidden md:block mt-8" />
        <SearchableConnectionsCard
          className="mt-2"
          users={[
            {
              firstName: "Ionel",
              lastName: "Ionescu",
              isVerified: true,
              position: "Mint rubber",
              avatar:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              firstName: "Alex",
              lastName: "Alexandrescu",
              isVerified: true,
              position: "Designer",
              avatar:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              firstName: "Gigi",
              lastName: "Popescu",
              isVerified: true,
              position: "Mint rubber",
              avatar:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              firstName: "FIfi",
              lastName: "Ionescu",
              isVerified: true,
              position: "Mint rubber",
              avatar:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
          ]}
        />
      </View>
    </ScrollView>
  );
};

export default InitialScreen;
