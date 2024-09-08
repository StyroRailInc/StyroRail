import { BlockType } from "../../types/BBTypes";

interface BlockSpecification {
  length: number | { ext: number; int: number }; // Inches
  width: number; // Inches
  height: number; // Inches
  concreteVolume: number; // Cubic yards
  surfaceArea: number; // Square feet
  qtyPerBundle: number;
  return?: { ext: number; int: number };
}

const blockData: Record<BlockType, Record<string, BlockSpecification>> = {
  straight: {
    '4"': {
      length: 48,
      width: 9,
      height: 16,
      concreteVolume: 0.065844,
      surfaceArea: 5.33,
      qtyPerBundle: 15,
    },
    '6"': {
      length: 48,
      width: 11,
      height: 16,
      concreteVolume: 0.098765,
      surfaceArea: 5.33,
      qtyPerBundle: 12,
    },
    '8"': {
      length: 48,
      width: 13,
      height: 16,
      concreteVolume: 0.131687,
      surfaceArea: 5.33,
      qtyPerBundle: 12,
    },
  },
  ninetyCorner: {
    '4"': {
      length: { ext: 31, int: 22 },
      width: 9,
      height: 16,
      concreteVolume: 0.054574,
      surfaceArea: 5.56,
      qtyPerBundle: 12,
      return: { ext: 19, int: 10 },
    },
    '6"': {
      length: { ext: 33, int: 22 },
      width: 11,
      height: 16,
      concreteVolume: 0.086528,
      surfaceArea: 6.0,
      qtyPerBundle: 12,
      return: { ext: 21, int: 10 },
    },
    '8"': {
      length: { ext: 35, int: 22 },
      width: 13,
      height: 16,
      concreteVolume: 0.121517,
      surfaceArea: 6.44,
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
      surfaceArea: 4.89,
      qtyPerBundle: 12,
      return: { ext: 16, int: 12.272 },
    },
    '6"': {
      length: { ext: 28, int: 23.444 },
      width: 11,
      height: 16,
      concreteVolume: 0.080841,
      surfaceArea: 4.89,
      qtyPerBundle: 12,
      return: { ext: 16, int: 11.444 },
    },
    '8"': {
      length: { ext: 28, int: 22.615 },
      width: 13,
      height: 16,
      concreteVolume: 0.105425,
      surfaceArea: 4.89,
      qtyPerBundle: 12,
      return: { ext: 16, int: 10.615 },
    },
  },
  doubleTaperTop: {
    '6"': {
      length: 48,
      width: 11,
      height: 16,
      concreteVolume: 0.130128,
      surfaceArea: 5.33,
      qtyPerBundle: 12,
    },
    '8"': {
      length: 48,
      width: 13,
      height: 16,
      concreteVolume: 0.16305,
      surfaceArea: 5.33,
      qtyPerBundle: 12,
    },
  },
  brickLedge: {
    '6"': {
      length: 48,
      width: 11,
      height: 16,
      concreteVolume: 0.134148,
      surfaceArea: 5.33,
      qtyPerBundle: 6,
    },
    '8"': {
      length: 48,
      width: 13,
      height: 16,
      concreteVolume: 0.167074,
      surfaceArea: 5.33,
      qtyPerBundle: 6,
    },
  },
  buck: {
    '4"': {
      length: 52,
      width: 9,
      height: 2,
      concreteVolume: 0, // Not provided
      surfaceArea: 3.125,
      qtyPerBundle: 19,
    },
    '6"': {
      length: 52,
      width: 11,
      height: 2,
      concreteVolume: 0, // Not provided
      surfaceArea: 3.82,
      qtyPerBundle: 18,
    },
    '8"': {
      length: 52,
      width: 13,
      height: 2,
      concreteVolume: 0, // Not provided
      surfaceArea: 4.51,
      qtyPerBundle: 16,
    },
  },
};

function getBlockSpecifications(blockType: BlockType, length: string): BlockSpecification {
  const block = blockData[blockType][length];
  if (!block) {
    throw new Error(`Block type ${blockType} or specification at length ${length} not found`);
  }
  return block;
}
