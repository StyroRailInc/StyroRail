// React imports
import React, { useState, useReducer } from "react";
import { ScrollView, View, StyleSheet } from "react-native";

// Custom hooks
import useWindowDimensions from "@/hooks/useWindowDimensions";

// Components
import Inputs from "./components/Inputs";
import Openings from "./components/Openings";
import Walls from "./components/Walls";
import ResponsiveButton from "@/components/ResponsiveButton";

// Constants
import { Constants } from "@/constants";

// Classes
import Corners from "./utils/BBCalculator/Corners";
import Dimensions from "./utils/BBCalculator/Dimensions";
import Wall from "./utils/BBCalculator/Wall";
import SpecialBlocks from "./utils/BBCalculator/SpecialBlocks";
import Opening from "./utils/BBCalculator/Opening";
import House from "./utils/BBCalculator/House";

// Reducer
import {
  inputReducer,
  initialState,
  openingReducer,
  initialOpeningState,
  wallReducer,
  initialWallState,
} from "./reducer";

// Utility functions
import { parseInput, parseIntegerInput } from "@/utils/InputParser";

const BuildBlock: React.FC = () => {
  const [appScreenWidth, setAppScreenWidth] = useState<number>();
  const [windowWidth, setWindowWidth] = useState<number>();

  useWindowDimensions(Constants.SCROLLVIEW_WIDTH_PERCENTAGE, setWindowWidth);
  useWindowDimensions(Constants.APP_SCREEN_WIDTH_PERCENTAGE, setAppScreenWidth);

  const [inputState, dispatchInput] = useReducer(inputReducer, initialState);
  const [openingState, dispatchOpening] = useReducer(openingReducer, initialOpeningState);
  const [wallState, dispatchWall] = useReducer(wallReducer, initialWallState);

  const handleCalculatePress = () => {
    try {
      const specialBlocksDummy = new SpecialBlocks(0, 0, 0, '8"');
      const walls = [];
      for (let wall of wallState.walls) {
        const dimensions = new Dimensions(
          parseInput(wall.inputState.height, true),
          parseInput(wall.inputState.length, true),
          '8"'
        );
        const corners = new Corners(
          parseIntegerInput(wall.inputState.nInsideCorners),
          parseIntegerInput(wall.inputState.nOutsideCorners),
          parseIntegerInput(wall.inputState.n45InsideCorners),
          parseIntegerInput(wall.inputState.n45OutsideCorners),
          '8"'
        );

        const openings = [];
        for (let opening of wall.openingState.openings) {
          const openingObject = new Opening(
            parseInput(opening.width, true, true),
            parseInput(opening.height, true, true),
            parseIntegerInput(opening.quantity)
          );
          openings.push(openingObject);
        }

        const wallObject = new Wall(dimensions, corners, specialBlocksDummy, openings);
        walls.push(wallObject);
        const house = new House(walls);
        house.computeHouse();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.pageContainer}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { minWidth: windowWidth }]}
        keyboardShouldPersistTaps={"always"}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[styles.pageContent, { width: appScreenWidth, maxWidth: Constants.APP_MAX_WIDTH }]}
        >
          <Walls
            wallState={wallState}
            openingState={openingState}
            inputState={inputState}
            wallReducer={dispatchWall}
            openingReducer={dispatchOpening}
            inputReducer={dispatchInput}
          />
          <Inputs inputState={inputState} dispatch={dispatchInput} />
          <Openings openingState={openingState} openingReducer={dispatchOpening} />
          <ResponsiveButton
            title="Calculer"
            size={Constants.FONT_SIZE}
            style={{ margin: 20 }}
            handlePress={handleCalculatePress}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  pageContent: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
});

export default BuildBlock;
