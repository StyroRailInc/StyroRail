// React imports
import { SetStateAction } from "react";

// Types
import { FoundationState } from "@/screens/srf-drawer/types/foundationState";
import { InputState } from "@/screens/srf-drawer/types/inputState";
import { VisibilityState } from "@/types/visibilityState";
import { SettingsState } from "@/screens/srf-drawer/types/settingsState";
import { TJointAngles, TJoints } from "@/types/generalTypes";

// Enums
import { FloorType } from "@/utils/enums";

// Utility functions
import { computeTotalLinearFeetPerHeight } from "@/utils/ComputeTotalLinearFeetPerHeight";
import { angleToTJointAngles, convertAnglesToCorners } from "./utils/AnglesFunctions";
import { removeWalls } from "./utils/RemoveWalls";
import { inchesToFeet, parseInput } from "@/utils/InputParser";
import {
  previousCornerIsTJoint,
  computeIndex,
  findNTJointsBeforeIndex,
  insertTJointAngles,
  removeTJointAngles,
} from "@/screens/srf-drawer/utils/TJointsFunctions";
import {
  computeNElastics,
  computePanelResults,
  addExtraPanels,
  computeFloorPanelResults,
} from "@/screens/srf-drawer/utils/ResultsFunctions";

// Constants
import { Constants } from "@/constants";

// Class
import Foundation from "@/screens/srf-drawer/utils/SR.FCalculator/Foundation";
import Room from "@/screens/srf-drawer/utils/SR.FCalculator/Room";

// Updates multiple states (foundation, input, visibility, settings)
// based on whether a wall row is pressed, the previous corner is a
// T-joint, or other conditions.
export const addWall = (
  foundationState: FoundationState,
  inputState: InputState,
  visibilityState: VisibilityState,
  settingsState: SettingsState
) => {
  try {
    let newWallLengths = [...foundationState.wallLengths];
    let newConcreteWidths = [...foundationState.concreteWidths];
    let newWallHeights = [...foundationState.wallHeights];
    let newAngles = [...foundationState.angles];

    const wallLength = parseInput(inputState.wallLengthInput, true);
    const concreteWidth = parseInput(inputState.concreteWidthInput, false);
    const wallHeight = parseInput(inputState.wallHeightInput, true);

    if (foundationState.wallRowPressedIndex !== null) {
      newWallLengths[foundationState.wallRowPressedIndex] = wallLength;
      newConcreteWidths[foundationState.wallRowPressedIndex] = concreteWidth;
      newWallHeights[foundationState.wallRowPressedIndex] = wallHeight;

      if (!previousCornerIsTJoint(foundationState.wallRowPressedIndex, foundationState.tJoints)) {
        newAngles[foundationState.wallRowPressedIndex] = inputState.angleInput;
      }
      if (previousCornerIsTJoint(foundationState.wallLengths.length, foundationState.tJoints)) {
        inputState.setPreviousCornerIsTJoint(true);
      } else {
        inputState.setPreviousCornerIsTJoint(false);
      }

      // Check if the pressed wall is the last one. Async state changes
      // forces to use the current angle input
      if (foundationState.wallRowPressedIndex === foundationState.wallLengths.length - 1) {
        inputState.setPreviousAngle(inputState.angleInput);
        inputState.setAngleInput(inputState.angleInput);
      } else {
        inputState.setPreviousAngle(foundationState.angles[foundationState.angles.length - 1]);
        inputState.setAngleInput(foundationState.angles[foundationState.angles.length - 1]);
      }
      visibilityState.setIsCalculateButtonVisible(true);
    } else if (inputState.isTJoint) {
      const index = computeIndex(foundationState.wallLengths.length, foundationState.tJoints);

      foundationState.setTJoints((prevTJoints: TJoints) => ({
        ...prevTJoints,
        [index]: [wallLength, Constants.T_JOINT_WIDTH_INCHES, wallLength],
      }));

      foundationState.setTJointAngles((prevTJointsAngles: TJointAngles) => ({
        ...prevTJointsAngles,
        [index]: angleToTJointAngles(inputState),
      }));

      foundationState.setNTJoints(foundationState.nTJoints + 1);

      inputState.setAngleInput(inputState.previousAngle);
      inputState.setPreviousCornerIsTJoint(true);
    } else {
      newWallLengths.push(wallLength);
      newConcreteWidths.push(concreteWidth);
      newWallHeights.push(wallHeight);
      newAngles.push(inputState.angleInput);
      inputState.setPreviousAngle(inputState.angleInput);
      visibilityState.setIsCalculateButtonVisible(false);
      inputState.setPreviousCornerIsTJoint(false);
    }

    foundationState.setWallLengths(newWallLengths);
    foundationState.setConcreteWidths(newConcreteWidths);
    foundationState.setWallHeights(newWallHeights);
    foundationState.setAngles(newAngles);
    foundationState.setWallRowPressedIndex(null);

    inputState.setConcreteWidthInput(settingsState.defaultConcreteWidth);
    inputState.setWallHeightInput(settingsState.defaultWallHeight);
    inputState.setWallLengthInput("");
    inputState.setIsFirstWall(false);
    inputState.setIsTJoint(false);

    visibilityState.setIsTJointButtonVisible(true);
    visibilityState.setIsResultVisible(false);
  } catch (error) {
    console.log("There has been an error");
  }
};

export const addFoundation = (foundationState: FoundationState, settingsState: SettingsState) => {
  try {
    foundationState.setFoundations((prevFoundations) => [
      ...prevFoundations.map((foundation, index) =>
        index === foundationState.roomPressedIndex
          ? createFoundation(foundationState, settingsState)
          : foundation
      ),
      null,
    ]);
    foundationState.setIsRoomChange(true);
    foundationState.setRoomPressedIndex(foundationState.foundations.length);
    settingsState.setFloorType(FloorType.NONE);
  } catch (error) {
    console.log("There has been an error");
  }
};

export const changeRoom = (
  foundationState: FoundationState,
  inputState: InputState,
  settingsState: SettingsState,
  visibilityState: VisibilityState
) => {
  if (foundationState.roomPressedIndex !== foundationState.previousRoomPressedIndex.current) {
    const foundation = foundationState.foundations[foundationState.roomPressedIndex];
    const index = foundationState.previousRoomPressedIndex.current;

    if (foundationState.wallLengths.length > 0) {
      foundationState.setFoundations((prevFoundations) => {
        const updatedFoundations = [...prevFoundations];
        updatedFoundations.splice(index, 1, createFoundation(foundationState, settingsState));
        return updatedFoundations;
      });
      foundationState.previousRoomPressedIndex.current = foundationState.roomPressedIndex;
    } else {
      foundationState.setFoundations((prevFoundations) => {
        const updatedFoundations = [...prevFoundations];
        updatedFoundations.splice(index, 1);
        return updatedFoundations;
      });
      foundationState.previousRoomPressedIndex.current = foundationState.roomPressedIndex;
      if (foundationState.roomPressedIndex > index) {
        foundationState.setIsRoomChange(false);
        foundationState.setRoomPressedIndex(foundationState.roomPressedIndex - 1);
        foundationState.previousRoomPressedIndex.current = foundationState.roomPressedIndex - 1;
      }
    }

    if (foundation !== null) {
      // Update each state property using their respective setters
      foundationState.setWallLengths(foundation.room.wallLengths);
      foundationState.setWallHeights(foundation.room.wallHeights);
      foundationState.setConcreteWidths(foundation.room.concreteWidths);
      foundationState.setAngles(foundation.room.angles);
      foundationState.setTJoints(foundation.room.tJoints);
      foundationState.setTJointAngles(foundation.room.tJointAngles);
      foundationState.setNTJoints(foundation.room.nTJoints);
      settingsState.setCornerLength(foundation.room.cornerLength);
      settingsState.setFoamWidth(foundation.room.foamWidth);
      settingsState.setInsulationArea(foundation.room.insulationArea);
      settingsState.setFloorType(foundation.room.floorType);

      const currentIndex = foundation.room.wallLengths.length;
      if (currentIndex !== 0) {
        inputState.setAngleInput(foundation.room.angles[currentIndex - 1]);
        inputState.setPreviousAngle(foundation.room.angles[currentIndex - 1]);
        inputState.setIsFirstWall(false);
        visibilityState.setIsCalculateButtonVisible(true);
        if (!previousCornerIsTJoint(currentIndex, foundation.room.tJoints)) {
          visibilityState.setIsTJointButtonVisible(true);
        } else {
          inputState.setPreviousCornerIsTJoint(true);
        }
      } else {
        inputState.setAngleInput(0);
        inputState.setIsTJoint(false);
        inputState.setPreviousCornerIsTJoint(false);
        inputState.setPreviousAngle(0);
        inputState.setIsFirstWall(true);
        visibilityState.setIsCalculateButtonVisible(false);
      }

      inputState.setWallLengthInput("");
    } else {
      removeWalls(foundationState, inputState, visibilityState, 0);

      foundationState.setWallRowPressedIndex(null);
      inputState.setWallLengthInput("");
      inputState.setConcreteWidthInput(settingsState.defaultConcreteWidth);
      inputState.setWallHeightInput(settingsState.defaultWallHeight);
    }
  }
};

// Called when a wall has been pressed
export const updateWallInput = (foundationState: FoundationState, inputState: InputState) => {
  if (foundationState.wallRowPressedIndex !== null) {
    if (foundationState.wallRowPressedIndex === 0) {
      inputState.setPreviousCornerIsTJoint(false);
      inputState.setIsFirstWall(true);
    } else {
      inputState.setIsFirstWall(false);
    }
    if (previousCornerIsTJoint(foundationState.wallRowPressedIndex, foundationState.tJoints)) {
      inputState.setPreviousCornerIsTJoint(true);
    } else {
      inputState.setPreviousCornerIsTJoint(false);
      if (foundationState.wallRowPressedIndex > 0) {
        inputState.setPreviousAngle(
          foundationState.angles[foundationState.wallRowPressedIndex - 1]
        );
      } else {
        inputState.setPreviousAngle(0);
      }
      inputState.setAngleInput(foundationState.angles[foundationState.wallRowPressedIndex]);
    }

    inputState.setWallLengthInput(
      inchesToFeet(foundationState.wallLengths[foundationState.wallRowPressedIndex])
    );
    inputState.setConcreteWidthInput(
      inchesToFeet(foundationState.concreteWidths[foundationState.wallRowPressedIndex])
    );
    inputState.setWallHeightInput(
      inchesToFeet(foundationState.wallHeights[foundationState.wallRowPressedIndex])
    );

    inputState.setIsTJoint(false);
  }
};

// Has to be async
export const calculatePanelResults = (
  foundationState: FoundationState,
  settingsState: SettingsState,
  visibilityState: VisibilityState
) => {
  if (visibilityState.isResultVisible) {
    const { newPanels, percentageIncrease } =
      settingsState.addExtraPanels && visibilityState.isResultVisible
        ? addExtraPanels(computePanelResults(foundationState), settingsState)
        : { newPanels: computePanelResults(foundationState), percentageIncrease: { current: 0 } };

    foundationState.totalLinearFeet.current = computeTotalLinearFeetPerHeight(newPanels);
    foundationState.setPanelResults(newPanels);
    foundationState.setFloorPanelResults(computeFloorPanelResults(foundationState));
    foundationState.percentageIncrease.current = percentageIncrease.current;
    foundationState.setNElastics(computeNElastics(foundationState));
  }
};

// Updates the foundations by creating a new foundation for the selected room index.
export const createAndSetFoundations = (
  foundationState: FoundationState,
  settingsState: SettingsState,
  inputState: InputState,
  visibilityState: VisibilityState
) => {
  try {
    foundationState.setFoundations((prevFoundations) =>
      prevFoundations.map((foundation, index) =>
        index === foundationState.roomPressedIndex
          ? createFoundation(foundationState, settingsState)
          : foundation
      )
    );

    // Resets wallRowPressedIndexToNull if !== Null while pressed
    visibilityState.setIsResultVisible(true);
    if (foundationState.wallRowPressedIndex !== null) {
      inputState.setWallLengthInput("");
      inputState.setPreviousAngle(foundationState.angles[foundationState.wallLengths.length - 1]);
      if (previousCornerIsTJoint(foundationState.wallLengths.length, foundationState.tJoints)) {
        inputState.setIsTJoint(false);
        inputState.setPreviousCornerIsTJoint(true);
      }
      foundationState.setWallRowPressedIndex(null);
    }
  } catch (error) {
    console.log("There has been an error");
  }
};

export const computeAngleDifferences = (
  foundationState: FoundationState,
  setInitialAngleDifferences: React.Dispatch<SetStateAction<number[]>>
) => {
  if (foundationState.wallRowPressedIndex !== null) {
    const nTJointsBeforeIndex = findNTJointsBeforeIndex(
      foundationState.wallRowPressedIndex,
      foundationState.tJoints
    );
    const allAngles = insertTJointAngles(foundationState.tJointAngles, foundationState.angles);

    const differences = [];
    const startIndex =
      foundationState.wallRowPressedIndex + 1 + nTJointsBeforeIndex * Constants.N_WALLS_PER_T_JOINT;
    const endIndex =
      foundationState.angles.length + foundationState.nTJoints * Constants.N_WALLS_PER_T_JOINT;

    for (let i = startIndex; i < endIndex; i++) {
      if (i > 0) {
        differences.push(allAngles[i] - allAngles[i - 1]);
      }
    }
    setInitialAngleDifferences(differences);
  }
};

export const adjustAngles = (
  foundationState: FoundationState,
  inputState: InputState,
  initialAngleDifferences: number[]
) => {
  if (foundationState.wallRowPressedIndex !== null) {
    if (!previousCornerIsTJoint(foundationState.wallRowPressedIndex, foundationState.tJoints)) {
      const angles = [...insertTJointAngles(foundationState.tJointAngles, foundationState.angles)];
      const pressedWallIndex = computeIndex(
        foundationState.wallRowPressedIndex,
        foundationState.tJoints
      );

      let currentAngle = inputState.angleInput;
      angles[pressedWallIndex] = currentAngle;

      for (let i = 0; i < initialAngleDifferences.length; i++) {
        currentAngle += initialAngleDifferences[i] + 360;
        currentAngle %= 360;
        angles[pressedWallIndex + i + 1] = currentAngle;
      }
      const { newAngles, newTJointAngles } = removeTJointAngles(
        angles,
        foundationState.tJointAngles
      );

      foundationState.setAngles(newAngles);
      foundationState.setTJointAngles(newTJointAngles);
    }
  }
};

export const getFormData = (foundationState: FoundationState, settingsState: SettingsState) => {
  return {
    nElastics: foundationState.nElastics,
    panels: foundationState.panelResults,
    totalLinearFeet: foundationState.totalLinearFeet.current,
    percentageIncrease: foundationState.percentageIncrease.current,
    // floorType: foundationState.foundations?[0].floor?.type,
    // floorNPanels: foundationState.foundations?[0].floor?.nPanels,
    cornerLength: settingsState.cornerLength,
    foamWidth: settingsState.foamWidth,
  };
};

const createFoundation = (
  foundationState: FoundationState,
  settingsState: SettingsState
): Foundation => {
  const room = createRoom(foundationState, settingsState);
  return new Foundation(
    convertAnglesToCorners(
      foundationState.angles,
      foundationState.tJoints,
      settingsState.insulationArea,
      foundationState.isEulerPath
    ),
    foundationState.wallLengths,
    settingsState.foamWidth,
    foundationState.concreteWidths,
    settingsState.insulationArea,
    foundationState.wallHeights,
    settingsState.cornerLength,
    foundationState.isEulerPath,
    settingsState.floorType,
    room
  );
};

const createRoom = (foundationState: FoundationState, settingsState: SettingsState): Room => {
  return new Room(
    foundationState.wallLengths,
    foundationState.concreteWidths,
    foundationState.wallHeights,
    foundationState.angles,
    foundationState.tJoints,
    foundationState.tJointAngles,
    foundationState.nTJoints,
    settingsState.foamWidth,
    settingsState.cornerLength,
    settingsState.insulationArea,
    settingsState.floorType
  );
};
