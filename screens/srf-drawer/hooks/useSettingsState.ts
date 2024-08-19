// React imports
import { useState } from "react";

// Enums
import { FoamWidth, CornerLength, InsulationArea, FloorType } from "@/utils/enums";

// Constants
import { Constants } from "@/constants";

const useSettingsState = () => {
  const [foamWidth, setFoamWidth] = useState<FoamWidth>(FoamWidth.THREE);
  const [defaultWallHeight, setDefaultWallHeight] = useState<string>(Constants.DEFAULT_WALL_HEIGHT);
  const [cornerLength, setCornerLength] = useState<CornerLength>(CornerLength.FOUR);
  const [floorType, setFloorType] = useState<FloorType>(FloorType.NONE);
  const [insulationArea, setInsulationArea] = useState<InsulationArea>(InsulationArea.INSIDE);
  const [defaultConcreteWidth, setDefaultConcreteWidth] = useState<string>(
    Constants.DEFAULT_CONCRETE_WIDTH
  );
  const [addExtraPanels, setAddExtraPanels] = useState<boolean>(true);
  const [percentageExtraMin, setPercentageExtraMin] = useState<string>(
    Constants.PERCENTAGE_EXTRA_MIN
  );

  return {
    foamWidth,
    setFoamWidth,
    defaultWallHeight,
    setDefaultWallHeight,
    cornerLength,
    setCornerLength,
    floorType,
    setFloorType,
    insulationArea,
    setInsulationArea,
    defaultConcreteWidth,
    setDefaultConcreteWidth,
    addExtraPanels,
    setAddExtraPanels,
    percentageExtraMin,
    setPercentageExtraMin,
  };
};

export default useSettingsState;
