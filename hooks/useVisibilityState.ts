// React import
import { useState } from "react";

const useVisibilityState = () => {
  const [isResultVisible, setIsResultVisible] = useState<boolean>(false);
  const [isCalculateButtonVisible, setIsCalculateButtonVisible] = useState<boolean>(false);
  const [isTJointButtonVisible, setIsTJointButtonVisible] = useState<boolean>(false);
  const [isSurplusPercentageVisible, setIsSurplusPercentageVisible] = useState<boolean>(false);

  return {
    isResultVisible,
    setIsResultVisible,
    isCalculateButtonVisible,
    setIsCalculateButtonVisible,
    isTJointButtonVisible,
    setIsTJointButtonVisible,
    isSurplusPercentageVisible,
    setIsSurplusPercentageVisible,
  };
};

export default useVisibilityState;
