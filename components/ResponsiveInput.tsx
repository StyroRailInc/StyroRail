// React imports
import React, { useState, useEffect } from "react";
import { Dimensions, TextInput, StyleSheet, TextStyle, View } from "react-native";

// Utility functions
import calculateSize from "@/utils/CalculateSize";

// Custom hooks
import useDimensionsEffect from "@/hooks/useDimensions";

// Components
import ResponsiveText from "./ResponsiveText";

// Constants
import { Constants } from "@/constants";

interface ResponsiveInputProps {
  title: string;
  size: number;
  input: string;
  inputStyle?: TextStyle | TextStyle[];
  isValidInput?: boolean; // Allows form to be highlighted if input is missing
  setInput: React.Dispatch<any>;
  validateInput?: (input: string) => string | null;
  setIsValidInput?: React.Dispatch<boolean>; // Allows form to be highlighted if input is missing
}

const ResponsiveInput: React.FC<ResponsiveInputProps> = ({
  title,
  size,
  input,
  inputStyle = {},
  isValidInput = true,
  setInput,
  setIsValidInput = () => {},
  validateInput = () => null,
}) => {
  const [fontSize, setFontSize] = useState<number>(
    Math.max(Constants.MIN_FONT_SIZE, calculateSize(Dimensions.get("window").width, size))
  );

  useDimensionsEffect(size, [
    [setFontSize, (width, size) => calculateSize(width, size), Constants.MIN_FONT_SIZE],
  ]);

  const textFontSize = Math.min(fontSize, Constants.MAX_FONT_SIZE);

  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [inputStyleState, setInputStyleState] = useState({
    color: "#2e4459",
    borderColor: "#2e4459",
    borderWidth: 0,
  });

  useEffect(() => {
    setInputStyleState((prev) => ({
      ...prev,
      borderColor: isValidInput ? "#2e4459" : "red",
      borderWidth: isValidInput ? 0 : 1,
    }));
  }, [isValidInput]);

  const validate = (input: string) => {
    const message = validateInput(input);
    setValidationMessage(message);
    setInputStyleState((prev) => ({
      ...prev,
      color: message ? "red" : "#2e4459",
    }));
    setIsValidInput(!message);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, inputStyle, { fontSize: textFontSize }, inputStyleState]}
        value={input}
        inputMode="text"
        placeholder={title}
        blurOnSubmit={false}
        onChangeText={(text) => {
          setInput(text);
          if (validationMessage) validate(text);
        }}
        onBlur={() => validate(input)}
      />
      {validationMessage && (
        <ResponsiveText
          title={validationMessage}
          size={Constants.FONT_SIZE}
          style={{ color: "red", overflow: "visible" }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  input: {
    minWidth: 0,
    minHeight: 0,
    paddingHorizontal: 7,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    fontFamily: "Poppins-Bold",
    paddingTop: 0,
    paddingBottom: 0,
    paddingVertical: 0,
    verticalAlign: "middle",
    width: "100%",
  },
});

export default ResponsiveInput;
