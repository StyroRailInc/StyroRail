// Type
import { FoundationPanels, FloorPanels } from "@/types/generalTypes";
import { SettingsState } from "@/screens/srf-drawer/types/settingsState";
import { FoundationState } from "@/screens/srf-drawer/types/foundationState";

// Enums
import { Panel } from "@/utils/enums";

// Constants
import { Constants } from "@/constants";

// Utility Functions
import { parseIntegerInput } from "@/utils/InputParser";

export const addExtraPanels = (
  panels: FoundationPanels,
  settingsState: SettingsState
): { newPanels: FoundationPanels; percentageIncrease: { current: number } } => {
  const newPanels: FoundationPanels = {};
  const panelIndex = Constants.PANEL_INDEX;

  const roundUpToBundleSize = (totalPanels: number, bundleSize: number): number => {
    const remainder = totalPanels % bundleSize;
    const panelsToAdd = remainder === 0 ? 0 : bundleSize - remainder;
    return totalPanels + panelsToAdd;
  };

  for (let wallHeight of Object.keys(panels)) {
    const panelHeight = parseInt(wallHeight);
    newPanels[panelHeight] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let panelLength of Object.values(Panel)) {
      switch (panelLength) {
        case Panel.TWENTY_FOUR:
          newPanels[panelHeight][panelIndex[panelLength]] = roundUpToBundleSize(
            panels[panelHeight][panelIndex[panelLength]],
            Constants.TWENTY_FOUR_BUNDLE_SIZE
          );
          break;
        case Panel.SIXTEEN:
          newPanels[panelHeight][panelIndex[panelLength]] = roundUpToBundleSize(
            panels[panelHeight][panelIndex[panelLength]],
            Constants.SIXTEEN_BUNDLE_SIZE
          );
          break;
        case Panel.TWELVE:
          newPanels[panelHeight][panelIndex[panelLength]] = roundUpToBundleSize(
            panels[panelHeight][panelIndex[panelLength]],
            Constants.TWELVE_BUNDLE_SIZE
          );
          break;
        case Panel.EIGHT:
          newPanels[panelHeight][panelIndex[panelLength]] = roundUpToBundleSize(
            panels[panelHeight][panelIndex[panelLength]],
            Constants.EIGHT_BUNDLE_SIZE
          );
          break;
        case Panel.SEVEN:
          newPanels[panelHeight][panelIndex[panelLength]] = roundUpToBundleSize(
            panels[panelHeight][panelIndex[panelLength]],
            Constants.SEVEN_BUNDLE_SIZE
          );
          break;
        case Panel.SIX:
          newPanels[panelHeight][panelIndex[panelLength]] = roundUpToBundleSize(
            panels[panelHeight][panelIndex[panelLength]],
            Constants.SIX_BUNDLE_SIZE
          );
          break;
        case Panel.FOUR:
          newPanels[panelHeight][panelIndex[panelLength]] = roundUpToBundleSize(
            panels[panelHeight][panelIndex[panelLength]],
            Constants.FOUR_BUNDLE_SIZE
          );
          break;
        case Panel.THREE:
          newPanels[panelHeight][panelIndex[panelLength]] = roundUpToBundleSize(
            panels[panelHeight][panelIndex[panelLength]],
            Constants.THREE_BUNDLE_SIZE
          );
          break;
        case Panel.TWO:
          newPanels[panelHeight][panelIndex[panelLength]] = roundUpToBundleSize(
            panels[panelHeight][panelIndex[panelLength]],
            Constants.TWO_BUNDLE_SIZE
          );
          break;
        case Panel.BIG_45:
          newPanels[panelHeight][panelIndex[panelLength]] =
            panels[panelHeight][panelIndex[panelLength]];
          break;
        case Panel.SMALL_45:
          newPanels[panelHeight][panelIndex[panelLength]] =
            panels[panelHeight][panelIndex[panelLength]];
        default:
          break;
      }
    }
  }

  const percentageIncrease = { current: 0 };

  calculateAndAdjustExtraPanelsPercentage(panels, newPanels, percentageIncrease, settingsState);

  return { newPanels: newPanels, percentageIncrease: percentageIncrease };
};

const calculateAndAdjustExtraPanelsPercentage = (
  panels: FoundationPanels,
  newPanels: FoundationPanels,
  percentageIncrease: { current: number },
  settingsState: SettingsState
): void => {
  // Extract numeric values from the Panel enum
  const panelLengths: number[] = Object.values(Panel).filter((value) => typeof value === "number");

  const calculatePanelsLength = (panels: FoundationPanels): number => {
    let totalLength = 0;
    for (const height of Object.keys(panels)) {
      const panelHeight = parseInt(height);
      totalLength += panels[panelHeight].reduce(
        (acc, length, index) => acc + length * panelLengths[index],
        0
      );
    }
    return totalLength;
  };

  const existingPanelsLength = calculatePanelsLength(panels);
  const newPanelsLength = calculatePanelsLength(newPanels);

  percentageIncrease.current =
    ((newPanelsLength - existingPanelsLength) / existingPanelsLength) * 100;

  try {
    const minimumPercentageIncrease = parseIntegerInput(settingsState.percentageExtraMin);
    if (percentageIncrease.current < minimumPercentageIncrease) {
      const requiredExtraPercentage = minimumPercentageIncrease - percentageIncrease.current;
      const extraLengthRequired = (requiredExtraPercentage * existingPanelsLength) / 100;
      computeMissingPanels(
        panels,
        newPanels,
        extraLengthRequired,
        percentageIncrease,
        settingsState
      );
    } else {
    }
  } catch (error) {}
};

const computeMissingPanels = (
  panels: FoundationPanels,
  newPanels: Record<number, number[]>,
  extraFeetToAdd: number,
  percentageIncrease: { current: number },
  settingsState: SettingsState
): void => {
  const findTallestFoundationWall = (panels: FoundationPanels): number => {
    const wallHeights = Object.keys(panels).map((wallHeight) => parseInt(wallHeight));
    return Math.max(...wallHeights);
  };

  const tallestFoundationWall = findTallestFoundationWall(newPanels);

  // Sort panelTypes in descending order
  const sortedPanelTypes = [
    ...Object.values(Panel).filter((panel) => typeof panel === "number"),
  ].sort((a, b) => a - b);

  let n2Bundles = 0;
  let n3Bundles = 0;
  if (newPanels[tallestFoundationWall][Constants.PANEL_INDEX[Panel.TWO]] !== 0) {
    ++n2Bundles;
  }
  if (newPanels[tallestFoundationWall][Constants.PANEL_INDEX[Panel.THREE]] !== 0) {
    ++n3Bundles;
  }

  while (extraFeetToAdd > 0) {
    for (let panel of sortedPanelTypes) {
      if (extraFeetToAdd < 0) {
        break;
      }
      switch (panel) {
        case Panel.TWO:
          if (n2Bundles < 1) {
            newPanels[tallestFoundationWall][Constants.PANEL_INDEX[panel]] +=
              Constants.TWO_BUNDLE_SIZE;
            extraFeetToAdd -= Constants.TWO_BUNDLE_SIZE * Constants.TWO_PANEL_LENGTH;
            ++n2Bundles;
          }
          break;
        case Panel.THREE:
          if (n3Bundles < 1) {
            newPanels[tallestFoundationWall][Constants.PANEL_INDEX[panel]] +=
              Constants.THREE_BUNDLE_SIZE;
            extraFeetToAdd -= Constants.THREE_BUNDLE_SIZE * Constants.THREE_PANEL_LENGTH;
            ++n3Bundles;
          }
          break;
        case Panel.FOUR:
          newPanels[tallestFoundationWall][Constants.PANEL_INDEX[panel]] +=
            Constants.FOUR_BUNDLE_SIZE;
          extraFeetToAdd -= Constants.FOUR_BUNDLE_SIZE * Constants.FOUR_PANEL_LENGTH;
          break;
        case Panel.SIX:
          newPanels[tallestFoundationWall][Constants.PANEL_INDEX[panel]] +=
            Constants.SIX_BUNDLE_SIZE;
          extraFeetToAdd -= Constants.SIX_BUNDLE_SIZE * Constants.SIX_PANEL_LENGTH;
          break;
        case Panel.SEVEN:
          newPanels[tallestFoundationWall][Constants.PANEL_INDEX[panel]] +=
            Constants.SEVEN_BUNDLE_SIZE;
          extraFeetToAdd -= Constants.SEVEN_BUNDLE_SIZE * Constants.SEVEN_PANEL_LENGTH;
          break;
        case Panel.EIGHT:
          newPanels[tallestFoundationWall][Constants.PANEL_INDEX[panel]] +=
            Constants.EIGHT_BUNDLE_SIZE;
          extraFeetToAdd -= Constants.EIGHT_BUNDLE_SIZE * Constants.EIGHT_PANEL_LENGTHL;
          break;
        case Panel.TWELVE:
          newPanels[tallestFoundationWall][Constants.PANEL_INDEX[panel]] +=
            Constants.TWELVE_BUNDLE_SIZE;
          extraFeetToAdd -= Constants.TWELVE_BUNDLE_SIZE * Constants.TWELVE_PANEL_LENGTH;
          break;
        case Panel.SIXTEEN:
          newPanels[tallestFoundationWall][Constants.PANEL_INDEX[panel]] +=
            Constants.SIXTEEN_BUNDLE_SIZE;
          extraFeetToAdd -= Constants.SIXTEEN_BUNDLE_SIZE * Constants.SIXTEEN_PANEL_LENGTH;
          break;
      }
    }
  }
  calculateAndAdjustExtraPanelsPercentage(panels, newPanels, percentageIncrease, settingsState);
};

export const computePanelResults = (foundationState: FoundationState): FoundationPanels => {
  let panels: FoundationPanels = {};

  const updatePanels = (foundations: typeof foundationState.foundations) => {
    for (let foundation of foundations) {
      if (foundation) {
        if (Object.keys(foundation.panels).length === 0) {
          try {
            foundation.computeFoundation();
          } catch (error) {
            console.log(error);
          }
        }
        for (let height in foundation.panels) {
          const panelHeight = parseInt(height);
          if (!panels[panelHeight]) {
            panels[panelHeight] = [...foundation.panels[panelHeight]];
          } else {
            foundation.panels[panelHeight].forEach((panel: number, index: number) => {
              panels[panelHeight][index] += panel;
            });
          }
        }
      }
    }
  };

  updatePanels(foundationState.foundations);

  return panels;
};

export const computeFloorPanelResults = (foundationState: FoundationState): FloorPanels => {
  const panels: FloorPanels = { "SR.P 200": 0, Hydropex: 0, Aucun: 0 };

  const updatePanels = (foundations: typeof foundationState.foundations) => {
    for (let foundation of foundations) {
      if (foundation?.floorType !== undefined) {
        if (foundation?.floor?.nPanels !== undefined) {
          panels[foundation?.floorType] += foundation?.floor?.nPanels;
        }
      }
    }
  };

  updatePanels(foundationState.foundations);

  return panels;
};

export const computeNElastics = (foundationState: FoundationState) => {
  let nCorners: number = 0;

  for (let foundation of foundationState.foundations) {
    if (foundation) {
      nCorners += foundation.nCorners;
    }
  }

  return Math.ceil(nCorners / Constants.N_ELASTICS_PER_CORNER);
};
