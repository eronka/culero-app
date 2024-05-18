import { Pressable, View } from "react-native";
import { StyledText } from "./StyledText";
import { Icon } from "../icons";
import { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";

export type Item = { value: string; label: string };
type SortByProps = {
  items: Array<Item>;
  onSelect: (item: Item) => void;
};

export const SortBy = ({ items, onSelect }: SortByProps) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  useEffect(() => {
    onSelect(items[0]);
  }, []);

  console.log(selectedItemIndex, items[selectedItemIndex]);
  return (
    <View className="flex-row justify-end">
      <View className="hidden md:block">
        <StyledText className="sm:hidden md:block" weight={300} color="gray33">
          Sort by:
        </StyledText>
      </View>
      <RNPickerSelect
        items={items}
        placeholder={{}}
        value={items[selectedItemIndex].value}
        onValueChange={(newValue, index) => {
          console.log(newValue, index);
          // setSelectedLabel(newValue);
          setSelectedItemIndex(index);
          onSelect(items[index]);
        }}
        style={{
          inputWeb: {
            paddingTop: 3,
            fontFamily: "Inter_400Regular",
            backgroundColor: "transparent",
          },
        }}
      >
        <View className="flex-row items-center justify-center">
          <StyledText weight={300} color="gray33">
            Sort by:
          </StyledText>
          <StyledText className="mr-2 ml-2" weight={600} color="darkgrey">
            {items[selectedItemIndex].label}
          </StyledText>
          <Icon name="arrow-down" size={22} />
        </View>
      </RNPickerSelect>
    </View>
  );
};
