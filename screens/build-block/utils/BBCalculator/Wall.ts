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

  private nBucks: number = 0;

  private nCourse: number = 0;

  // Quantity
  // private nBlocks:

  constructor() {}

  computeWall() {
    let remainingSurfaceArea = this.length * this.height;
    let openingPerimeter = 0;

    for (let opening of this.openings) {
      const openingSurfaceArea = opening.height * opening.width;
      openingPerimeter += (opening.height + opening.width) * 2 * opening.quantity;

      remainingSurfaceArea -= openingSurfaceArea;
    }

    this.nBucks += openingPerimeter / getBlockSpecifications("buck", this.width).length;

    remainingSurfaceArea -=
      this.nInsideCorners * getBlockSpecifications("ninetyCorner", this.width).surfaceArea;
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
