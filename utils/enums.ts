export enum Corner {
  INSIDE = "Interne",
  OUTSIDE = "Externe",
  FORTY_FIVE_INSIDE = "45 Interne",
  FORTY_FIVE_OUTSIDE = "45 Externe",
  ONE_HUNDRED_EIGHTY = "Plat",
  TJOINT = "Équerre",
}

export enum PanelLengths {
  TWENTY_FOUR = '24"',
  SIXTEEN = '16"',
  TWELVE = '12"',
  EIGHT = '8"',
  SEVEN = '7"',
  SIX = '6"',
  FOUR = '4"',
  THREE = '3"',
  TWO = '2"',
  BIG_FORTY_FIVE = "Grand 45",
  SMALL_FORTY_FIVE = "Petit 45",
}

export enum InsulationArea {
  INSIDE = "Intérieur du bâtiment",
  OUTSIDE = "Extérieur du bâtiment",
}

export enum FoamWidth {
  THREE = '3"',
  FOUR = '4"',
}

export enum CornerLength {
  THREE = '3"',
  FOUR = '4"',
}

export enum WallHeight {
  FOUR = "4'",
  FIVE = "5'",
  FIVE_SIX = `5'6"`,
  SIX = "6'",
  EIGHT = "8'",
  EIGHT_SIX = `8'6"`,
  NINE = "9'",
  TEN = "10'",
}

export enum FloorType {
  SRP200 = "SR.P 200",
  HYDROPEX = "Hydropex",
  NONE = "Aucun",
}

export enum Panel {
  TWENTY_FOUR = 24,
  SIXTEEN = 16,
  TWELVE = 12,
  EIGHT = 8,
  SEVEN = 7,
  SIX = 6,
  FOUR = 4,
  THREE = 3,
  TWO = 2,
  SMALL_45 = 5.01, // Will not be computed
  BIG_45 = 7.01, // Will not be computed
}

// PC = Previous Concrete Width
// CC = Current Concrete Width
// NC = Next Concrete Width
// All the formulas are subtracted to the current wall length
export enum AdjustmentFormula {
  ONE, // +-(PC + NC)
  TWO, // +-(PC - (NC - CC) * SQRT2 + CC / 2.41) || +-(NC - (PC - CC) * SQRT2 + CC / 2.41)
  THREE, // +-(PC + (NC - CC) * SQRT2 + CC / 2.41) || +-(NC + (PC - CC) * SQRT2 + CC / 2.41)
  FOUR, // -(PC * 2.41) || -(NC * 2.41)
  FIVE, // +-((PC - CC) * SQRT2 + CC / 2.41 + (NC - CC) * SQRT2 + CC / 2.41)
  SIX, // +-((PC - CC) * SQRT2 + CC / 2.41) || +-((NC - CC) * SQRT2 + CC / 2.41)
  SEVEN, // +-(PC - NC)
  EIGHT, // +-((PC - CC) * SQRT2 + CC / 2.41 - ((NC - CC) * SQRT2 + CC / 2.41))
  NONE,
}

export enum BlockWidth {
  EIGHT = '8"',
  SIX = '6"',
  FOUR = '4"',
}

export function stringToEnum<T>(enumObj: T, value: string): T[keyof T] {
  return value as T[keyof T];
}
