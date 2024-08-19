// Enums
import { Corner, InsulationArea } from "@/utils/enums";

// Type
import { InputState } from "@/screens/srf-drawer/types/inputState";
import { TJoints } from "@/types/generalTypes";

export const convertAnglesToCorners = (
  angles: number[],
  tJoints: Record<number, number[]>,
  insulationArea: InsulationArea,
  isEulerPath: boolean
): Corner[] => {
  const corners: Corner[] = [];
  let insideCornerCount = 0;
  let outsideCornerCount = 0;

  const calculateDegreeDifference = (current: number, next: number): number => {
    return (current - next + 360) % 360;
  };

  const adjustedTJoints = adjustTJointsIndexes(tJoints);

  for (let i = 0; i < angles.length; i++) {
    if (!isEulerPath && i == angles.length - 1) {
      if (adjustedTJoints[i] !== undefined) {
        corners[i] = Corner.TJOINT;
      } else {
        corners[i] = Corner.ONE_HUNDRED_EIGHTY;
      }
      break;
    }
    if (adjustedTJoints[i] !== undefined) {
      corners[i] = Corner.TJOINT;
    } else {
      let degreeDifference: number;
      const currentAngle = angles[i];
      const nextAngle = i < angles.length - 1 ? angles[i + 1] : angles[0];
      degreeDifference = calculateDegreeDifference(currentAngle, nextAngle);

      switch (degreeDifference) {
        case 315:
          corners[i] = Corner.FORTY_FIVE_OUTSIDE;
          outsideCornerCount++;
          break;
        case 270:
          corners[i] = Corner.OUTSIDE;
          outsideCornerCount++;
          break;
        case 90:
          corners[i] = Corner.INSIDE;
          insideCornerCount++;
          break;
        case 45:
          corners[i] = Corner.FORTY_FIVE_INSIDE;
          insideCornerCount++;
          break;
        case 0:
          corners[i] = Corner.ONE_HUNDRED_EIGHTY;
          break;
        default:
          corners[i] = Corner.ONE_HUNDRED_EIGHTY; // If unexpected angle, Corner.ONE_HUNDRED_EIGHTY is safe
          break;
      }
    }
  }

  const swapCornersIfNeeded = (from: Corner, to: Corner): void => {
    for (let i = 0; i < corners.length; i++) {
      if (corners[i] === from) {
        corners[i] = to;
      } else if (corners[i] === to) {
        corners[i] = from;
      }
    }
  };

  if (insulationArea === InsulationArea.INSIDE && insideCornerCount < outsideCornerCount) {
    swapCornersIfNeeded(Corner.INSIDE, Corner.OUTSIDE);
    swapCornersIfNeeded(Corner.FORTY_FIVE_INSIDE, Corner.FORTY_FIVE_OUTSIDE);
  } else if (insulationArea === InsulationArea.OUTSIDE && insideCornerCount > outsideCornerCount) {
    swapCornersIfNeeded(Corner.INSIDE, Corner.OUTSIDE);
    swapCornersIfNeeded(Corner.FORTY_FIVE_INSIDE, Corner.FORTY_FIVE_OUTSIDE);
  }

  return corners;
};

export const angleToTJointAngles = (inputState: InputState): number[] => {
  let angleDiff = (inputState.angleInput - inputState.previousAngle + 360) % 360;
  let tJointAngles: number[];

  if (angleDiff == 0) {
    tJointAngles = [inputState.angleInput - 90, inputState.angleInput, inputState.angleInput + 90];
  } else {
    tJointAngles = [
      inputState.angleInput - 90,
      inputState.angleInput + 180,
      inputState.angleInput + 90,
    ];
  }

  inputState.previousTJointAngle.current = inputState.angleInput + 90;

  return tJointAngles;
};

// Changes the index of the TJoint from the vertex to the edge
// Ex: 4 and 8 will become 3 and 4 meaning corner 3 and corner 4 are TJoints
const adjustTJointsIndexes = (tJoints: TJoints): Record<number, number[]> => {
  const adjustedAngles: Record<number, number[]> = {};

  Object.keys(tJoints).forEach((key, index) => {
    const numericKey = parseInt(key);
    if (index === 0) {
      // Keep the first key as it is
      adjustedAngles[numericKey - 1] = tJoints[numericKey];
    } else {
      // Adjust the key for subsequent keys
      const newKey = numericKey - 1 - 3 * index;
      adjustedAngles[newKey] = tJoints[numericKey];
    }
  });

  return adjustedAngles;
};
