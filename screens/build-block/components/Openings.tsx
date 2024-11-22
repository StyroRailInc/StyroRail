// React imports
import React from "react";
import { View, StyleSheet } from "react-native";

// Components
import ResponsiveInput from "@/components/ResponsiveInput";
import ResponsiveText from "@/components/ResponsiveText";
import ResponsiveButton from "@/components/ResponsiveButton";
import ResponsiveTitle from "@/components/ResponsiveTitle";

// Constants
import { Constants } from "@/constants";

// Type
import { OpeningState, OpeningAction } from "../types/BBTypes";

// Utility function
import { validateImperialInput, validateIntegerInput } from "@/utils/ValidateInput";

interface OpeningProps {
  openingState: OpeningState;
  openingDispatch: React.Dispatch<OpeningAction>;
}

const Openings: React.FC<OpeningProps> = ({ openingState, openingDispatch }) => {
  const handleAddOpeningPress = () => {
    openingDispatch({
      type: "addOpening",
      payload: {
        width: "",
        height: "",
        quantity: "",
      },
    });
  };

  const handleDeletePress = () => {
    if (openingState.openings.length === 1) {
      openingDispatch({ type: "resetOpening" });
    } else {
      openingDispatch({ type: "removeOpening" });
    }
  };

  return (
    <View style={styles.openingsContainer}>
      <View style={styles.legend}>
        <ResponsiveTitle title="Ouvertures" size={Constants.MAX_TITLE_SIZE_MEDIUM} />
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
                openingDispatch({
                  type: "modifyOpening",
                  payload: { index: index, attribute: "width", value: value },
                });
              }}
              validateInput={validateImperialInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <ResponsiveInput
              title=""
              input={opening.height}
              size={Constants.FONT_SIZE}
              inputStyle={styles.inputStyle}
              setInput={(value) => {
                openingDispatch({
                  type: "modifyOpening",
                  payload: { index: index, attribute: "height", value: value },
                });
              }}
              validateInput={validateImperialInput}
            />
          </View>
          <View style={[styles.inputContainer]}>
            <ResponsiveInput
              title=""
              input={opening.quantity}
              size={Constants.FONT_SIZE}
              inputStyle={styles.inputStyle}
              setInput={(value) => {
                openingDispatch({
                  type: "modifyOpening",
                  payload: { index: index, attribute: "quantity", value: value },
                });
              }}
              validateInput={validateIntegerInput}
            />
          </View>
        </View>
      ))}
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ width: 100, marginVertical: 10 }}>
          <ResponsiveButton
            title={"Ajouter"}
            size={0}
            style={{
              borderRadius: 4,
              borderWidth: 2,
              backgroundColor: "white",
              borderColor: "#00aaef",
              padding: 5,
            }}
            textStyle={{ color: "#2e4459" }}
            handlePress={handleAddOpeningPress}
          />
        </View>
        <View style={{ width: 100, marginVertical: 10 }}>
          <ResponsiveButton
            title={"Supprimer"}
            size={0}
            style={{
              borderRadius: 4,
              borderWidth: 2,
              backgroundColor: "white",
              borderColor: "red",
              padding: 5,
            }}
            textStyle={{ color: "#2e4459" }}
            handlePress={handleDeletePress}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  openingsContainer: {
    flex: 1,
    width: "100%",
  },
  legend: {
    borderBottomWidth: 2,
    marginBottom: 20,
    marginTop: 30,
    borderColor: "#00aaef",
  },
  titlesContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
