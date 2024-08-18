// React imports
import React, { useState } from "react";
import { View, Pressable, StyleSheet, ViewStyle, TextStyle, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";

// Component
import ResponsiveText from "@/components/ResponsiveText";

// Constants
import { Constants } from "@/constants";

interface DropdownMenuProps {
  options: string[];
  selectedOption: string;
  fontSize: number;
  isDropdownMenuOpen: boolean;
  defaultOption?: string;
  textStyle?: TextStyle;
  headerStyle?: ViewStyle;
  onSelect: (option: string) => void;
  setIsDropdownMenuOpen: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  selectedOption,
  fontSize,
  isDropdownMenuOpen,
  defaultOption = "Select",
  textStyle,
  headerStyle,
  onSelect,
  setIsDropdownMenuOpen,
}) => {
  const [optionHeight, setOptionHeight] = useState<number>(0);

  const handleOptionPress = (option: string): void => {
    onSelect(option);
    setIsDropdownMenuOpen();
  };

  const selectedOptionText = selectedOption !== null ? selectedOption : defaultOption;

  const maxDropdownHeight = Math.min(optionHeight * options.length, optionHeight * 4);

  return (
    <View>
      <Pressable
        style={[
          styles.dropdownHeader,
          headerStyle,
          {
            borderBottomEndRadius: isDropdownMenuOpen ? 0 : 4,
            borderBottomLeftRadius: isDropdownMenuOpen ? 0 : 4,
          },
        ]}
        onPress={setIsDropdownMenuOpen}
      >
        <ResponsiveText
          title={selectedOptionText}
          size={fontSize}
          style={[textStyle ? textStyle : styles.text]}
        />

        <AntDesign
          name={isDropdownMenuOpen ? "up" : "down"}
          size={Constants.UP_ARROW_SIZE}
          color="black"
        />
      </Pressable>
      {isDropdownMenuOpen && (
        <View style={[styles.dropdown, { maxHeight: maxDropdownHeight }]}>
          <ScrollView
            style={[styles.scrollContainer]} // Ensure a max height or flex is provided
            nestedScrollEnabled={true}
          >
            {options.map((option, index) => {
              const isSelected = option === selectedOptionText;
              return !isSelected ? (
                <Pressable
                  key={index}
                  style={[styles.dropdownOption, headerStyle]}
                  onPress={() => handleOptionPress(option)}
                  onLayout={(event) => {
                    setOptionHeight(event.nativeEvent.layout.height);
                  }}
                >
                  <ResponsiveText
                    title={option}
                    size={fontSize}
                    style={[textStyle ? textStyle : styles.text, { color: "white" }]}
                  />
                </Pressable>
              ) : null;
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: "#00aaef",
    borderRadius: 4,
    backgroundColor: "white",
  },
  dropdown: {
    position: "relative",
    left: 0,
    right: 0,
    zIndex: 1001,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  dropdownOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: "#00aaef",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#00aaef",
    width: "100%",
  },
  text: {
    textAlign: "left",
    flex: 1,
  },
});

export default DropdownMenu;
