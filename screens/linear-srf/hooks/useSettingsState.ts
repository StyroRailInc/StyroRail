// React import
import { useState } from "react";

// Enums
import { FoamWidth, CornerLength, InsulationArea } from "@/utils/enums";

// Constants
import { Constants } from "@/constants";

const useSettingsState = () => {
  const [foamWidth, setFoamWidth] = useState<FoamWidth>(FoamWidth.THREE);
  const [cornerLength, setCornerLength] = useState<CornerLength>(CornerLength.FOUR);
  const [insulationArea, setInsulationArea] = useState<InsulationArea>(InsulationArea.INSIDE);
  const [fillersPercentage, setFillersPercentage] = useState<string>(Constants.FILLERS_PERCENTAGE);
  const [chooseFillersPercentage, setChooseFillersPercentage] = useState<boolean>(false);
  const [percentageExtraMin, setPercentageExtraMin] = useState<string>(
    Constants.PERCENTAGE_EXTRA_MIN
  );
  const [choosePercentageExtraMin, setChoosePercentageExtraMin] = useState<boolean>(true);

  return {
    foamWidth,
    setFoamWidth,
    cornerLength,
    setCornerLength,
    insulationArea,
    setInsulationArea,
    fillersPercentage,
    setFillersPercentage,
    chooseFillersPercentage,
    setChooseFillersPercentage,
    percentageExtraMin,
    setPercentageExtraMin,
    choosePercentageExtraMin,
    setChoosePercentageExtraMin,
  };
};

export default useSettingsState;
