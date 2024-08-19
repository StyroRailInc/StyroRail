// Utility functions
import { parseInput } from "@/utils/InputParser";
import { angleToTJointAngles } from "@/screens/srf-drawer/utils/AnglesFunctions";
import { previousCornerIsTJoint, computeIndex } from "@/screens/srf-drawer/utils/TJointsFunctions";

// Types
import { InputState } from "@/screens/srf-drawer/types/inputState";
import { FoundationState } from "@/screens/srf-drawer/types/foundationState";
import { DrawingBounds, DrawingParams, Edge } from "@/types/generalTypes";

// Constants
import { Constants } from "@/constants";

const toRadians = (angle: number): number => angle * (Math.PI / 180);

export const calculateEndpoint = (
  startX: number,
  startY: number,
  length: number,
  angle: number
) => {
  const endX: number = startX + length * Math.cos(toRadians(angle));
  const endY: number = startY + length * Math.sin(toRadians(angle));
  return { endX, endY };
};

export const getValidatedWallLength = (inputState: InputState): number | null => {
  try {
    return parseInput(inputState.wallLengthInput, true);
  } catch (error) {}
  return null;
};

export const addTJoint = (
  inputState: InputState,
  foundationState: FoundationState,
  wallLengthInput: number | null,
  allWallLengths: number[],
  allAngles: number[]
) => {
  // Rendering existing T-joint
  // Key is the same for T-joints and T-joint angles
  for (const [key, tJointLengths] of Object.entries(foundationState.tJoints)) {
    const index = parseInt(key);
    const tJointAngles: number[] = foundationState.tJointAngles[index];

    allWallLengths.splice(index, 0, ...(tJointLengths as number[]));
    allAngles.splice(index, 0, ...tJointAngles);
  }

  // Adding new T-joint
  if (inputState.isTJoint && wallLengthInput) {
    allWallLengths.push(...[wallLengthInput, Constants.T_JOINT_WIDTH_INCHES, wallLengthInput]);
    allAngles.push(...angleToTJointAngles(inputState));
  }
};

export const addWallLengthInput = (
  inputState: InputState,
  foundationState: FoundationState,
  wallLengthInput: number | null,
  allWallLengths: number[],
  allAngles: number[]
) => {
  // If inputState.isTJoint we don't render a wall
  if (wallLengthInput && !inputState.isTJoint) {
    if (foundationState.wallRowPressedIndex !== null) {
      const index = computeIndex(foundationState.wallRowPressedIndex, foundationState.tJoints);

      if (!previousCornerIsTJoint(foundationState.wallRowPressedIndex, foundationState.tJoints)) {
        // Modifying existing wall angle if it's not after a tJoint
        allAngles[index] = inputState.angleInput;
      }
      // Modifying existing wall length
      allWallLengths[index] = wallLengthInput;
    } else {
      // Adding new wall
      allWallLengths.push(wallLengthInput);
      allAngles.push(inputState.angleInput);
    }
  }
};

export const computeDrawingBounds = (
  allWallLengths: number[],
  allAngles: number[]
): DrawingBounds => {
  let minX: number = Infinity,
    minY: number = Infinity,
    maxX: number = -Infinity,
    maxY: number = -Infinity;

  let startX: number = 0,
    startY: number = 0;

  for (let i = 0; i < allWallLengths.length; i++) {
    let { endX, endY } = calculateEndpoint(startX, startY, allWallLengths[i], allAngles[i]);

    minX = Math.min(minX, startX, endX);
    minY = Math.min(minY, startY, endY);
    maxX = Math.max(maxX, startX, endX);
    maxY = Math.max(maxY, startY, endY);

    startX = endX;
    startY = endY;
  }

  return { maxX: maxX, maxY: maxY, minX: minX, minY: minY };
};

export const scaleWallLengths = (params: DrawingParams): void => {
  if (
    params.drawingWidth > params.limitedDrawingWindowWidth ||
    params.drawingHeight + Constants.DRAWING_HEIGHT_PADDING > params.limitedDrawingWindowHeight
  ) {
    const widthScale: number = params.limitedDrawingWindowWidth / params.drawingWidth;
    const heightScale: number = params.limitedDrawingWindowHeight / params.drawingHeight;
    const scaleFactor = Math.min(widthScale, heightScale) / Constants.DRAWING_SCALE_DIVIDOR;

    params.drawingBounds.minX *= scaleFactor;
    params.drawingBounds.minY *= scaleFactor;
    params.drawingWidth *= scaleFactor;
    params.drawingHeight *= scaleFactor;
    params.wallLengths = params.wallLengths.map((length: number) => length * scaleFactor);
  }
};

export const computeDrawingOffsets = (params: DrawingParams) => {
  return {
    startX:
      (params.limitedDrawingWindowWidth - params.drawingWidth) / 2 - params.drawingBounds.minX,
    startY:
      (params.limitedDrawingWindowHeight - params.drawingHeight) / 2 - params.drawingBounds.minY,
  };
};

export const verifyEulerPath = (
  foundationState: FoundationState,
  startX: number,
  startY: number,
  endX: number,
  endY: number
): void => {
  const MARGIN_ERROR = Constants.EULER_PATH_MARGIN_ERROR;

  const isWithinMargin =
    startX + MARGIN_ERROR > endX &&
    startX - MARGIN_ERROR < endX &&
    startY + MARGIN_ERROR > endY &&
    startY - MARGIN_ERROR < endY;

  foundationState.setIsEulerPath(isWithinMargin);
};

// Currently unused
export const computeTextCoordinates = (
  currentX: number,
  endX: number,
  currentY: number,
  endY: number
) => {
  const midX = (currentX + endX) / 2;
  const midY = (currentY + endY) / 2;

  const dx = endX - currentX;
  const dy = endY - currentY;
  const length = Math.sqrt(dx * dx + dy * dy);
  const unitX = -dy / length;
  const unitY = dx / length;

  let offset = Constants.TEXT_OFFSET;

  return { textX: midX + unitX * offset, textY: midY + unitY * offset };
};

export const strokeColor = (
  foundationState: FoundationState,
  inputState: InputState,
  allAngles: number[],
  i: number
) => {
  if (foundationState.wallRowPressedIndex !== null) {
    if (i === computeIndex(foundationState.wallRowPressedIndex, foundationState.tJoints)) {
      return "red";
    } else {
      return "#2e4459";
    }
  } else {
    if (
      inputState.isTJoint &&
      getValidatedWallLength(inputState) &&
      (i === allAngles.length - 3 || i === allAngles.length - 2 || i === allAngles.length - 1) // For tJoints, the last three walls are red
    ) {
      return "red";
    }
    if (i === allAngles.length - 1 && getValidatedWallLength(inputState) && !inputState.isTJoint) {
      return "red";
    } else {
      return "#2e4459";
    }
  }
};
