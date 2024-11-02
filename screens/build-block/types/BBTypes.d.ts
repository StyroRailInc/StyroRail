// Class
import Opening from "../utils/BBCalculator/Opening";

export type Width = '4"' | '6"' | '8"';

export type BlockType =
  | "straight"
  | "ninetyCorner"
  | "fortyFiveCorner"
  | "doubleTaperTop"
  | "brickLedge"
  | "buck";

export type InputState = {
  length: string;
  height: string;
  width: string;
  nInsideCorners: string;
  nOutsideCorners: string;
  n45InsideCorners: string;
  n45OutsideCorners: string;
  doubleTaperTopLength: string;
  brickLedgeLength: string;
  isValidLength: boolean;
  isValidHeight: boolean;
  isValidWidth: boolean;
};

export type InputAction =
  | { type: "setLength"; payload: string }
  | { type: "setHeight"; payload: string }
  | { type: "setWidth"; payload: string }
  | { type: "setNInsideCorners"; payload: string }
  | { type: "setNOutsideCorners"; payload: string }
  | { type: "setN45OutsideCorners"; payload: string }
  | { type: "setN45InsideCorners"; payload: string }
  | { type: "setBrickLedgeLength"; payload: string }
  | { type: "setDoubleTaperTopLength"; payload: string }
  | { type: "resetInputs" }
  | {
      type: "setInputs";
      payload: {
        length: string;
        height: string;
        width: string;
        nInsideCorners: string;
        nOutsideCorners: string;
        n45InsideCorners: string;
        n45OutsideCorners: string;
        brickLedgeLength: string;
        doubleTaperTopLength: string;
      };
    }
  | { type: "setIsValidLength"; payload: { isValid: boolean } }
  | { type: "setIsValidHeight"; payload: { isValid: boolean } }
  | { type: "setIsValidWidth"; payload: { isValid: boolean } };

export type OpeningState = {
  openings: { width: string; height: string; quantity: string }[];
};

export type OpeningAction =
  | { type: "setOpeningHeight"; payload: string }
  | { type: "setOpeningWidth"; payload: string }
  | { type: "setOpeningQuantity"; payload: string }
  | { type: "addOpening"; payload: { width: string; height: string; quantity: string } }
  | { type: "removeOpening"; payload: number }
  | {
      type: "modifyOpening";
      payload: { index: number; attribute: "width" | "height" | "quantity"; value: string };
    }
  | { type: "setOpenings"; payload: OpeningState };

export type WallState = {
  walls: { inputState: InputState; openingState: OpeningState }[];
};

export type WallAction =
  | {
      type: "modifyWall";
      payload: { inputState: InputState; openingState: OpeningState; index: number };
    }
  | {
      type: "addWall";
      payload: { inputState: InputState; openingState: OpeningState };
    }
  | {
      type: "deleteWall";
      payload: {
        index: number;
      };
    };
