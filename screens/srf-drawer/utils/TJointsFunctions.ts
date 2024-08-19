// Constants
import { Constants } from "@/constants";

// Types
import { TJoints, TJointAngles } from "@/types/generalTypes";

export const findNTJointsBeforeIndex = (index: number, tJoints: TJoints): number => {
  let nTJointsBeforeIndex = 0;

  for (let key in tJoints) {
    const tJointIndex = parseInt(key);
    if (tJointIndex <= index) {
      ++nTJointsBeforeIndex;
      index += Constants.N_WALLS_PER_T_JOINT;
    }
  }

  return nTJointsBeforeIndex;
};

export const insertTJointAngles = (tJointAngles: TJointAngles, angles: number[]): number[] => {
  const newAngles = [...angles];

  for (const key in tJointAngles) {
    const index = parseInt(key, 10);
    newAngles.splice(index, 0, ...tJointAngles[index]);
  }
  return newAngles;
};

export const insertTJoints = (tJoints: TJoints, wallLengths: number[]): number[] => {
  const newWallLengths = [...wallLengths];

  for (const key in tJoints) {
    const index = parseInt(key, 10);
    newWallLengths.splice(index, 0, ...tJoints[index]);
  }
  return newWallLengths;
};

export const removeTJointAngles = (allAngles: number[], tJointAngles: Record<number, number[]>) => {
  let newTJointAngles: TJointAngles = [];

  for (let i = allAngles.length - 1; i >= 0; i--) {
    if (tJointAngles[i]) {
      newTJointAngles[i] = allAngles.splice(i, Constants.N_WALLS_PER_T_JOINT);
    }
  }

  return { newAngles: allAngles, newTJointAngles: newTJointAngles };
};

export const filterTJointsUpToIndex = (index: number, tJoints: Record<number, number[]>) => {
  const filteredTJoints: Record<number, number[]> = {};
  let countDeleted: number = 0;

  for (const key in tJoints) {
    if (parseInt(key) <= index) {
      filteredTJoints[parseInt(key)] = tJoints[key];
    } else {
      ++countDeleted;
    }
  }

  return { filteredTJoints, countDeleted };
};

export const previousCornerIsTJoint = (index: number, tJoints: TJoints): boolean => {
  const nTJointsBeforeIndex = findNTJointsBeforeIndex(index, tJoints);
  return (
    tJoints[
      nTJointsBeforeIndex * Constants.N_WALLS_PER_T_JOINT + index - Constants.N_WALLS_PER_T_JOINT
    ] !== undefined
  );
};

export const computeIndex = (index: number, tJoints: TJoints): number => {
  const nTJointsBeforeIndex = findNTJointsBeforeIndex(index, tJoints);
  return index + nTJointsBeforeIndex * Constants.N_WALLS_PER_T_JOINT;
};
