// Enum
import { FloorType } from "@/utils/enums";

// LineDrawer types
export type DrawingBounds = { maxX: number; maxY: number; minX: number; minY: number };
export type Edge = { x1: number; y1: number };
export type DrawingParams = {
  wallLengths: number[];
  drawingWidth: number;
  drawingHeight: number;
  drawingBounds: DrawingBounds;
  limitedDrawingWindowWidth: number;
  limitedDrawingWindowHeight: number;
};

// TJoint type
export type TJoints = Record<number, number[]>;
export type TJointAngles = Record<number, number[]>;

// FoundationPanels type
export type FoundationPanels = Record<number, number[]>;

// SR.F Linear Heights type
export type Heights = Record<number, number[]>;

// PanelPosition type
export type PanelPosition = {
  [key in any]: number;
};

// useWindowDimensions type
export type Setter = (value: number) => void;

// Vertex type
export type Vertex = { x: number; y: number };

export type FloorPanels = Record<FloorType, number>;
