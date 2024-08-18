// Class
import CornerSpecifications from "@/utils/CornerSpecifications";

// Enums
import { Corner, FoamWidth, AdjustmentFormula } from "@/utils/enums";

class Wall {
  length: number;
  height: number;
  upperCorner: CornerSpecifications;
  lowerCorner: CornerSpecifications;
  foamWidth: FoamWidth;
  previousWallConcreteWidth: number;
  concreteWidth: number;
  nextWallConcreteWidth: number;

  cornerCounts: Record<Corner, number> = {
    [Corner.INSIDE]: 0,
    [Corner.OUTSIDE]: 0,
    [Corner.FORTY_FIVE_INSIDE]: 0,
    [Corner.FORTY_FIVE_OUTSIDE]: 0,
    [Corner.ONE_HUNDRED_EIGHTY]: 0,
    [Corner.TJOINT]: 0,
  };

  constructor(
    length: number,
    height: number,
    upperCorner: CornerSpecifications,
    lowerCorner: CornerSpecifications,
    foamWidth: FoamWidth,
    previousWallConcreteWidth: number,
    concreteWidth: number,
    nextWallConcreteWidth: number
  ) {
    this.length = length;
    this.height = height;
    this.upperCorner = upperCorner;
    this.lowerCorner = lowerCorner;
    this.foamWidth = foamWidth;
    this.previousWallConcreteWidth = previousWallConcreteWidth;
    this.concreteWidth = concreteWidth;
    this.nextWallConcreteWidth = nextWallConcreteWidth;
  }

  countCorners(): Record<Corner, number> {
    const corners = [this.upperCorner, this.lowerCorner];
    for (const corner of corners) {
      this.cornerCounts[corner.corner]++;
    }
    return this.cornerCounts;
  }

  classifyWall(): (AdjustmentFormula | boolean)[] {
    this.countCorners();

    switch (true) {
      case this.cornerCounts[Corner.INSIDE] == 2:
        return [AdjustmentFormula.ONE, false];

      case this.cornerCounts[Corner.INSIDE] == 1 &&
        this.cornerCounts[Corner.FORTY_FIVE_OUTSIDE] == 1:
        return [AdjustmentFormula.TWO, false];

      case this.cornerCounts[Corner.INSIDE] == 1 && this.cornerCounts[Corner.OUTSIDE] == 1:
        return [AdjustmentFormula.SEVEN, false];

      case this.cornerCounts[Corner.INSIDE] == 1 &&
        this.cornerCounts[Corner.FORTY_FIVE_INSIDE] == 1:
        return [AdjustmentFormula.THREE, false];

      case this.cornerCounts[Corner.INSIDE] == 1 &&
        (this.cornerCounts[Corner.ONE_HUNDRED_EIGHTY] == 1 ||
          this.cornerCounts[Corner.TJOINT] == 1):
        return [AdjustmentFormula.FOUR, false];

      case this.cornerCounts[Corner.OUTSIDE] == 2:
        return [AdjustmentFormula.ONE, true];

      case this.cornerCounts[Corner.OUTSIDE] == 1 &&
        this.cornerCounts[Corner.FORTY_FIVE_OUTSIDE] == 1:
        return [AdjustmentFormula.TWO, true];

      case this.cornerCounts[Corner.OUTSIDE] == 1 &&
        this.cornerCounts[Corner.FORTY_FIVE_INSIDE] == 1:
        return [AdjustmentFormula.THREE, true];

      case this.cornerCounts[Corner.OUTSIDE] == 1 &&
        (this.cornerCounts[Corner.ONE_HUNDRED_EIGHTY] == 1 ||
          this.cornerCounts[Corner.TJOINT] == 1):
        return [AdjustmentFormula.FOUR, true];

      case this.cornerCounts[Corner.FORTY_FIVE_INSIDE] == 2:
        return [AdjustmentFormula.FIVE, false];

      case this.cornerCounts[Corner.FORTY_FIVE_INSIDE] == 1 &&
        this.cornerCounts[Corner.FORTY_FIVE_OUTSIDE] == 1:
        return [AdjustmentFormula.EIGHT, false];

      case this.cornerCounts[Corner.FORTY_FIVE_INSIDE] == 1 &&
        (this.cornerCounts[Corner.ONE_HUNDRED_EIGHTY] == 1 ||
          this.cornerCounts[Corner.TJOINT] == 1):
        return [AdjustmentFormula.SIX, false];

      case this.cornerCounts[Corner.FORTY_FIVE_OUTSIDE] == 2:
        return [AdjustmentFormula.FIVE, true];

      case this.cornerCounts[Corner.FORTY_FIVE_OUTSIDE] == 1 &&
        (this.cornerCounts[Corner.ONE_HUNDRED_EIGHTY] == 1 ||
          this.cornerCounts[Corner.TJOINT] == 1):
        return [AdjustmentFormula.SIX, true];

      default:
        return [AdjustmentFormula.NONE, false];
    }
  }
}

export default Wall;
