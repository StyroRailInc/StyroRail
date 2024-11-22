// React imports
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

// Components
import ResponsiveText from "@/components/ResponsiveText";
import ResponsiveInput from "@/components/ResponsiveInput";
import ResponsiveTitle from "@/components/ResponsiveTitle";
import DropdownMenu from "@/components/DropdownMenu";

// Constants
import { Constants } from "@/constants";

// Type
import { InputState, InputAction, Width } from "../types/BBTypes";

// Utility function
import { validateImperialInput, validateIntegerInput } from "@/utils/ValidateInput";

// Enum
import { BlockWidth } from "@/utils/enums";

interface InputsProps {
  inputState: InputState;
  inputDispatch: React.Dispatch<InputAction>;
}

const Inputs: React.FC<InputsProps> = ({ inputState, inputDispatch }) => {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.legend}>
        <ResponsiveTitle title="Dimensions" size={Constants.MAX_TITLE_SIZE_MEDIUM} />
      </View>
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
          setIsValidInput={(value) => inputDispatch({ type: "setIsValidHeight", payload: value })}
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
          setIsValidInput={(value) => inputDispatch({ type: "setIsValidLength", payload: value })}
        />
      </View>
      <View style={styles.inputContainer}>
        <ResponsiveText title="Largeur" size={Constants.FONT_SIZE} />
        <DropdownMenu
          options={Object.values(BlockWidth)}
          selectedOption={inputState.width}
          fontSize={Constants.FONT_SIZE}
          isDropdownMenuOpen={isDropdownMenuOpen}
          onSelect={(option) => {
            inputDispatch({ type: "setWidth", payload: option });
          }}
          setIsDropdownMenuOpen={() => {
            setIsDropdownMenuOpen(!isDropdownMenuOpen);
          }}
        />
      </View>

      <View style={styles.legend}>
        <ResponsiveTitle title="Coins" size={Constants.MAX_TITLE_SIZE_MEDIUM} />
      </View>

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
            setInput={(value) => inputDispatch({ type: "setN45OutsideCorners", payload: value })}
            validateInput={validateIntegerInput}
          />
        </View>
      </View>

      <View style={styles.legend}>
        <ResponsiveTitle title="Blocks Spéciaux" size={Constants.MAX_TITLE_SIZE_MEDIUM} />
      </View>

      <View style={styles.inputContainer}>
        <ResponsiveText title="Pieds linéares double taper top" size={Constants.FONT_SIZE} />
        <ResponsiveInput
          title=""
          size={Constants.FONT_SIZE}
          input={inputState.doubleTaperTopLength}
          inputStyle={styles.inputStyle}
          setInput={(value) => inputDispatch({ type: "setDoubleTaperTopLength", payload: value })}
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
    borderBottomWidth: 2,
    marginBottom: 20,
    marginTop: 30,
    borderColor: "#00aaef",
  },
  inputsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
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
