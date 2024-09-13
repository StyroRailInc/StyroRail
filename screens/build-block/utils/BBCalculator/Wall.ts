// Type
import { BlockType, Opening, Width } from "../../types/BBTypes";

// Utility function
import getBlockSpecifications from "../BlockSpecifications";

class Wall {
  // Wall dimensions
  private height: number = 0;
  private length: number = 0;
  private width: Width = '8"';

  // Corners
  private nInsideCorners: number = 0;
  private nOutsideCorners: number = 0;
  private n45InsideCorners: number = 0;
  private n45OutsideCorners: number = 0;

  // Windows and doors dimensions
  private openings: Opening[] = [];
  private nCourses: number = 0;

  constructor() {}

  computeNCourses() {
    this.nCourses = this.height / 16;
  }

  computeWall(): Record<BlockType, number> {
    this.computeNCourses();
    let remainingSurfaceArea = this.length * this.height;
    let openingPerimeter = 0;

    for (let opening of this.openings) {
      const openingSurfaceArea = opening.height * opening.width;
      openingPerimeter += (opening.height + opening.width) * 2 * opening.quantity;

      remainingSurfaceArea -= openingSurfaceArea;
    }

    remainingSurfaceArea -=
      (this.nInsideCorners * getBlockSpecifications("ninetyCorner", this.width).surfaceArea.int +
        this.nOutsideCorners * getBlockSpecifications("ninetyCorner", this.width).surfaceArea.ext +
        this.n45InsideCorners *
          getBlockSpecifications("fortFiveCorner", this.width).surfaceArea.int +
        this.n45OutsideCorners *
          getBlockSpecifications("fortFiveCorner", this.width).surfaceArea.ext) *
      this.nCourses;

    const blockQuantities: Record<BlockType, number> = {
      straight:
        remainingSurfaceArea / getBlockSpecifications("straight", this.width).surfaceArea.ext,
      ninetyCorner: (this.nInsideCorners + this.nOutsideCorners) * this.nCourses,
      fortyFiveCorner: (this.n45InsideCorners + this.n45OutsideCorners) * this.nCourses,
      doubleTaperTop: 0,
      brickLedge: 0,
      buck: openingPerimeter / getBlockSpecifications("buck", this.width).length.ext,
    };

    return blockQuantities;
  }

  setHeight(height: number) {
    this.height = height;
  }

  setLength(length: number) {
    this.length = length;
  }

  setWidth(width: Width) {
    this.width = width;
  }

  setInsideCorners(nInsideCorners: number) {
    this.nInsideCorners = nInsideCorners;
  }

  setOutsideCorners(nOutsideCorners: number) {
    this.nOutsideCorners = nOutsideCorners;
  }

  set45InsideCorners(n45InsideCorners: number) {
    this.n45InsideCorners = n45InsideCorners;
  }

  set45OutsideCorners(n45OutsideCorners: number) {
    this.n45OutsideCorners = n45OutsideCorners;
  }

  setOpenings(openings: Opening[]) {
    this.openings = openings;
  }

  getHeight(): number {
    return this.height;
  }

  getLength(): number {
    return this.length;
  }

  getWidth(): Width | null {
    return this.width;
  }

  getInsideCorners(): number {
    return this.nInsideCorners;
  }

  getOutsideCorners(): number {
    return this.nOutsideCorners;
  }

  get45InsideCorners(): number {
    return this.n45InsideCorners;
  }

  get45OutsideCorners(): number {
    return this.n45OutsideCorners;
  }

  getOpenings(): Opening[] {
    return this.openings;
  }
}

export default Wall;
