// React imports
import React, { useState, useReducer } from "react";
import { ScrollView, View, StyleSheet } from "react-native";

// Custom hooks
import useWindowDimensions from "@/hooks/useWindowDimensions";

// Components
import Inputs from "./components/Inputs";
import Openings from "./components/Openings";
import Walls from "./components/Walls";

// Constants
import { Constants } from "@/constants";

// Reducer
import {
  inputReducer,
  initialState,
  openingReducer,
  initialOpeningState,
  wallReducer,
  initialWallState,
} from "./reducer";

const BuildBlock: React.FC = () => {
  const [appScreenWidth, setAppScreenWidth] = useState<number>();
  const [windowWidth, setWindowWidth] = useState<number>();

  useWindowDimensions(Constants.SCROLLVIEW_WIDTH_PERCENTAGE, setWindowWidth);
  useWindowDimensions(Constants.APP_SCREEN_WIDTH_PERCENTAGE, setAppScreenWidth);

  const [inputState, dispatchInput] = useReducer(inputReducer, initialState);
  const [openingState, dispatchOpening] = useReducer(openingReducer, initialOpeningState);
  const [wallState, dispatchWall] = useReducer(wallReducer, initialWallState);

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
