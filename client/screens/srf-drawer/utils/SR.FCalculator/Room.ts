// Type
import { TJoints } from "@/types/generalTypes";
import { TJointAngles } from "@/types/generalTypes";

// Enum
import { FoamWidth, CornerLength, InsulationArea, FloorType } from "@/utils/enums";

class Room {
  wallLengths: number[];
  concreteWidths: number[];
  wallHeights: number[];
  angles: number[];

  tJoints: TJoints;
  tJointAngles: TJointAngles;
  nTJoints: number;

  foamWidth: FoamWidth;
  cornerLength: CornerLength;
  insulationArea: InsulationArea;
  floortType: FloorType;

  constructor(
    wallLengths: number[],
    concreteWidths: number[],
    wallHeights: number[],
    angles: number[],
    tJoints: TJoints,
    tJointAngles: TJointAngles,
    nTJoints: number,
    foamWidth: FoamWidth,
    cornerLength: CornerLength,
    insulationArea: InsulationArea,
    floortType: FloorType
  ) {
    this.wallLengths = wallLengths;
    this.concreteWidths = concreteWidths;
    this.wallHeights = wallHeights;
    this.angles = angles;
    this.tJoints = tJoints;
    this.tJointAngles = tJointAngles;
    this.nTJoints = nTJoints;
    this.foamWidth = foamWidth;
    this.cornerLength = cornerLength;
    this.insulationArea = insulationArea;
    this.floortType = floortType;
  }
}

export default Room;
