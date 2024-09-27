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
  nInsideCorners: string;
  nOutsideCorners: string;
  n45InsideCorners: string;
  n45OutsideCorners: string;
};

export type InputAction =
  | { type: "setLength"; payload: string }
  | { type: "setHeight"; payload: string }
  | { type: "setNInsideCorners"; payload: string }
  | { type: "setNOutsideCorners"; payload: string }
  | { type: "setN45OutsideCorners"; payload: string }
  | { type: "setN45InsideCorners"; payload: string };

export type OpeningState = {
  height: string;
  width: string;
  quantity: string;
  openings: Opening[];
};

export type OpeningAction =
  | { type: "setOpeningHeight"; payload: string }
  | { type: "setOpeningWidth"; payload: string }
  | { type: "setOpeningQuantity"; payload: string }
  | { type: "addOpening"; payload: Opening }
  | { type: "removeOpening"; payload: number };
