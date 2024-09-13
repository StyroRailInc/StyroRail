import Wall from "@/screens/build-block/utils/BBCalculator/Wall";

describe("Wall - computeWall method", () => {
  let wall: Wall;

  beforeEach(() => {
    // Create a new Wall instance for each test
    wall = new Wall();
  });

  it("should correctly compute quantities for straight", () => {
    wall.setHeight(112);
    wall.setLength(3276);

    wall.setInsideCorners(10);

    const blockQuantities = wall.computeWall();

    const expectedBlockQuantities = {
      straight: 432,
      ninetyCorner: 70,
      fortyFiveCorner: 0,
      doubleTaperTop: 0,
      brickLedge: 0,
      buck: 0,
    };

    expect(blockQuantities).toEqual(expectedBlockQuantities);
  });

  it("should correctly compute quantities for brickledge", () => {
    wall.setHeight(112);
    wall.setLength(3276);

    wall.setInsideCorners(10);

    wall.setBrickLedgeLength(480);

    const blockQuantities = wall.computeWall();

    const expectedBlockQuantities = {
      straight: 422,
      ninetyCorner: 70,
      fortyFiveCorner: 0,
      doubleTaperTop: 0,
      brickLedge: 10,
      buck: 0,
    };

    expect(blockQuantities).toEqual(expectedBlockQuantities);
  });

  it("should correctly compute quantities for openings", () => {
    wall.setHeight(112);
    wall.setLength(3276);

    wall.setInsideCorners(10);

    wall.setBrickLedgeLength(480);

    wall.setOpenings([
      { height: 60, width: 60, quantity: 2 },
      { height: 24, width: 24, quantity: 6 },
    ]);

    const blockQuantities = wall.computeWall();

    const expectedBlockQuantities = {
      straight: 411,
      ninetyCorner: 70,
      fortyFiveCorner: 0,
      doubleTaperTop: 0,
      brickLedge: 10,
      buck: 21,
    };

    expect(blockQuantities).toEqual(expectedBlockQuantities);
  });
});
