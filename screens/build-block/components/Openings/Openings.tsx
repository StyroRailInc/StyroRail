// React imports
import React from "react";
import { View, StyleSheet } from "react-native";

// Components
import ResponsiveInput from "@/components/ResponsiveInput";
import ResponsiveText from "@/components/ResponsiveText";
import ResponsiveButton from "@/components/ResponsiveButton";

// Constants
import { Constants } from "@/constants";

// Type
import { OpeningState, OpeningAction } from "../../types/BBTypes";

// Classes
import Opening from "../../utils/BBCalculator/Opening";

// Utility functions
import { parseInput, parseIntegerInput } from "@/utils/InputParser";

interface OpeningProps {
  openingState: OpeningState;
  openingReducer: React.Dispatch<OpeningAction>;
}

const Openings: React.FC<OpeningProps> = ({ openingState, openingReducer }) => {
  const handleAddOpeningPress = () => {
    console.log(openingState);

    openingReducer({
      type: "addOpening",
      payload: {
        width: "",
        height: "",
        quantity: "",
      },
    });
  };

  return (
    <View style={styles.openingsContainer}>
      <View style={styles.legend}>
        <ResponsiveText title="Ouvertures" size={Constants.FONT_SIZE} />
      </View>
      <View style={styles.titlesContainer}>
        <View style={styles.titleContainer}>
          <ResponsiveText title="Largeur" size={Constants.FONT_SIZE} />
        </View>
        <View style={styles.titleContainer}>
          <ResponsiveText title="Hauteur" size={Constants.FONT_SIZE} />
        </View>
        <View style={styles.titleContainer}>
          <ResponsiveText title="Quantité" size={Constants.FONT_SIZE} />
        </View>
      </View>
      {openingState.openings.map((opening, index) => (
        <View key={index} style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <ResponsiveInput
              title=""
              input={opening.width}
              size={Constants.FONT_SIZE}
              inputStyle={styles.inputStyle}
              setInput={(value) => {
                openingReducer({
                  type: "modifyOpening",
                  payload: { index: index, attribute: "width", value: value },
                });
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <ResponsiveInput
              title=""
              input={opening.height}
              size={Constants.FONT_SIZE}
              inputStyle={styles.inputStyle}
              setInput={(value) => {
                openingReducer({
                  type: "modifyOpening",
                  payload: { index: index, attribute: "height", value: value },
                });
              }}
            />
          </View>
          <View style={[styles.inputContainer]}>
            <ResponsiveInput
              title=""
              input={opening.quantity}
              size={Constants.FONT_SIZE}
              inputStyle={styles.inputStyle}
              setInput={(value) => {
                openingReducer({
                  type: "modifyOpening",
                  payload: { index: index, attribute: "quantity", value: value },
                });
              }}
            />
          </View>
        </View>
      ))}
      <ResponsiveButton
        title="+"
        size={Constants.FONT_SIZE}
        style={{ marginBottom: 10, width: "94%", marginTop: 20 }}
        handlePress={handleAddOpeningPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  openingsContainer: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 4,
    width: "100%",
    marginTop: 20,
  },
  legend: {
    paddingHorizontal: 2,
    position: "absolute",
    top: -15,
    left: 20,
    backgroundColor: "#f0f0f0",
  },
  titlesContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: -20,
  },
  titleContainer: {
    width: "32%",
  },
  inputsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 5,
  },
  inputContainer: {
    width: "32%",
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
});

export default Openings;
