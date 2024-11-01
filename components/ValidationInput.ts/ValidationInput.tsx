// React imports
import React, { useState } from "react";
import { Dimensions, TextInput, StyleSheet, TextStyle, View } from "react-native";

// Utility functions
import calculateSize from "@/utils/CalculateSize";

// Custom hooks
import useDimensionsEffect from "@/hooks/useDimensions";

// Components
import ResponsiveText from "../ResponsiveText";

// Constants
import { Constants } from "@/constants";

interface ResponsiveInputProps {
  title: string;
  size: number;
  input: string;
  inputStyle?: TextStyle | TextStyle[];
  errorMessage: string;
  setInput: React.Dispatch<any>;
  validateInput: (input: string, emptyStringIsValid?: boolean) => {};
}

const ResponsiveInput: React.FC<ResponsiveInputProps> = ({
  title,
  size,
  input,
  inputStyle,
  errorMessage,
  setInput,
  validateInput,
}) => {
  const [fontSize, setFontSize] = useState<number>(
    Math.max(Constants.MIN_FONT_SIZE, calculateSize(Dimensions.get("window").width, size))
  );

  useDimensionsEffect(size, [
    [setFontSize, (width, size) => calculateSize(width, size), Constants.MIN_FONT_SIZE],
  ]);

  const textFontSize: number =
    fontSize > Constants.MAX_FONT_SIZE ? Constants.MAX_FONT_SIZE : fontSize;

  const [validationMessage, setValidationMessage] = useState<string | null>();
  const [inputColor, setInputColor] = useState<string>("#2e4459");

  const validate = () => {
    const isValid = validateInput(input);
    if (!isValid) {
      setValidationMessage(errorMessage);
      setInputColor("red");
    } else {
      setValidationMessage(null);
      setInputColor("#2e4459");
    }
  };

  return (
    <View>
      <TextInput
        style={[
          styles.input,
          inputStyle,
          {
            fontSize: textFontSize,
            includeFontPadding: false,
            height: textFontSize * Constants.INPUT_HEIGHT_ADJUSTMENT_FACTOR,
            color: inputColor,
          },
        ]}
        value={input}
        inputMode="text"
        placeholder={title}
        blurOnSubmit={false}
        onChangeText={(text) => setInput(text)}
        onBlur={validate}
      />
      {validationMessage && (
        <ResponsiveText
          title={validationMessage}
          size={Constants.FONT_SIZE}
          style={{ color: "red" }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    textAlignVertical: "center",
  },
});

export default ResponsiveInput;
