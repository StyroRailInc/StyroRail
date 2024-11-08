// React imports
import React from "react";
import { View, StyleSheet } from "react-native";

// Components
import ResponsiveText from "@/components/ResponsiveText";
import ResponsiveInput from "@/components/ResponsiveInput";

// Constants
import { Constants } from "@/constants";

// Type
import { InputState, InputAction } from "../types/BBTypes";

// Utility function
import { validateImperialInput, validateIntegerInput } from "@/utils/ValidateInput";

interface InputsProps {
  inputState: InputState;
  inputDispatch: React.Dispatch<InputAction>;
}

const Inputs: React.FC<InputsProps> = ({ inputState, inputDispatch }) => {
  return (
    <View style={styles.container}>
      <View style={styles.solidBorder}>
        <View style={styles.legend}>
          <ResponsiveText title="Dimensions" size={Constants.FONT_SIZE} />
        </View>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <ResponsiveText title="Hauteur" size={Constants.FONT_SIZE} />
            <ResponsiveInput
              title=""
              size={Constants.FONT_SIZE}
              input={inputState.height}
              isValidInput={inputState.isValidHeight}
              inputStyle={styles.inputStyle}
              setInput={(value) => inputDispatch({ type: "setHeight", payload: value })}
              validateInput={validateImperialInput}
              setIsValidInput={(value) =>
                inputDispatch({ type: "setIsValidHeight", payload: value })
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <ResponsiveText title="Pieds linéaires" size={Constants.FONT_SIZE} />
            <ResponsiveInput
              title=""
              size={Constants.FONT_SIZE}
              input={inputState.length}
              isValidInput={inputState.isValidLength}
              inputStyle={styles.inputStyle}
              setInput={(value) => inputDispatch({ type: "setLength", payload: value })}
              validateInput={validateImperialInput}
              setIsValidInput={(value) =>
                inputDispatch({ type: "setIsValidLength", payload: value })
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <ResponsiveText title="Largeur" size={Constants.FONT_SIZE} />
            <ResponsiveInput
              title=""
              size={Constants.FONT_SIZE}
              input={inputState.width}
              isValidInput={inputState.isValidWidth}
              inputStyle={styles.inputStyle}
              setInput={(value) => inputDispatch({ type: "setWidth", payload: value })}
              validateInput={validateImperialInput}
              setIsValidInput={(value) =>
                inputDispatch({ type: "setIsValidWidth", payload: value })
              }
            />
          </View>
        </View>
      </View>

      <View style={styles.solidBorder}>
        <View style={styles.legend}>
          <ResponsiveText title="Coins" size={Constants.FONT_SIZE} />
        </View>
        <View style={styles.inputsContainer}>
          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, styles.inputHalfWidth]}>
              <ResponsiveText title="Internes" size={Constants.FONT_SIZE} />
              <ResponsiveInput
                title=""
                size={Constants.FONT_SIZE}
                input={inputState.nInsideCorners}
                inputStyle={styles.inputStyle}
                setInput={(value) => inputDispatch({ type: "setNInsideCorners", payload: value })}
                validateInput={validateIntegerInput}
              />
            </View>
            <View style={[styles.inputContainer, styles.inputHalfWidth]}>
              <ResponsiveText title="45 internes" size={Constants.FONT_SIZE} />
              <ResponsiveInput
                title=""
                size={Constants.FONT_SIZE}
                input={inputState.n45InsideCorners}
                inputStyle={styles.inputStyle}
                setInput={(value) => inputDispatch({ type: "setN45InsideCorners", payload: value })}
                validateInput={validateIntegerInput}
              />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, styles.inputHalfWidth]}>
              <ResponsiveText title="Externes" size={Constants.FONT_SIZE} />
              <ResponsiveInput
                title=""
                size={Constants.FONT_SIZE}
                input={inputState.nOutsideCorners}
                inputStyle={styles.inputStyle}
                setInput={(value) => inputDispatch({ type: "setNOutsideCorners", payload: value })}
                validateInput={validateIntegerInput}
              />
            </View>
            <View style={[styles.inputContainer, styles.inputHalfWidth]}>
              <ResponsiveText title="45 externes" size={Constants.FONT_SIZE} />
              <ResponsiveInput
                title=""
                size={Constants.FONT_SIZE}
                input={inputState.n45OutsideCorners}
                inputStyle={styles.inputStyle}
                setInput={(value) =>
                  inputDispatch({ type: "setN45OutsideCorners", payload: value })
                }
                validateInput={validateIntegerInput}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.solidBorder}>
        <View style={styles.legend}>
          <ResponsiveText title="Blocks Spéciaux" size={Constants.FONT_SIZE} />
        </View>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <ResponsiveText title="Pieds linéares double taper top" size={Constants.FONT_SIZE} />
            <ResponsiveInput
              title=""
              size={Constants.FONT_SIZE}
              input={inputState.doubleTaperTopLength}
              inputStyle={styles.inputStyle}
              setInput={(value) =>
                inputDispatch({ type: "setDoubleTaperTopLength", payload: value })
              }
              validateInput={validateImperialInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <ResponsiveText title="Pieds linéaires brick ledge" size={Constants.FONT_SIZE} />
            <ResponsiveInput
              title=""
              size={Constants.FONT_SIZE}
              input={inputState.brickLedgeLength}
              inputStyle={styles.inputStyle}
              setInput={(value) => inputDispatch({ type: "setBrickLedgeLength", payload: value })}
              validateInput={validateImperialInput}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  solidBorder: {
    borderWidth: 2,
    borderRadius: 4,
    marginTop: 30,
    paddingTop: 20,
  },
  legend: {
    paddingHorizontal: 2,
    position: "absolute",
    top: -15,
    left: 20,
    backgroundColor: "#f0f0f0",
  },
  inputsContainer: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  inputContainer: {
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
    justifyContent: "space-between",
  },
  inputHalfWidth: {
    width: "49%",
  },
});

export default Inputs;
