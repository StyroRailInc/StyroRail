// Type
import { BlockType, Width } from "../../types/BBTypes";

// Utility function
import getBlockSpecifications from "../BlockSpecifications";

// Constants
import { Constants } from "@/constants";

// Classes
import Dimensions from "./Dimensions";
import Opening from "./Opening";
import Corner from "./Corner";
import SpecialBlock from "./SpecialBlock";

class Wall {
  // Dimensions
  dimensions: Dimensions;

  // Corners
  corner: Corner;

  // Special blocks
  specialBlock: SpecialBlock;

  // Windows and doors dimensions
  openings: Opening[];
  private nCourses: number = 0;

  constructor() {
    this.dimensions = new Dimensions(0, 0, '8"');
    this.corner = new Corner(0, 0, 0, 0, '8"');
    this.specialBlock = new SpecialBlock(0, 0, 0, '8"');
    this.openings = [];
  }

  computeWall(): Record<BlockType, number> {
    this.nCourses = this.dimensions.getNCourses();
    let remainingSurfaceArea = this.dimensions.getSurfaceArea();
    let openingPerimeter = 0;

    for (let opening of this.openings) {
      openingPerimeter += opening.getPerimeter();
      remainingSurfaceArea -= opening.getSurfaceArea();
    }

    remainingSurfaceArea -=
      this.corner.getTotalSurfaceArea() * this.nCourses + this.specialBlock.getTotalSurfaceArea();

    const blockQuantities: Record<BlockType, number> = {
      straight: Math.ceil(
        remainingSurfaceArea /
          getBlockSpecifications("straight", this.dimensions.getWidth()).surfaceArea.ext
      ),
      ninetyCorner: this.corner.getTotal90() * this.nCourses,
      fortyFiveCorner: this.corner.getTotal45() * this.nCourses,
      doubleTaperTop: this.specialBlock.getTotalDoubleTaperTop(),
      brickLedge: this.specialBlock.getTotalBrickLedge(),
      buck: this.specialBlock.getTotalBuck(),
    };

    return blockQuantities;
  }
}

export default Wall;
