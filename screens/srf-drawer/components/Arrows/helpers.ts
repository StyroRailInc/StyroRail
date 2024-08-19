// Type
import { InputState } from "@/screens/srf-drawer/types/inputState";

export const rotateWall = (inputState: InputState, direction: "right" | "left") => {
  let newAngle = inputState.angleInput;

  if (inputState.previousCornerIsTJoint) {
    inputState.setAngleInput(inputState.previousAngle);
    return;
  }

  if (inputState.isTJoint) {
    inputState.setAngleInput((newAngle + 180) % 360);
    return;
  }

  if (inputState.isFirstWall) {
    newAngle = direction === "right" ? (newAngle + 45) % 360 : (newAngle - 45 + 360) % 360;
    inputState.setAngleInput(newAngle);
    return;
  }

  let angleDiff = (newAngle - inputState.previousAngle + 360) % 360;

  if (direction === "right") {
    if (angleDiff === 45 || angleDiff === 270 || angleDiff === 315 || angleDiff === 0) {
      newAngle = (newAngle + 45) % 360;
    } else {
      newAngle = (newAngle + 180) % 360;
    }
  } else {
    if (angleDiff <= 90 || angleDiff === 315 || angleDiff === 0) {
      newAngle = (newAngle - 45 + 360) % 360;
    } else {
      newAngle = (newAngle - 180 + 360) % 360;
    }
  }

  inputState.setAngleInput(newAngle);
};
