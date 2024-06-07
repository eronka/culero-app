import { FlatList } from "react-native-gesture-handler";
import {
  Avatar,
  Card,
  HorizontalDivider,
  SocialMediaConnections,
  StyledPressable,
  StyledText,
  StyledTextInput,
} from "../../components";
import { SettingsLayout } from "./components/SettingsLayout";
import { useMemo, useState } from "react";
import { useUser } from "../../hooks";
import { ActivityIndicator, Pressable, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useScreenInfo } from "../../hooks/useScreenInfo";
import { useUpdateProfilePicture } from "../../hooks/useUpdateProfilePicture";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import { StyledModal } from "../../components/StyledModal";
import { useDeleteAccount } from "../../hooks/useDeleteAccount";
import { SocialMediaModal } from "../../components/SocialMediaModal";

export type SettingItemProps = {
  title: string;
  subtitle?: string;
  buttonText: string;
  imageUrl?: string;
  showImage?: boolean;
  isImageLoading?: boolean;
  onButtonPress?: () => void;
  onSaveEdit?: (value?: string) => void;
};
const SettingItem = ({
  title,
  subtitle,
  imageUrl,
  buttonText,
  showImage,
  isImageLoading,
  onSaveEdit,
  onButtonPress,
}: SettingItemProps) => {
  const [editing, setEdit] = useState(false);
  const [value, setValue] = useState(subtitle);

  return (
    <View className="flex-row items-center py-8 justify-between">
      <View className="w-2/3 flex-row items-center text-wrap">
        <View style={{ width: 84 }} className="mx-5">
          {showImage &&
            (isImageLoading ? (
              <ActivityIndicator />
            ) : (
              <Pressable onPress={onButtonPress}>
                <Avatar size={84} userImage={imageUrl} />
              </Pressable>
            ))}
        </View>
        <View className="text-wrap shrink">
          <StyledText weight={600} xl2>
            {title}
          </StyledText>
          {editing ? (
            <StyledTextInput
              value={value}
              autoFocus={true}
              onChangeText={(value) => setValue(value)}
            />
          ) : (
            <StyledText color="gray65">{subtitle}</StyledText>
          )}
        </View>
      </View>
      <StyledPressable
        color="white"
        className="border border-primary self-end h-8"
        textVariant={{ color: "primary", sm: true }}
        onPress={
          onButtonPress
            ? onButtonPress
            : () => {
                if (!editing) {
                  setEdit(true);
                } else {
                  if (onSaveEdit) {
                    onSaveEdit(value);
                  }
                  setEdit(false);
                }
              }
        }
      >
        {editing ? "Save" : buttonText}
      </StyledPressable>
    </View>
  );
};

type DeleteModalProps = {
  visible: boolean;
  setVisibility: (v: boolean) => void;
};
const DeleteModal = ({ visible, setVisibility }: DeleteModalProps) => {
  const deleteAccount = useDeleteAccount();
  return (
    <StyledModal isVisible={visible} setVisibility={setVisibility}>
      <View className="min-w-3/4 px-20 my-6">
        <StyledText weight={600} xl2 center>
          Are you sure you want do delete your account?
        </StyledText>
        <StyledText center lg className="mt-4">
          This action cannot be undone!
        </StyledText>
        <View className="flex-row justify-between mt-16">
          <StyledPressable
            color="transparent"
            textVariant={{ color: "deep-red" }}
            onPress={async () => {
              await deleteAccount.mutateAsync();
              setVisibility(false);
            }}
          >
            Yes, proceed
          </StyledPressable>
          <StyledPressable
            onPress={() => setVisibility(false)}
            color="transparent"
          >
            No, cancel
          </StyledPressable>
        </View>
      </View>
    </StyledModal>
  );
};

export const AccountSettingsScreen = () => {
  const user = useUser()!;
  const { platform } = useScreenInfo();
  const updateProfilePicMutation = useUpdateProfilePicture();
  const updateProfie = useUpdateProfile();
  const [showSocialMediaModal, setShowSocialMediaModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const data: SettingItemProps[] = useMemo(() => {
    return [
      {
        title: "Profile photo",
        buttonText: "Update photo",
        subtitle: "This helps people recognize you in Culero.",
        imageUrl: user.profilePictureUrl,
        showImage: true,
        isImageLoading: updateProfilePicMutation.isPending,
        onButtonPress: () => {
          pickImage();
        },
      },
      {
        title: "Name",
        buttonText: "Edit",
        subtitle: user.name,
        onSaveEdit: (value) => {
          updateProfie.mutate({ name: value });
        },
      },
      {
        title: "Headline",
        buttonText: "Edit",
        subtitle: user.headline,
        onSaveEdit: (value) => {
          updateProfie.mutate({ headline: value });
        },
      },
      // {
      //   title: "Email Address",
      //   buttonText: "Edit",
      //   subtitle: user.email,
      //   onSaveEdit: (value) => {
      //     updateProfie.mutate({ email: value });
      //   },
      // },
      {
        title: "Social Media",
        buttonText: "Update",
        subtitle: "Manage your social media",
        onButtonPress: () => {
          setShowSocialMediaModal(true);
        },
      },
      {
        title: "Delete your account",
        buttonText: "Delete account",
        subtitle: `By deleting your account, you’ll no longer be able
to access any of your albums on Culero.`,
        onButtonPress: () => {
          setShowDeleteModal(true);
        },
      },
    ];
  }, [user, updateProfilePicMutation.isPending]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      if (platform !== "web") {
        updateProfilePicMutation.mutate(
          `data:${result.assets[0].mimeType};base64,${result.assets[0].base64}`
        );
      } else {
        updateProfilePicMutation.mutate(result.assets[0].uri);
      }
    }
  };

  return (
    <SettingsLayout canGoBack={true}>
      <>
        <SocialMediaModal
          visible={showSocialMediaModal}
          setVisibility={setShowSocialMediaModal}
        />
        <DeleteModal
          visible={showDeleteModal}
          setVisibility={setShowDeleteModal}
        />
        <Card
          bodyComponent={
            <FlatList
              contentContainerClassName="p-6"
              ItemSeparatorComponent={() => (
                <View className="w-full px-4">
                  <HorizontalDivider />
                </View>
              )}
              data={data}
              renderItem={({ item }) => <SettingItem {...item} />}
            />
          }
        />
      </>
    </SettingsLayout>
  );
};
