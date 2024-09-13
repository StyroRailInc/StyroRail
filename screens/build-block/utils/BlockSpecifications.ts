// Types
import { BlockType } from "../../types/BBTypes";

interface BlockSpecification {
  length: { ext: number; int: number }; // Inches
  width: number; // Inches
  height: number; // Inches
  concreteVolume: number; // Cubic yards
  surfaceArea: { ext: number; int: number }; // Square feet
  qtyPerBundle: number;
  return?: { ext: number; int: number }; // Inches
}

const blockSpecifications: Record<BlockType, Record<string, BlockSpecification>> = {
  straight: {
    '4"': {
      length: { ext: 48, int: 48 },
      width: 9,
      height: 16,
      concreteVolume: 0.065844,
      surfaceArea: { ext: 5.33, int: 5.33 },
      qtyPerBundle: 15,
    },
    '6"': {
      length: { ext: 48, int: 48 },
      width: 11,
      height: 16,
      concreteVolume: 0.098765,
      surfaceArea: { ext: 5.33, int: 5.33 },
      qtyPerBundle: 12,
    },
    '8"': {
      length: { ext: 48, int: 48 },
      width: 13,
      height: 16,
      concreteVolume: 0.131687,
      surfaceArea: { ext: 5.33, int: 5.33 },
      qtyPerBundle: 12,
    },
  },
  ninetyCorner: {
    '4"': {
      length: { ext: 31, int: 22 },
      width: 9,
      height: 16,
      concreteVolume: 0.054574,
      surfaceArea: { ext: 5.56, int: 3.56 },
      qtyPerBundle: 12,
      return: { ext: 19, int: 10 },
    },
    '6"': {
      length: { ext: 33, int: 22 },
      width: 11,
      height: 16,
      concreteVolume: 0.086528,
      surfaceArea: { ext: 6.0, int: 3.56 },
      qtyPerBundle: 12,
      return: { ext: 21, int: 10 },
    },
    '8"': {
      length: { ext: 35, int: 22 },
      width: 13,
      height: 16,
      concreteVolume: 0.121517,
      surfaceArea: { ext: 6.44, int: 3.56 },
      qtyPerBundle: 12,
      return: { ext: 23, int: 10 },
    },
  },
  fortyFiveCorner: {
    '4"': {
      length: { ext: 28, int: 24.272 },
      width: 9,
      height: 16,
      concreteVolume: 0.054985,
      surfaceArea: { ext: 4.89, int: 4.06 },
      qtyPerBundle: 12,
      return: { ext: 16, int: 12.272 },
    },
    '6"': {
      length: { ext: 28, int: 23.444 },
      width: 11,
      height: 16,
      concreteVolume: 0.080841,
      surfaceArea: { ext: 4.89, int: 3.88 },
      qtyPerBundle: 12,
      return: { ext: 16, int: 11.444 },
    },
    '8"': {
      length: { ext: 28, int: 22.615 },
      width: 13,
      height: 16,
      concreteVolume: 0.105425,
      surfaceArea: { ext: 4.89, int: 3.69 },
      qtyPerBundle: 12,
      return: { ext: 16, int: 10.615 },
    },
  },
  doubleTaperTop: {
    '6"': {
      length: { ext: 48, int: 48 },
      width: 11,
      height: 16,
      concreteVolume: 0.130128,
      surfaceArea: { ext: 5.33, int: 5.33 },
      qtyPerBundle: 12,
    },
    '8"': {
      length: { ext: 48, int: 48 },
      width: 13,
      height: 16,
      concreteVolume: 0.16305,
      surfaceArea: { ext: 5.33, int: 5.33 },
      qtyPerBundle: 12,
    },
  },
  brickLedge: {
    '6"': {
      length: { ext: 48, int: 48 },
      width: 11,
      height: 16,
      concreteVolume: 0.134148,
      surfaceArea: { ext: 5.33, int: 5.33 },
      qtyPerBundle: 6,
    },
    '8"': {
      length: { ext: 48, int: 48 },
      width: 13,
      height: 16,
      concreteVolume: 0.167074,
      surfaceArea: { ext: 5.33, int: 5.33 },
      qtyPerBundle: 6,
    },
  },
  buck: {
    '4"': {
      length: { ext: 52, int: 52 },
      width: 9,
      height: 2,
      concreteVolume: 0, // Not provided
      surfaceArea: { ext: 3.125, int: 3.125 },
      qtyPerBundle: 19,
    },
    '6"': {
      length: { ext: 52, int: 52 },
      width: 11,
      height: 2,
      concreteVolume: 0, // Not provided
      surfaceArea: { ext: 3.82, int: 3.82 },
      qtyPerBundle: 18,
    },
    '8"': {
      length: { ext: 52, int: 52 },
      width: 13,
      height: 2,
      concreteVolume: 0, // Not provided
      surfaceArea: { ext: 4.51, int: 4.51 },
      qtyPerBundle: 16,
    },
  },
};

function getBlockSpecifications(blockType: BlockType, length: string): BlockSpecification {
  const block = blockSpecifications[blockType][length];
  if (!block) {
    throw new Error(`Block type ${blockType} or specification at length ${length} not found`);
  }
  return block;
}

export default getBlockSpecifications;
