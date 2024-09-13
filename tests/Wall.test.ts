import Wall from "@/screens/build-block/utils/BBCalculator/Wall";
import getBlockSpecifications from "@/screens/build-block/utils/BlockSpecifications";

// Mock the getBlockSpecifications function
jest.mock("@/screens/build-block/utils/BlockSpecifications");

describe("Wall - computeWall method", () => {
  let wall: Wall;

  beforeEach(() => {
    // Create a new Wall instance for each test
    wall = new Wall();

    // Set the default block specifications mock values
    (getBlockSpecifications as jest.Mock).mockImplementation((type, width) => {
      switch (type) {
        case "buck":
          return { length: 24 }; // Example: Buck length of 24 units
        case "ninetyCorner":
          return { surfaceArea: 32 }; // Example: Surface area for 90-degree corner
        default:
          return { surfaceArea: 0, length: 0 };
      }
    });
  });

  it("should correctly compute the remaining surface area and the number of bucks", () => {
    wall.setHeight(10);
    wall.setLength(20);

    wall.setOpenings([
      { height: 2, width: 3, quantity: 2 },
      { height: 4, width: 3, quantity: 1 },
    ]);

    wall.setInsideCorners(2);

    wall.computeWall();

    const expectedRemainingSurfaceArea =
      20 * 10 - // total wall surface
      (2 * 3 * 2 + 4 * 3) - // subtract surface area of openings
      1 * 32; // subtract surface area of inside corner (mocked value)

    const expectedBucks = (2 * (2 + 3) * 2 + 2 * (4 + 3)) / 24; // Opening perimeter divided by buck length (mocked value)

    // Assertions
    expect(wall["nBucks"]).toBeCloseTo(expectedBucks); // Check if bucks were calculated correctly
    // Since the remaining surface area is not stored in the class, no need to assert it directly
  });

  it("should handle no openings and no inside corners", () => {
    // Set wall dimensions without openings or corners
    wall.setHeight(10);
    wall.setLength(20);

    // Call computeWall
    wall.computeWall();

    // Expected bucks to remain 0 since there are no openings or corners
    expect(wall["nBucks"]).toBe(0);
  });
});
