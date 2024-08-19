// Types
import { FoundationPanels } from "@/types/generalTypes";
import { Panel } from "@/utils/enums";

// Utility functions
import { inchesToFeet } from "@/utils/InputParser";

export const computeTotalLinearFeetPerHeight = (
  panels: FoundationPanels
): Record<number, string> => {
  const totalLinearFeet: Record<number, string> = {};

  for (const panelHeight in panels) {
    const height = Number(panelHeight);
    const quantities = panels[height];
    const totalFeet = quantities.reduce((acc, quantity, index) => {
      const panelLength = Object.values(Panel).filter((length) => typeof length === "number")[
        index
      ];
      return acc + quantity * panelLength;
    }, 0);

    totalLinearFeet[height] = inchesToFeet(totalFeet);
  }

  return totalLinearFeet;
};
