// Type
import Wall from "./Wall";
import { BlockType } from "../../types/BBTypes";

class House {
  private walls: Wall[];

  private blockQuantities: Record<BlockType, number> = {
    straight: 0,
    ninetyCorner: 0,
    fortyFiveCorner: 0,
    doubleTaperTop: 0,
    brickLedge: 0,
    buck: 0,
  };

  private adjustBlockQuantities(blockQuantities: Record<BlockType, number>) {
    this.blockQuantities["straight"] += blockQuantities["straight"];
    this.blockQuantities["ninetyCorner"] += blockQuantities["ninetyCorner"];
    this.blockQuantities["fortyFiveCorner"] += blockQuantities["fortyFiveCorner"];
    this.blockQuantities["doubleTaperTop"] += blockQuantities["doubleTaperTop"];
    this.blockQuantities["brickLedge"] += blockQuantities["brickLedge"];
    this.blockQuantities["buck"] += blockQuantities["buck"];
  }

  constructor(walls: Wall[]) {
    this.walls = walls;
  }

  computeHouse() {
    for (let wall of this.walls) {
      const wallBlockQuantities = wall.computeWall();
      this.adjustBlockQuantities(wallBlockQuantities);
    }
  }
}

export default House;
