// React imports
import { SetStateAction } from "react";

// Types
import { VisibilityState } from "@/types/visibilityState";
import { Heights } from "@/types/generalTypes";

export const removeHeights = (
  visibilityState: VisibilityState,
  height: number,
  heights: Heights,
  setHeights: React.Dispatch<SetStateAction<Heights>>,
  setHeightRowPressedIndex: React.Dispatch<SetStateAction<number | null>>
): void => {
  const updatedHeights = { ...heights };
  delete updatedHeights[height];

  if (Object.keys(updatedHeights).length === 0) {
    visibilityState.setIsCalculateButtonVisible(false);
  } else {
    visibilityState.setIsCalculateButtonVisible(true);
  }
  setHeights(updatedHeights);
  setHeightRowPressedIndex(null);
  visibilityState.setIsResultVisible(false);
};
