// Types
import { FoundationState } from "@/screens/srf-drawer/types/foundationState";
import { InputState } from "@/screens/srf-drawer/types/inputState";
import { VisibilityState } from "@/types/visibilityState";

// Utility functions
import {
  filterTJointsUpToIndex,
  previousCornerIsTJoint,
} from "@/screens/srf-drawer/utils/TJointsFunctions";

const updateFoundationState = (foundationState: FoundationState, wallIndex: number): void => {
  foundationState.setWallLengths((prevWallLengths) => prevWallLengths.slice(0, wallIndex));
  foundationState.setWallHeights((prevWallHeights) => prevWallHeights.slice(0, wallIndex));
  foundationState.setConcreteWidths((prevConcreteWidths) => prevConcreteWidths.slice(0, wallIndex));
  foundationState.setAngles((prevAngles) => prevAngles.slice(0, wallIndex));
  foundationState.setPanelResults({});
};

const updateTJoints = (
  foundationState: FoundationState,
  inputState: InputState,
  wallIndex: number
): void => {
  if (previousCornerIsTJoint(wallIndex, foundationState.tJoints)) {
    inputState.setPreviousCornerIsTJoint(true);
  } else {
    inputState.setPreviousCornerIsTJoint(false);
  }

  // Filtering TJoints
  let { filteredTJoints, countDeleted } = filterTJointsUpToIndex(
    wallIndex,
    foundationState.tJoints
  );
  foundationState.setTJoints(filteredTJoints);

  // Filtering TJoint angles
  filteredTJoints = filterTJointsUpToIndex(wallIndex, foundationState.tJointAngles).filteredTJoints;
  foundationState.setTJointAngles(filteredTJoints);

  foundationState.nTJoints.current -= countDeleted;
};

const updateVisibilityState = (
  foundationState: FoundationState,
  visibilityState: VisibilityState,
  wallIndex: number
): void => {
  visibilityState.setIsResultVisible(false);
  foundationState.setWallRowPressedIndex(null);
  visibilityState.setIsTJointButtonVisible(true);
  if (wallIndex === 0) {
    visibilityState.setIsCalculateButtonVisible(false);
    visibilityState.setIsTJointButtonVisible(false);
  }
};

const updateInputState = (
  inputState: InputState,
  foundationState: FoundationState,
  wallIndex: number
): void => {
  inputState.setWallLengthInput("");

  if (wallIndex !== 0) {
    inputState.setAngleInput(foundationState.angles[wallIndex - 1]);
    inputState.setPreviousAngle(foundationState.angles[wallIndex - 1]);
    inputState.setIsFirstWall(false);
  } else {
    inputState.setAngleInput(0);
    inputState.setPreviousAngle(0);
    inputState.setIsFirstWall(true);
  }
};

export const removeWalls = (
  foundationState: FoundationState,
  inputState: InputState,
  visibilityState: VisibilityState,
  wallIndex: number
): void => {
  updateFoundationState(foundationState, wallIndex);
  updateTJoints(foundationState, inputState, wallIndex);
  updateVisibilityState(foundationState, visibilityState, wallIndex);
  updateInputState(inputState, foundationState, wallIndex);
};
