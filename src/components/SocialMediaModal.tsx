import { View, ScrollView } from "react-native";
import { StyledModal } from "./StyledModal";
import { StyledText } from "./StyledText";
import { SocialMediaConnections } from "./SocialMediaConnections";
import { StyledPressable } from "./StyledPressable";
import { useScreenInfo } from "../hooks/useScreenInfo";

export type SocialMediaProps = {
  visible: boolean;
  setVisibility: (v: boolean) => void;
};
export const SocialMediaModal = ({
  visible,
  setVisibility,
}: SocialMediaProps) => {
  const { height } = useScreenInfo();
  return (
    <StyledModal isVisible={visible} setVisibility={setVisibility}>
      <View
        className="items-center self-center p-10 md:mx-20"
        style={{ maxWidth: 600 }}
      >
        <StyledText weight={600}>Social Media</StyledText>
        <StyledText weight={600} xl2 className="mb-4">
          Manage your social media
        </StyledText>
        <ScrollView style={{ maxHeight: (height * 2) / 3 }}>
          <SocialMediaConnections />
          <StyledPressable
            onPress={() => setVisibility(false)}
            color="primary"
            className="w-64 mt-4 self-center"
            textVariant={{ color: "white" }}
          >
            Back to Home
          </StyledPressable>
        </ScrollView>
      </View>
    </StyledModal>
  );
};
