// React imports
import React from "react";
import { View, StyleSheet } from "react-native";

// Components
import ResponsiveText from "@/components/ResponsiveText";
import ResponsiveInput from "@/components/ResponsiveInput";

// Constants
import { Constants } from "@/constants";

// Type
import { InputState } from "@/screens/linear-srf/types/inputState";

interface HeightInputProps {
  inputState: InputState;
}

const HeightInput: React.FC<HeightInputProps> = ({ inputState }) => {
  return (
    <View style={styles.heightInputContainer}>
      <View style={[styles.inputContainer, { zIndex: 0 }]}>
        <ResponsiveText title="Hauteur" size={Constants.FONT_SIZE} style={styles.textAlignLeft} />
        <ResponsiveInput
          title=""
          size={Constants.FONT_SIZE}
          input={inputState.height}
          setInput={inputState.setHeight}
          inputStyle={styles.inputStyle}
        />
      </View>

      <View style={styles.rowContainer}>
        <View style={[styles.inputContainer, styles.inputHalfWidth]}>
          <ResponsiveText
            title="Pieds linéaires"
            size={Constants.FONT_SIZE}
            style={styles.textAlignLeft}
          />
          <ResponsiveInput
            title=""
            size={Constants.FONT_SIZE}
            input={inputState.linearFeet}
            setInput={inputState.setLinearFeet}
            inputStyle={styles.inputStyle}
          />
        </View>
        <View style={[styles.inputContainer, styles.inputHalfWidth]}>
          <ResponsiveText
            title="Coins internes"
            size={Constants.FONT_SIZE}
            style={styles.textAlignLeft}
          />
          <ResponsiveInput
            title=""
            size={Constants.FONT_SIZE}
            input={inputState.nInsideCorners}
            setInput={inputState.setNInsideCorners}
            inputStyle={styles.inputStyle}
          />
        </View>
      </View>

      <View style={styles.rowContainer}>
        <View style={[styles.inputContainer, styles.inputHalfWidth]}>
          <ResponsiveText
            title="Coins externes"
            size={Constants.FONT_SIZE}
            style={styles.textAlignLeft}
          />
          <ResponsiveInput
            title=""
            size={Constants.FONT_SIZE}
            input={inputState.nOutsideCorners}
            setInput={inputState.setNOutsideCorners}
            inputStyle={styles.inputStyle}
          />
        </View>

        <View style={[styles.inputContainer, styles.inputHalfWidth]}>
          <ResponsiveText
            title="Coins 45 internes"
            size={Constants.FONT_SIZE}
            style={styles.textAlignLeft}
          />
          <ResponsiveInput
            title=""
            size={Constants.FONT_SIZE}
            input={inputState.n45InsideCorners}
            setInput={inputState.setN45InsideCorners}
            inputStyle={styles.inputStyle}
          />
        </View>
      </View>

      <View style={styles.rowContainer}>
        <View style={[styles.inputContainer, styles.inputHalfWidth]}>
          <ResponsiveText
            title="Coins 45 externes"
            size={Constants.FONT_SIZE}
            style={styles.textAlignLeft}
          />
          <ResponsiveInput
            title=""
            size={Constants.FONT_SIZE}
            input={inputState.n45OutsideCorners}
            setInput={inputState.setN45OutsideCorners}
            inputStyle={styles.inputStyle}
          />
        </View>

        <View style={[styles.inputContainer, styles.inputHalfWidth]}>
          <ResponsiveText
            title="Équerres"
            size={Constants.FONT_SIZE}
            style={styles.textAlignLeft}
          />
          <ResponsiveInput
            title=""
            size={Constants.FONT_SIZE}
            input={inputState.nTJoints}
            setInput={inputState.setNTJoints}
            inputStyle={styles.inputStyle}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heightInputContainer: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 0,
    marginTop: 10,
  },
  inputStyle: {
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  inputHalfWidth: {
    zIndex: 0,
    width: "49%",
  },
  textAlignLeft: {
    textAlign: "left",
  },
});

export default HeightInput;
