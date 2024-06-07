import { View } from "react-native";
import { StyledModal } from "./StyledModal";
import { StyledText } from "./StyledText";
import { SocialMediaConnections } from "./SocialMediaConnections";
import { StyledPressable } from "./StyledPressable";

export type SocialMediaProps = {
  visible: boolean;
  setVisibility: (v: boolean) => void;
};
export const SocialMediaModal = ({
  visible,
  setVisibility,
}: SocialMediaProps) => {
  return (
    <StyledModal isVisible={visible} setVisibility={setVisibility}>
      <View
        className="items-center self-center p-10 mx-20"
        style={{ maxWidth: 600 }}
      >
        <StyledText weight={600}>Social Media</StyledText>
        <StyledText weight={600} xl2 className="mb-4">
          Manage your social media
        </StyledText>
        <SocialMediaConnections />
        <StyledPressable
          onPress={() => setVisibility(false)}
          color="primary"
          className="w-64 mt-4"
          textVariant={{ color: "white" }}
        >
          Back to Home
        </StyledPressable>
      </View>
    </StyledModal>
  );
};
