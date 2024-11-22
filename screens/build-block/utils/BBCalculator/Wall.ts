// Type
import { BlockType } from "../../types/BBTypes";

// Utility function
import getBlockSpecifications from "../BlockSpecifications";

// Classes
import Dimensions from "./Dimensions";
import Opening from "./Opening";
import Corners from "./Corners";
import SpecialBlocks from "./SpecialBlocks";

// Type
import { Width } from "../../types/BBTypes";

class Wall {
  private dimensions: Dimensions;
  private corners: Corners;
  private specialBlocks: SpecialBlocks;
  private openings: Opening[];
  private nCourses: number = 0;

  constructor(
    dimensions: Dimensions,
    corners: Corners,
    specialBlocks: SpecialBlocks,
    openings: Opening[]
  ) {
    this.dimensions = dimensions;
    this.corners = corners;
    this.specialBlocks = specialBlocks;
    this.openings = openings;
  }

  computeWall(): { width: Width; blockQuantities: Record<BlockType, number> } {
    this.nCourses = this.dimensions.getNCourses();
    let remainingSurfaceArea = this.dimensions.getSurfaceArea();
    let openingPerimeter = 0;

    for (let opening of this.openings) {
      openingPerimeter += opening.getPerimeter();
      remainingSurfaceArea -= opening.getSurfaceArea();
    }

    remainingSurfaceArea -=
      this.corners.getTotalSurfaceArea() * this.nCourses + this.specialBlocks.getTotalSurfaceArea();
    this.specialBlocks.setBuckLength(openingPerimeter);

    const blockQuantities: Record<BlockType, number> = {
      straight: Math.ceil(
        remainingSurfaceArea /
          getBlockSpecifications("straight", this.dimensions.getWidth()).surfaceArea.ext
      ),
      ninetyCorner: this.corners.getTotal90() * this.nCourses,
      fortyFiveCorner: this.corners.getTotal45() * this.nCourses,
      doubleTaperTop: this.specialBlocks.getTotalDoubleTaperTop(),
      brickLedge: this.specialBlocks.getTotalBrickLedge(),
      buck: this.specialBlocks.getTotalBuck(),
    };

    return { width: this.dimensions.getWidth(), blockQuantities: blockQuantities };
  }
}

export default Wall;
