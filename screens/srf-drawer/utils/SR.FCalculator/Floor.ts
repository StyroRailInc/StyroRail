// Enum
import { Corner, FloorType } from "@/utils/enums";

// Type
import { Vertex } from "@/types/generalTypes";

// Constants
import { Constants } from "@/constants";

class Floor {
  type: FloorType;
  wallLengths: number[];
  corners: Corner[];
  vertices: Vertex[] = [{ x: 0, y: 0 }]; // Always start at origin
  surface: number = 0;
  nPanels: number = 0;
  nBundles: number = 0;

  constructor(wallLengths: number[], corners: Corner[], type: FloorType) {
    this.type = type;
    this.wallLengths = wallLengths;
    this.corners = corners;
  }

  toRadians(angle: number): number {
    return angle * (Math.PI / 180);
  }

  private computeDirection(currentDirection: number, cornerType: Corner): number {
    switch (cornerType) {
      case Corner.INSIDE:
        return (currentDirection + 90) % 360;
      case Corner.OUTSIDE:
        return (currentDirection - 90) % 360;
      case Corner.FORTY_FIVE_INSIDE:
        return (currentDirection + 45) % 360;
      case Corner.FORTY_FIVE_OUTSIDE:
        return (currentDirection - 45) % 360;
      case Corner.ONE_HUNDRED_EIGHTY:
        return currentDirection; // No change in direction for a flat angle
      default:
        throw new Error("Unknown corner type");
    }
  }

  private computeVertices(): void {
    let currentDirection = 0; // Initial direction is along the positive x-axis

    for (let i = 0; i < this.corners.length; i++) {
      const length = this.wallLengths[i];
      const corner = this.corners[i];

      // Compute the new vertex based on current direction and length
      const lastVertex = this.vertices[this.vertices.length - 1];
      const newX = lastVertex.x + length * Math.cos(this.toRadians(currentDirection));
      const newY = lastVertex.y + length * Math.sin(this.toRadians(currentDirection));

      this.vertices.push({ x: newX, y: newY });

      // Update the direction based on the corner type
      currentDirection = this.computeDirection(currentDirection, corner);
    }

    // Add the final segment length (0, 0) because Euler Path
    this.vertices.push({ x: 0, y: 0 });
  }

  // Gauss's Shoelace formula to compute simple polygons surfaces
  private computeSurface() {
    let sum: number = 0;
    for (let i = 0; i < this.vertices.length - 1; i++) {
      sum +=
        this.vertices[i].x * this.vertices[i + 1].y - this.vertices[i + 1].x * this.vertices[i].y;
    }
    this.surface = Math.round(0.5 * sum);
  }

  computeSRP200Panels() {
    this.computeVertices();
    this.computeSurface();
    this.nPanels = Math.ceil(this.surface / Constants.PANEL_SURFACE_INCHES);

    const panelsToBundlesRemainder: number = this.nPanels % Constants.N_PANELS_PER_SRP_BUNDLE;
    if (panelsToBundlesRemainder) {
      this.nBundles = Math.floor(this.nPanels / Constants.N_PANELS_PER_SRP_BUNDLE) + 1;
    } else {
      this.nBundles = this.nPanels / Constants.N_PANELS_PER_SRP_BUNDLE;
    }
  }

  computeHydropex200Panels() {
    this.computeVertices();
    this.computeSurface();
    this.nPanels = Math.ceil(this.surface / Constants.PANEL_SURFACE_INCHES);

    const panelsToBundlesRemainder: number = this.nPanels % Constants.N_PANELS_PER_HYDROPEX_BUNDLE;
    if (panelsToBundlesRemainder) {
      this.nBundles = Math.floor(this.nPanels / Constants.N_PANELS_PER_HYDROPEX_BUNDLE) + 1;
    } else {
      this.nBundles = this.nPanels / Constants.N_PANELS_PER_HYDROPEX_BUNDLE;
    }
  }

  computePanels() {
    switch (this.type) {
      case FloorType.SRP200:
        this.computeSRP200Panels();
        break;

      case FloorType.HYDROPEX:
        this.computeHydropex200Panels();
        break;

      default:
        break;
    }
  }
}

export default Floor;
