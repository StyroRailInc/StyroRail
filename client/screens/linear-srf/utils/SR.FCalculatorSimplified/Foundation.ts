// Enum
import { Corner, CornerLength, FoamWidth, Panel } from "@/utils/enums";
import CornerSpecifications from "@/utils/CornerSpecifications";

// Types
import { FoundationPanels, PanelPosition } from "@/types/generalTypes";
import { Heights } from "@/types/generalTypes";

// Constants
import { Constants } from "@/constants";

// Utility functions
import { linearModelCorners, linearModelNoCorners } from "./LinearModels";

class FoundationSimplified {
  foamWidth: FoamWidth;
  cornerLength: CornerLength;
  fillersPercentage: number;
  chooseFillersPercentage: boolean;
  nTotalCorners: number = 0;
  heights: Record<
    number,
    {
      nCorners: number;
      linearInches: number;
      cornerSpecifications: CornerSpecifications[];
    }
  > = {};

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

  panelTypes = [
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

  constructor(
    heights: Heights, // [linearInches, nInside, nOutside, n45Inside, n45Outside, nTJoints]
    foamWidth: FoamWidth,
    cornerLength: CornerLength,
    fillersPercentage: number,
    chooseFillersPercentage: boolean
  ) {
    this.foamWidth = foamWidth;
    this.cornerLength = cornerLength;
    this.fillersPercentage = fillersPercentage;
    this.chooseFillersPercentage = chooseFillersPercentage;

    for (let key of Object.keys(heights)) {
      const cornerSpecifications: CornerSpecifications[] = [];
      const height = parseInt(key);
      const linearInches = heights[height][0];

      // Add inside corners
      for (let i = 0; i < heights[height][Constants.CORNER_INDEX[Corner.INSIDE]]; i++) {
        cornerSpecifications.push(new CornerSpecifications(foamWidth, cornerLength, Corner.INSIDE));
      }

      // Add outside corners
      for (let i = 0; i < heights[height][Constants.CORNER_INDEX[Corner.OUTSIDE]]; i++) {
        cornerSpecifications.push(
          new CornerSpecifications(foamWidth, cornerLength, Corner.OUTSIDE)
        );
      }

      // Add 45-degree inside corners
      for (let i = 0; i < heights[height][Constants.CORNER_INDEX[Corner.FORTY_FIVE_INSIDE]]; i++) {
        cornerSpecifications.push(
          new CornerSpecifications(foamWidth, cornerLength, Corner.FORTY_FIVE_INSIDE)
        );
      }

      // Add 45-degree outside corners
      for (let i = 0; i < heights[height][Constants.CORNER_INDEX[Corner.FORTY_FIVE_OUTSIDE]]; i++) {
        cornerSpecifications.push(
          new CornerSpecifications(foamWidth, cornerLength, Corner.FORTY_FIVE_OUTSIDE)
        );
      }

      // Add T-joints
      for (let i = 0; i < heights[height][Constants.CORNER_INDEX[Corner.TJOINT]]; i++) {
        cornerSpecifications.push(new CornerSpecifications(foamWidth, cornerLength, Corner.TJOINT));
      }

      this.heights[height] = {
        nCorners: cornerSpecifications.length,
        linearInches: linearInches,
        cornerSpecifications: cornerSpecifications,
      };
      this.nTotalCorners += cornerSpecifications.length;
    }
  }

  // Function to calculate fillersLinearInches based on fillers percentage
  calculateFillersLinearInches(initialLinearInches: number, fillersPercentage: number) {
    return (initialLinearInches * fillersPercentage) / 100;
  }

  // Function to calculate fillersLinearInches using the quadratic model for corners
  calculateFillersForCorners(nCorners: number, linearInches: number) {
    return Math.round(
      linearModelCorners(nCorners, linearInches, Constants.a, Constants.b, Constants.c)
    );
  }

  // Function to calculate fillersLinearInches using the quadratic model without corners
  calculateFillersForNoCorners(linearInches: number) {
    const fillers = linearModelNoCorners(linearInches, Constants.a2, Constants.b2);
    const maxAllowedFillers = linearInches * 0.25;
    return Math.min(fillers, maxAllowedFillers);
  }

  // Main function to determine the correct fillersLinearInches
  getFillersLinearInches(
    initialLinearInches: number,
    nCorners: number,
    fillersPercentage: number,
    chooseFillersPercentage: boolean
  ) {
    let fillersLinearInches = this.calculateFillersLinearInches(
      initialLinearInches,
      fillersPercentage
    );

    if (nCorners > 0 && !chooseFillersPercentage) {
      fillersLinearInches = this.calculateFillersForCorners(nCorners, initialLinearInches);
    } else if (nCorners === 0 && !chooseFillersPercentage) {
      fillersLinearInches = this.calculateFillersForNoCorners(initialLinearInches);
    }

    return fillersLinearInches;
  }

  computeFoundation() {
    for (let key of Object.keys(this.heights)) {
      const height = parseInt(key);
      const initialLinearInches = this.heights[height].linearInches;
      const nCorners = this.heights[height].nCorners;
      let fillersLinearInches = this.getFillersLinearInches(
        initialLinearInches,
        nCorners,
        this.fillersPercentage,
        this.chooseFillersPercentage
      );
      this.panels[height] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let cornerSpecification of this.heights[height].cornerSpecifications) {
        this.heights[height].linearInches -=
          (cornerSpecification.upperPanel?.reduce((acc, panel) => acc + panel, 0) ?? 0) * 2;

        if (cornerSpecification.upperPanel) {
          for (const panel of cornerSpecification.upperPanel) {
            ++this.panels[height][this.panelPosition[panel]];
          }
        }

        if (cornerSpecification.lowerPanel) {
          for (const panel of cornerSpecification.lowerPanel) {
            ++this.panels[height][this.panelPosition[panel]];
          }
        }
      }

      let remainingLength = this.heights[height].linearInches;

      for (const panel of this.panelTypes) {
        const numPanels = Math.floor(remainingLength / panel);
        this.panels[height][this.panelPosition[panel]] += numPanels;
        remainingLength %= panel;
        // Adjust for remainder if it's 1
        if (remainingLength === 1) {
          --this.panels[height][this.panelPosition[panel]];
          remainingLength += panel;
        }
      }

      const linearInchesAfterAdjustments = initialLinearInches - this.heights[height].linearInches;
      fillersLinearInches -= linearInchesAfterAdjustments;
      this.computeFillers(fillersLinearInches, height);
    }
  }

  computeFillers(fillersLinearInches: number, height: number) {
    const nTwentyFourToRemove = Math.floor(fillersLinearInches / 24);
    this.panels[height][this.panelPosition[Panel.TWENTY_FOUR]] -= nTwentyFourToRemove;

    let n2Bundles = 0;
    let n3Bundles = 0;
    if (this.panels[height][this.panelPosition[Panel.TWO]] >= Constants.TWO_BUNDLE_SIZE) {
      ++n2Bundles;
    }
    if (this.panels[height][this.panelPosition[Panel.THREE]] !== 0) {
      ++n3Bundles;
    }

    // Sort panelTypes in descending order
    const sortedPanelTypes = [...this.panelTypes].sort((a, b) => a - b);

    while (fillersLinearInches > 0) {
      for (let panel of sortedPanelTypes) {
        if (fillersLinearInches < 0) {
          break;
        }
        switch (panel) {
          case Panel.TWO:
            if (n2Bundles < 1) {
              this.panels[height][this.panelPosition[panel]] += Constants.TWO_BUNDLE_SIZE;
              fillersLinearInches -= Constants.TWO_BUNDLE_SIZE * Constants.TWO_PANEL_LENGTH;
              ++n2Bundles;
            }
            break;
          case Panel.THREE:
            if (n3Bundles < 1) {
              this.panels[height][this.panelPosition[panel]] += Constants.THREE_BUNDLE_SIZE;
              fillersLinearInches -= Constants.THREE_BUNDLE_SIZE * Constants.THREE_PANEL_LENGTH;
              ++n3Bundles;
            }
            break;
          case Panel.FOUR:
            this.panels[height][this.panelPosition[panel]] += Constants.FOUR_BUNDLE_SIZE;
            fillersLinearInches -= Constants.FOUR_BUNDLE_SIZE * Constants.FOUR_PANEL_LENGTH;
            break;
          case Panel.SIX:
            this.panels[height][this.panelPosition[panel]] += Constants.SIX_BUNDLE_SIZE;
            fillersLinearInches -= Constants.SIX_BUNDLE_SIZE * Constants.SIX_PANEL_LENGTH;
            break;
          case Panel.SEVEN:
            this.panels[height][this.panelPosition[panel]] += Constants.SEVEN_BUNDLE_SIZE;
            fillersLinearInches -= Constants.SEVEN_BUNDLE_SIZE * Constants.SEVEN_PANEL_LENGTH;
            break;
          case Panel.EIGHT:
            this.panels[height][this.panelPosition[panel]] += Constants.EIGHT_BUNDLE_SIZE;
            fillersLinearInches -= Constants.EIGHT_BUNDLE_SIZE * Constants.EIGHT_PANEL_LENGTHL;
            break;
          case Panel.TWELVE:
            this.panels[height][this.panelPosition[panel]] += Constants.TWELVE_BUNDLE_SIZE;
            fillersLinearInches -= Constants.TWELVE_BUNDLE_SIZE * Constants.TWELVE_PANEL_LENGTH;
            break;
          case Panel.SIXTEEN:
            this.panels[height][this.panelPosition[panel]] += Constants.SIXTEEN_BUNDLE_SIZE;
            fillersLinearInches -= Constants.SIXTEEN_BUNDLE_SIZE * Constants.SIXTEEN_PANEL_LENGTH;
            break;
        }
      }
    }
  }
}

export default FoundationSimplified;
