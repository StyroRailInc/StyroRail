// Classes
import Room from "./Room";
import Wall from "./Wall";
import Floor from "./Floor";
import CornerSpecifications from "@/utils/CornerSpecifications";

// Enums
import {
  InsulationArea,
  Corner,
  FoamWidth,
  Panel,
  FloorType,
  CornerLength,
  AdjustmentFormula,
} from "@/utils/enums";

// Type
import { FoundationPanels, PanelPosition } from "@/types/generalTypes";

// Constants
import { Constants } from "@/constants";

class Foundation {
  walls: Wall[] = [];
  floor: Floor | null = null;
  floorType: FloorType;
  nCorners: number = 0;

  insulationArea: InsulationArea;
  foamWidth: FoamWidth;
  cornerLength: CornerLength;
  isEulerPath: boolean;

  room: Room;

  panelPosition: PanelPosition = {
    [Panel.TWENTY_FOUR]: 0,
    [Panel.SIXTEEN]: 1,
    [Panel.TWELVE]: 2,
    [Panel.EIGHT]: 3,
    [Panel.SEVEN]: 4,
    [Panel.SIX]: 5,
    [Panel.FOUR]: 6,
    [Panel.THREE]: 7,
    [Panel.TWO]: 8,
    [Panel.SMALL_45]: 9,
    [Panel.BIG_45]: 10,
  };

  panels: FoundationPanels = {};

  constructor(
    corners: Corner[],
    wallLengths: number[],
    foamWidth: FoamWidth,
    concreteWidths: number[],
    insulationArea: InsulationArea,
    wallHeights: number[],
    cornerLength: CornerLength,
    isEulerPath: boolean,
    floorType: FloorType,
    room: Room
  ) {
    this.insulationArea = insulationArea;
    this.foamWidth = foamWidth;
    this.cornerLength = cornerLength;
    this.floorType = floorType;
    this.isEulerPath = isEulerPath;
    this.room = room;

    let lowerCorner = new CornerSpecifications(
      foamWidth,
      cornerLength,
      corners[corners.length - 1] === Corner.TJOINT
        ? Corner.ONE_HUNDRED_EIGHTY
        : corners[corners.length - 1]
    );
    let previousWallConcreteWidth: number = concreteWidths[concreteWidths.length - 1];
    let concreteWidth: number = concreteWidths[0];
    let nextWallConcreteWidth: number;

    for (let i = 0; i < wallLengths.length; i++) {
      let upperCorner = new CornerSpecifications(foamWidth, cornerLength, corners[i]);

      if (i != wallLengths.length - 1) {
        nextWallConcreteWidth = concreteWidths[i + 1];
      } else {
        nextWallConcreteWidth = concreteWidths[0];
      }

      const wall = new Wall(
        wallLengths[i],
        wallHeights[i],
        upperCorner,
        lowerCorner,
        foamWidth,
        previousWallConcreteWidth,
        concreteWidth,
        nextWallConcreteWidth
      );
      this.walls.push(wall);

      lowerCorner = upperCorner;
      previousWallConcreteWidth = concreteWidth;
      concreteWidth = nextWallConcreteWidth;
    }

    this.nCorners += Math.ceil(
      corners.filter((corner) => {
        return corner !== Corner.ONE_HUNDRED_EIGHTY;
      }).length
    );
  }

  computeFoundation = () => {
    switch (this.insulationArea) {
      case InsulationArea.INSIDE:
        this.computeInsideInsulation();
        break;
      case InsulationArea.OUTSIDE:
        this.computeOutsideInsulation();
        break;
    }

    if (this.isEulerPath && this.floorType !== FloorType.NONE) {
      this.createFloor();
      this.floor?.computePanels();
    }
  };

  computeInsideInsulation = () => {
    for (let i = 0; i < this.walls.length; i++) {
      const classifiedWall = this.walls[i].classifyWall();
      this.insideInsulationWallLengthAdjustments(
        this.walls[i],
        classifiedWall[0] as AdjustmentFormula,
        classifiedWall[1] as boolean
      );
      this.computePanels(this.walls[i]);
    }
  };

  computeOutsideInsulation = () => {
    for (let i = 0; i < this.walls.length; i++) {
      this.computePanels(this.walls[i]);
    }
  };

  createFloor = () => {
    let wallLengths: number[] = [];
    let corners: Corner[] = [];

    for (let i = 0; i < this.walls.length; i++) {
      wallLengths.push(this.walls[i].length);
      corners.push(this.walls[i].upperCorner.corner);
    }

    this.floor = new Floor(wallLengths, corners, this.floorType);
  };

  private isValidWallLength(wallLength: number): boolean {
    return wallLength >= 0;
  }

  private addWallHeight(wallHeight: number) {
    if (!(wallHeight in this.panels)) {
      this.panels[wallHeight] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
  }

  computePanels = (wall: Wall) => {
    if (this.isValidWallLength(wall.length)) {
      const adjustWallLength = (wall: Wall, corner: CornerSpecifications): number => {
        if (corner.corner === Corner.OUTSIDE) {
          if (wall.upperCorner === corner) {
            console.log("upper", wall.nextWallConcreteWidth + parseInt(this.cornerLength));
            return wall.nextWallConcreteWidth + parseInt(this.cornerLength);
          } else {
            console.log("lower", wall.nextWallConcreteWidth + parseInt(this.cornerLength));
            return wall.previousWallConcreteWidth + parseInt(this.cornerLength);
          }
        } else if (corner.corner === Corner.TJOINT) {
          return parseInt(this.cornerLength);
        } else {
          return Math.round(corner.upperPanel?.reduce((acc, panel) => acc + panel, 0) ?? 0);
        }
      };

      // Copy IMPORTANT
      let remainingLength = wall.length;
      console.log(wall.lowerCorner.corner, wall.upperCorner.corner);
      remainingLength -= adjustWallLength(wall, wall.upperCorner);
      remainingLength -= adjustWallLength(wall, wall.lowerCorner);

      // Does not compute negative values (when 2 corners are too close to eachother)
      if (this.isValidWallLength(remainingLength)) {
        console.log("remaining length:", remainingLength);

        // Not computing BIG_45 and SMALL_45 because they are not used as fillers
        const panelTypes = [
          Panel.TWENTY_FOUR,
          Panel.SIXTEEN,
          Panel.TWELVE,
          Panel.EIGHT,
          Panel.SEVEN,
          Panel.SIX,
          Panel.FOUR,
          Panel.THREE,
          Panel.TWO,
        ];

        this.addWallHeight(wall.height);

        for (const panel of panelTypes) {
          const numPanels = Math.floor(remainingLength / panel);
          this.panels[wall.height][this.panelPosition[panel]] += numPanels;
          if (numPanels !== 0) {
            console.log(panel, ":", numPanels);
          }

          remainingLength %= panel;
          // Adjust for remainder if it's 1
          if (remainingLength === 1) {
            --this.panels[wall.height][this.panelPosition[panel]];
            remainingLength += panel;
          }
        }
      }

      this.computeCornerPanels(wall);
    }
  };

  private computeCornerPanels(wall: Wall): void {
    if (wall.upperCorner.corner == Corner.OUTSIDE) {
      let remainingLength: number = wall.nextWallConcreteWidth + parseInt(this.cornerLength);
      this.computeOutsideCornerPanels(wall, remainingLength);
    } else if (wall.upperCorner.upperPanel) {
      for (const panel of wall.upperCorner.upperPanel) {
        ++this.panels[wall.height][this.panelPosition[panel]];
      }
    } else if (wall.upperCorner.corner == Corner.TJOINT) {
      let remainingLength: number =
        Constants.T_JOINT_WIDTH_INCHES + parseInt(this.cornerLength) * 2;
      this.computeTJointCornerPanelsWall(wall, remainingLength);
    }
    if (wall.lowerCorner.corner == Corner.OUTSIDE) {
      let remainingLength: number =
        wall.nextWallConcreteWidth + parseInt(this.cornerLength) + parseInt(this.foamWidth);
      this.computeOutsideCornerPanels(wall, remainingLength);
    } else if (wall.lowerCorner.lowerPanel) {
      for (const panel of wall.lowerCorner.lowerPanel) {
        ++this.panels[wall.height][this.panelPosition[panel]];
      }
    }
  }

  private computeOutsideCornerPanels(wall: Wall, remainingLength: number): void {
    const cornerPanelTypes = [
      Panel.EIGHT,
      Panel.SEVEN,
      Panel.SIX,
      Panel.FOUR,
      Panel.THREE,
      Panel.TWO,
    ];

    for (const panel of cornerPanelTypes) {
      const numPanels = Math.floor(remainingLength / panel);
      this.panels[wall.height][this.panelPosition[panel]] += numPanels;

      remainingLength %= panel;

      // Adjust for remainder if it's 1
      if (remainingLength === 1) {
        --this.panels[wall.height][this.panelPosition[panel]];
        remainingLength += panel;
      }
    }
  }

  private computeTJointCornerPanelsWall(wall: Wall, remainingLength: number): void {
    const cornerPanelTypes = [
      Panel.TWENTY_FOUR,
      Panel.SIXTEEN,
      Panel.TWELVE,
      Panel.EIGHT,
      Panel.SEVEN,
      Panel.SIX,
      Panel.FOUR,
      Panel.THREE,
      Panel.TWO,
    ];

    for (const panel of cornerPanelTypes) {
      const numPanels = Math.floor(remainingLength / panel);
      this.panels[wall.height][this.panelPosition[panel]] += numPanels;

      remainingLength %= panel;

      // Adjust for remainder if it's 1
      if (remainingLength === 1) {
        --this.panels[wall.height][this.panelPosition[panel]];
        remainingLength += panel;
      }
    }
  }

  // Deducts concrete width from wall length
  insideInsulationWallLengthAdjustments(
    wall: Wall,
    adjustmentFormula: AdjustmentFormula,
    isPositive: boolean
  ) {
    const adjustmentFactor: number = isPositive ? -1 : 1;

    switch (adjustmentFormula) {
      case AdjustmentFormula.ONE:
        wall.length -=
          adjustmentFactor * (wall.previousWallConcreteWidth + wall.nextWallConcreteWidth);
        break;

      case AdjustmentFormula.TWO:
        if (wall.lowerCorner.corner !== Corner.FORTY_FIVE_OUTSIDE) {
          wall.length -= Math.round(
            adjustmentFactor *
              (wall.previousWallConcreteWidth -
                ((wall.nextWallConcreteWidth - wall.concreteWidth) * Math.SQRT2 +
                  wall.concreteWidth / Constants.ANGLE_ADJUSTMENT_FACTOR))
          );
        } else {
          wall.length -= Math.round(
            adjustmentFactor *
              (wall.nextWallConcreteWidth -
                ((wall.previousWallConcreteWidth - wall.concreteWidth) * Math.SQRT2 +
                  wall.concreteWidth / Constants.ANGLE_ADJUSTMENT_FACTOR))
          );
        }
        break;

      case AdjustmentFormula.THREE:
        if (wall.lowerCorner.corner !== Corner.FORTY_FIVE_INSIDE) {
          wall.length -= Math.round(
            adjustmentFactor *
              (wall.previousWallConcreteWidth +
                ((wall.nextWallConcreteWidth - wall.concreteWidth) * Math.SQRT2 +
                  wall.concreteWidth / Constants.ANGLE_ADJUSTMENT_FACTOR))
          );
        } else {
          wall.length -= Math.round(
            adjustmentFactor *
              (wall.nextWallConcreteWidth +
                ((wall.previousWallConcreteWidth - wall.concreteWidth) * Math.SQRT2 +
                  wall.concreteWidth / Constants.ANGLE_ADJUSTMENT_FACTOR))
          );
        }
        break;

      case AdjustmentFormula.FOUR:
        if (
          wall.lowerCorner.corner !== Corner.ONE_HUNDRED_EIGHTY &&
          wall.lowerCorner.corner !== Corner.TJOINT
        ) {
          wall.length -= Math.round(adjustmentFactor * wall.previousWallConcreteWidth);
        } else {
          wall.length -= Math.round(adjustmentFactor * wall.nextWallConcreteWidth);
        }
        break;

      case AdjustmentFormula.FIVE:
        wall.length -= Math.round(
          adjustmentFactor *
            ((wall.previousWallConcreteWidth - wall.concreteWidth) * Math.SQRT2 +
              wall.concreteWidth / Constants.ANGLE_ADJUSTMENT_FACTOR +
              (wall.nextWallConcreteWidth - wall.concreteWidth) * Math.SQRT2 +
              wall.concreteWidth / Constants.ANGLE_ADJUSTMENT_FACTOR)
        );
        break;

      case AdjustmentFormula.SIX:
        if (
          wall.lowerCorner.corner !== Corner.ONE_HUNDRED_EIGHTY &&
          wall.lowerCorner.corner !== Corner.TJOINT
        ) {
          wall.length -= Math.round(
            adjustmentFactor *
              ((wall.previousWallConcreteWidth - wall.concreteWidth) * Math.SQRT2 +
                wall.concreteWidth / Constants.ANGLE_ADJUSTMENT_FACTOR)
          );
        } else {
          wall.length -= Math.round(
            adjustmentFactor *
              ((wall.nextWallConcreteWidth - wall.concreteWidth) * Math.SQRT2 +
                wall.concreteWidth / Constants.ANGLE_ADJUSTMENT_FACTOR)
          );
        }

        break;

      case AdjustmentFormula.SEVEN:
        if (wall.lowerCorner.corner === Corner.INSIDE) {
          wall.length -= wall.previousWallConcreteWidth - wall.nextWallConcreteWidth;
        } else {
          wall.length += wall.previousWallConcreteWidth - wall.nextWallConcreteWidth;
        }
        break;

      case AdjustmentFormula.EIGHT:
        if (wall.lowerCorner.corner === Corner.FORTY_FIVE_OUTSIDE) {
          wall.length += Math.round(
            (wall.previousWallConcreteWidth - wall.concreteWidth) * Math.SQRT2 +
              wall.concreteWidth / Constants.ANGLE_ADJUSTMENT_FACTOR -
              ((wall.nextWallConcreteWidth - wall.concreteWidth) * Math.SQRT2 +
                wall.concreteWidth / Constants.ANGLE_ADJUSTMENT_FACTOR)
          );
        } else {
          wall.length -= Math.round(
            (wall.previousWallConcreteWidth - wall.concreteWidth) * Math.SQRT2 +
              wall.concreteWidth / Constants.ANGLE_ADJUSTMENT_FACTOR -
              ((wall.nextWallConcreteWidth - wall.concreteWidth) * Math.SQRT2 +
                wall.concreteWidth / Constants.ANGLE_ADJUSTMENT_FACTOR)
          );
        }
    }
  }
}

export default Foundation;
