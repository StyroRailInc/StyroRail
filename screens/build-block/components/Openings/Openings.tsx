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

interface OpeningProps {
  openingState: OpeningState;
  openingReducer: React.Dispatch<OpeningAction>;
}

const Openings: React.FC<OpeningProps> = ({ openingState, openingReducer }) => {
  return (
    <View style={styles.openingsContainer}>
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <ResponsiveText title="Largeur" size={Constants.FONT_SIZE} />
          <ResponsiveInput
            title=""
            input={openingState.width}
            size={Constants.FONT_SIZE}
            setInput={(value) => {
              openingReducer({ type: "setOpeningWidth", payload: value });
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <ResponsiveText title="Hauteur" size={Constants.FONT_SIZE} />
          <ResponsiveInput
            title=""
            input={openingState.height}
            size={Constants.FONT_SIZE}
            setInput={(value) => {
              openingReducer({ type: "setOpeningHeight", payload: value });
            }}
          />
        </View>

        <View style={[styles.inputContainer]}>
          <ResponsiveText title="Quantité" size={Constants.FONT_SIZE} />
          <ResponsiveInput
            title=""
            input={openingState.quantity}
            size={Constants.FONT_SIZE}
            setInput={(value) => {
              openingReducer({ type: "setOpeningQuantity", payload: value });
            }}
          />
        </View>
      </View>
      <ResponsiveButton title="+" size={Constants.FONT_SIZE} handlePress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  openingsContainer: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 4,
    width: "100%",
  },
  inputsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    width: "30%",
  },
});

export default Openings;
