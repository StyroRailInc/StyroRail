// React imports
import React, { useState, useReducer, useRef } from "react";
import { ScrollView, View, StyleSheet } from "react-native";

// Custom hooks
import useWindowDimensions from "@/hooks/useWindowDimensions";

// Components
import Inputs from "./components/Inputs";
import Openings from "./components/Openings";
import Walls from "./components/Walls";
import ResponsiveButton from "@/components/ResponsiveButton";
import BlockDisplay from "./components/BlockDisplay";

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
  initialInputState,
  openingReducer,
  initialOpeningState,
  wallReducer,
  initialWallState,
} from "./reducer";

// Utility functions
import { parseInput, parseIntegerInput } from "@/utils/InputParser";
import { InputAction } from "./types/BBTypes";

// Helper functions
// import { validateInput } from "./helpers";

const BuildBlock: React.FC = () => {
  const [appScreenWidth, setAppScreenWidth] = useState<number>();
  const [windowWidth, setWindowWidth] = useState<number>();

  useWindowDimensions(Constants.SCROLLVIEW_WIDTH_PERCENTAGE, setWindowWidth);
  useWindowDimensions(Constants.APP_SCREEN_WIDTH_PERCENTAGE, setAppScreenWidth);

  const [inputState, inputDispatch] = useReducer(inputReducer, initialInputState);
  const [openingState, openingDispatch] = useReducer(openingReducer, initialOpeningState);
  const [wallState, wallDispatch] = useReducer(wallReducer, initialWallState);

  const [isResultVisible, setIsResultVisible] = useState<boolean>(false);
  const [house, setHouse] = useState<House>();

  const scrollViewRef = useRef(null);

  const validateInput = (i: number, inputAction: InputAction, input: string) => {
    try {
      return parseInput(input, true, false);
    } catch (error) {
      wallDispatch({ type: "setPressedWallIndex", payload: i });
      inputDispatch(inputAction);
      scrollViewRef.current.scrollTo({
        y: 0,
        animated: true,
      });
    }
  };

  const validateAndScroll = () => {
    for (let i = 0; i < wallState.walls.length; i++) {
      const validatedHeight = validateInput(
        i,
        {
          type: "setIsValidHeight",
          payload: false,
        },
        wallState.walls[i].inputState.height
      );
      const validatedLength = validateInput(
        i,
        {
          type: "setIsValidLength",
          payload: false,
        },
        wallState.walls[i].inputState.length
      );
      const validatedWidth = validateInput(
        i,
        {
          type: "setIsValidWidth",
          payload: false,
        },
        wallState.walls[i].inputState.width
      );
      if (!(validatedHeight && validatedLength && validatedWidth)) {
        return;
      }
    }
    handleCalculatePress();
  };

  const handleCalculatePress = () => {
    try {
      const walls = [];
      const emptyStringIsValid = true;
      const isFeet = true;
      for (let wall of wallState.walls) {
        const dimensions = new Dimensions(
          parseInput(wall.inputState.height, isFeet, !emptyStringIsValid),
          parseInput(wall.inputState.length, isFeet, !emptyStringIsValid),
          '8"'
        );

        const corners = new Corners(
          parseIntegerInput(wall.inputState.nInsideCorners),
          parseIntegerInput(wall.inputState.nOutsideCorners),
          parseIntegerInput(wall.inputState.n45InsideCorners),
          parseIntegerInput(wall.inputState.n45OutsideCorners),
          '8"'
        );

        const specialBlocks = new SpecialBlocks(
          parseInput(wall.inputState.doubleTaperTopLength, isFeet, emptyStringIsValid),
          parseInput(wall.inputState.brickLedgeLength, isFeet, emptyStringIsValid),
          0,
          '8"'
        );

        const openings = [];
        for (let opening of wall.openingState.openings) {
          const openingObject = new Opening(
            parseInput(opening.width, isFeet, emptyStringIsValid),
            parseInput(opening.height, isFeet, emptyStringIsValid),
            parseIntegerInput(opening.quantity)
          );
          openings.push(openingObject);
        }

        const wallObject = new Wall(dimensions, corners, specialBlocks, openings);
        walls.push(wallObject);
      }
      const house = new House(walls);
      house.computeHouse();
      console.log(house);
      setHouse(house);
      setIsResultVisible(true);
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
        ref={scrollViewRef}
      >
        <View
          style={[styles.pageContent, { width: appScreenWidth, maxWidth: Constants.APP_MAX_WIDTH }]}
        >
          <Walls
            wallState={wallState}
            openingState={openingState}
            inputState={inputState}
            wallDispatch={wallDispatch}
            openingDispatch={openingDispatch}
            inputDispatch={inputDispatch}
          />
          <Inputs inputState={inputState} inputDispatch={inputDispatch} />
          <Openings openingState={openingState} openingDispatch={openingDispatch} />
          <ResponsiveButton
            title="Calculer"
            size={Constants.FONT_SIZE}
            style={{ margin: 20 }}
            handlePress={validateAndScroll}
          />
          <ResponsiveButton d />
          {isResultVisible && <BlockDisplay house={house} />}
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
