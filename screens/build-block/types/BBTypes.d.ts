export type Width = "4" | "6" | "8";

export type Opening = {
  width: number;
  height: number;
  quantity: number;
};

export type BlockType =
  | "Straight"
  | "90Corner"
  | "45Corner"
  | "DoubleTaperTop"
  | "BrickLedge"
  | "Buck";
