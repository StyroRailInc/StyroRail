// React imports
import React from "react";
import { View, StyleSheet } from "react-native";

// Components
import ResponsiveText from "@/components/ResponsiveText";
import ResponsiveInput from "@/components/ResponsiveInput";

// Constants
import { Constants } from "@/constants";

// Type
import { InputState, InputAction } from "../../types/BBTypes";

interface InputsProps {
  inputState: InputState;
  dispatch: React.Dispatch<InputAction>;
}

const Inputs: React.FC<InputsProps> = ({ inputState, dispatch }) => {
  return (
    <View style={styles.heightInputContainer}>
      <View style={[styles.inputContainer, { zIndex: 0 }]}>
        <ResponsiveText title="Hauteur" size={Constants.FONT_SIZE} style={styles.textAlignLeft} />
        <ResponsiveInput
          title=""
          size={Constants.FONT_SIZE}
          input={inputState.height}
          setInput={(value) => {
            dispatch({ type: "setHeight", payload: value });
          }}
        />
      </View>

      <View style={styles.rowContainer}>
        <View style={[styles.inputContainer]}>
          <ResponsiveText
            title="Pieds linéaires"
            size={Constants.FONT_SIZE}
            style={styles.textAlignLeft}
          />
          <ResponsiveInput
            title=""
            size={Constants.FONT_SIZE}
            input={inputState.length}
            setInput={(value) => {
              dispatch({ type: "setLength", payload: value });
            }}
          />
        </View>
      </View>

      <View style={styles.rowContainer}>
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
            setInput={(value) => {
              dispatch({ type: "setNInsideCorners", payload: value });
            }}
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
            setInput={(value) => {
              dispatch({ type: "setN45InsideCorners", payload: value });
            }}
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
            setInput={(value) => {
              dispatch({ type: "setNOutsideCorners", payload: value });
            }}
          />
        </View>
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
            setInput={(value) => {
              dispatch({ type: "setN45OutsideCorners", payload: value });
            }}
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

export default Inputs;
