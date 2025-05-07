import Corners from "@/screens/build-block/utils/BBCalculator/Corners";
import Dimensions from "@/screens/build-block/utils/BBCalculator/Dimensions";
import Opening from "@/screens/build-block/utils/BBCalculator/Opening";
import SpecialBlocks from "@/screens/build-block/utils/BBCalculator/SpecialBlocks";
import Wall from "@/screens/build-block/utils/BBCalculator/Wall";
import House from "@/screens/build-block/utils/BBCalculator/House";

describe("Wall - computeWall method", () => {
  let wall: Wall;
  let dimensions: Dimensions;
  let corners: Corners;
  let specialBlocks: SpecialBlocks;
  let openings: Opening[];
  let house: House;

  beforeEach(() => {
    // Create a new Wall instance for each test
  });

  it("should correctly compute quantities for straight", () => {
    dimensions = new Dimensions(112, 3276, '8"');
    corners = new Corners(10, 0, 0, 0, '8"');
    specialBlocks = new SpecialBlocks(0, 0, 0, '8"');
    openings = [];
    wall = new Wall(dimensions, corners, specialBlocks, openings);

    const blockQuantities = wall.computeWall();

    const expectedBlockQuantities = {
      straight: 432,
      ninetyCorner: 70,
      fortyFiveCorner: 0,
      doubleTaperTop: 0,
      brickLedge: 0,
      buck: 0,
    };

    expect(blockQuantities.blockQuantities).toEqual(expectedBlockQuantities);
  });

  it("should correctly compute quantities for brickledge", () => {
    dimensions = new Dimensions(112, 3276, '8"');
    corners = new Corners(10, 0, 0, 0, '8"');
    specialBlocks = new SpecialBlocks(0, 480, 0, '8"');
    openings = [];
    wall = new Wall(dimensions, corners, specialBlocks, openings);

    const blockQuantities = wall.computeWall();

    const expectedBlockQuantities = {
      straight: 422,
      ninetyCorner: 70,
      fortyFiveCorner: 0,
      doubleTaperTop: 0,
      brickLedge: 10,
      buck: 0,
    };

    expect(blockQuantities.blockQuantities).toEqual(expectedBlockQuantities);
  });

  it("should correctly compute quantities for openings", () => {
    dimensions = new Dimensions(112, 3276, '8"');
    corners = new Corners(10, 0, 0, 0, '8"');
    specialBlocks = new SpecialBlocks(0, 480, 0, '8"');
    openings = [new Opening(60, 60, 2), new Opening(24, 24, 6)];
    wall = new Wall(dimensions, corners, specialBlocks, openings);

    const blockQuantities = wall.computeWall();

    const expectedBlockQuantities = {
      straight: 411,
      ninetyCorner: 70,
      fortyFiveCorner: 0,
      doubleTaperTop: 0,
      brickLedge: 10,
      buck: 21,
    };

    expect(blockQuantities.blockQuantities).toEqual(expectedBlockQuantities);
  });

  it("should correctly compute quantities for a full house", () => {
    dimensions = new Dimensions(112, 3276, '8"');
    corners = new Corners(10, 0, 0, 0, '8"');
    specialBlocks = new SpecialBlocks(0, 0, 0, '8"');
    openings = [];
    wall = new Wall(dimensions, corners, specialBlocks, openings);
    house = new House([wall]);

    house.computeHouse();

    const blockQuantities = house.getBlockQuantities();

    const expectedBlockQuantities = {
      straight: 432,
      ninetyCorner: 70,
      fortyFiveCorner: 0,
      doubleTaperTop: 0,
      brickLedge: 0,
      buck: 0,
    };

    expect(dimensions.getSurfaceArea()).toEqual(366912);
    expect(blockQuantities['8"']).toEqual(expectedBlockQuantities);
  });
});
