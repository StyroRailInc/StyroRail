// Type
import { BlockType, Opening, Width } from "../../types/BBTypes";

class Wall {
  // Wall dimensions
  private height: number = 0;
  private length: number = 0;
  private width: Width | null = null;

  // Corners
  private nInsideCorners: number = 0;
  private nOutsideCorners: number = 0;
  private n45InsideCorners: number = 0;
  private n45OutsideCorners: number = 0;

  // Windows and doors dimensions
  private openings: Opening[] = [];

  private nBucks: number = 0;

  // Quantity
  // private nBlocks:

  constructor() {}

  computeWall() {
    let remainingSurface = this.length * this.height;
    for (let opening of this.openings) {
      const openingPerimeter = (opening.height + opening.width) * 2;
    }
  }

  setHeight(height: number) {
    this.height = height;
  }

  setLength(length: number) {
    this.length = length;
  }

  setWidth(width: Width | null) {
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
