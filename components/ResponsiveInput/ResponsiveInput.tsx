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
  isValid?: boolean;
  inputStyle?: TextStyle | TextStyle[];
  setInput: React.Dispatch<any>;
  validateInput: (input: string) => string | null;
}

const ResponsiveInput: React.FC<ResponsiveInputProps> = ({
  title,
  size,
  input,
  isValid,
  inputStyle,
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

  const validate = (input: string) => {
    const message = validateInput(input);
    if (message) {
      setInputColor("red");
    } else {
      setInputColor("#2e4459");
    }
    setValidationMessage(message);
  };

  const calculatedStyle = {
    fontSize: textFontSize,
    includeFontPadding: false,
    height: textFontSize * Constants.INPUT_HEIGHT_ADJUSTMENT_FACTOR,
    color: inputColor,
    borderColor: isValid ? undefined : "red",
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, inputStyle, calculatedStyle]}
        value={input}
        inputMode="text"
        placeholder={title}
        blurOnSubmit={false}
        onChangeText={
          validationMessage
            ? (text) => {
                setInput(text);
                validate(text);
              }
            : (text) => setInput(text)
        }
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
    textAlignVertical: "center",
    width: "100%",
  },
});

export default ResponsiveInput;
