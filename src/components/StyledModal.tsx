import { Modal, Pressable, View } from "react-native";
import { IconButton } from "./IconButton";

export type ModalProps = {
  isVisible: boolean;
  setVisibility: (isVisible: boolean) => void;

  children?: React.ReactNode;
};

export const StyledModal = ({
  isVisible,
  setVisibility,
  children,
}: ModalProps) => {
  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      transparent={true}
      onRequestClose={() => setVisibility(false)}
    >
      <Pressable
        className="bg-gray38/80 h-full justify-center"
        onPress={() => setVisibility(false)}
      >
        <Pressable className="flex self-center cursor-default">
          <View className="bg-white rounded-lg p-6">
            <IconButton
              className="self-end"
              onPress={() => setVisibility(false)}
              iconProps={{ name: "close", size: 18 }}
            />
            {children}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
