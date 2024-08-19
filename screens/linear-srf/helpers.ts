// React import
import { SetStateAction } from "react";

// Types
import { FoundationPanels } from "@/types/generalTypes";
import { SettingsState } from "./types/settingsState";
import { InputState } from "./types/inputState";
import { Heights } from "@/types/generalTypes";
import { VisibilityState } from "@/types/visibilityState";

// Class
import FoundationSimplified from "./utils/SR.FCalculatorSimplified/Foundation";

// Enums
import { Corner } from "@/utils/enums";

// Constants
import { Constants } from "@/constants";

// Utility functions
import { computeTotalLinearFeetPerHeight } from "@/utils/ComputeTotalLinearFeetPerHeight";
import { inchesToFeet, parseInput } from "@/utils/InputParser";
import { parseIntegerInput } from "@/utils/InputParser";

export const addHeight = (
  inputState: InputState,
  visibilityState: VisibilityState,
  heightRowPressedIndex: number | null,
  setHeights: React.Dispatch<SetStateAction<Heights>>,
  setHeightRowPressedIndex: React.Dispatch<SetStateAction<number | null>>
) => {
  try {
    createHeight(inputState, setHeights);
    inputState.setHeight("");
    inputState.setLinearFeet("");
    inputState.setNInsideCorners("");
    inputState.setNOutsideCorners("");
    inputState.setN45InsideCorners("");
    inputState.setN45OutsideCorners("");
    inputState.setNTJoints("");
    setHeightRowPressedIndex(null);
    if (heightRowPressedIndex !== null) {
      visibilityState.setIsCalculateButtonVisible(true);
    } else {
      visibilityState.setIsCalculateButtonVisible(false);
    }
  } catch (error) {}
};

export const updateHeightInput = (
  inputState: InputState,
  heightRowPressedIndex: number | null,
  heights: Heights
) => {
  if (heightRowPressedIndex !== null) {
    const height = parseInt(Object.keys(heights)[heightRowPressedIndex]);
    inputState.setHeight(inchesToFeet(height));
    inputState.setLinearFeet(inchesToFeet(heights[height][0]));
    inputState.setNInsideCorners(heights[height][Constants.CORNER_INDEX[Corner.INSIDE]].toString());
    inputState.setNOutsideCorners(
      heights[height][Constants.CORNER_INDEX[Corner.OUTSIDE]].toString()
    );
    inputState.setN45InsideCorners(
      heights[height][Constants.CORNER_INDEX[Corner.FORTY_FIVE_INSIDE]].toString()
    );
    inputState.setN45OutsideCorners(
      heights[height][Constants.CORNER_INDEX[Corner.FORTY_FIVE_OUTSIDE]].toString()
    );
    inputState.setNTJoints(heights[height][Constants.CORNER_INDEX[Corner.TJOINT]].toString());
  }
};

export const calculatePanelResults = (
  inputState: InputState,
  settingsState: SettingsState,
  visibilityState: VisibilityState,
  heights: Heights,
  setPanelResults: React.Dispatch<SetStateAction<FoundationPanels>>
) => {
  try {
    if (visibilityState.isResultVisible) {
      const foundation = new FoundationSimplified(
        heights,
        settingsState.foamWidth,
        settingsState.cornerLength,
        parseIntegerInput(settingsState.fillersPercentage),
        settingsState.chooseFillersPercentage
      );
      foundation.computeFoundation();
      setPanelResults(foundation.panels);
      inputState.setNElastics(
        Math.ceil(foundation.nTotalCorners / Constants.N_ELASTICS_PER_CORNER)
      );
    }
  } catch (error) {}
};

export const getFormData = (
  settingsState: SettingsState,
  inputState: InputState,
  panelResults: FoundationPanels
) => {
  return {
    panels: panelResults,
    foamWidth: settingsState.foamWidth,
    cornerLength: settingsState.cornerLength,
    nElastics: inputState.nElastics,
    percentageIncrease: "Non Calculé",
    totalLinearFeet: computeTotalLinearFeetPerHeight(panelResults),
  };
};

const parseAllInputs = (
  height: string,
  linearFeet: string,
  nInsideCorners: string,
  nOutsideCorners: string,
  n45InsideCorners: string,
  n45OutsideCorners: string,
  nTJoints: string
) => {
  const parsedHeightInput = parseInput(height, true);
  const parsedLinearFeetInput = parseInput(linearFeet, true);
  const parsedNInsideCorners = parseIntegerInput(nInsideCorners);
  const parsedNOutsideCorners = parseIntegerInput(nOutsideCorners);
  const parsedN45InsideCorners = parseIntegerInput(n45InsideCorners);
  const parsedN45OutsideCorners = parseIntegerInput(n45OutsideCorners);
  const parsedNTJoints = parseIntegerInput(nTJoints);

  return {
    parsedHeightInput,
    parsedLinearFeetInput,
    parsedNInsideCorners,
    parsedNOutsideCorners,
    parsedN45InsideCorners,
    parsedN45OutsideCorners,
    parsedNTJoints,
  };
};

const createHeight = (
  inputState: InputState,
  setHeights: React.Dispatch<SetStateAction<Heights>>
) => {
  const parsedInputs = parseAllInputs(
    inputState.height,
    inputState.linearFeet,
    inputState.nInsideCorners,
    inputState.nOutsideCorners,
    inputState.n45InsideCorners,
    inputState.n45OutsideCorners,
    inputState.nTJoints
  );
  setHeights((prevHeights) => {
    return {
      ...prevHeights,
      [parsedInputs.parsedHeightInput]: [
        parsedInputs.parsedLinearFeetInput,
        parsedInputs.parsedNInsideCorners,
        parsedInputs.parsedNOutsideCorners,
        parsedInputs.parsedN45InsideCorners,
        parsedInputs.parsedN45OutsideCorners,
        parsedInputs.parsedNTJoints,
      ],
    };
  });
};
