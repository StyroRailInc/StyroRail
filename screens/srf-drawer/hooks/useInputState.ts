// React import
import { useRef, useState } from "react";

// Type
import { SettingsState } from "@/screens/srf-drawer/types/settingsState";

interface useInputStateProps {
  settingsState: SettingsState;
}

const useInputState = (props: useInputStateProps) => {
  const [wallLengthInput, setWallLengthInput] = useState(`12'-5"`);
  const [concreteWidthInput, setConcreteWidthInput] = useState<string>(
    props.settingsState.defaultConcreteWidth
  );
  const [wallHeightInput, setWallHeightInput] = useState<string>(
    props.settingsState.defaultWallHeight
  );
  const [angleInput, setAngleInput] = useState<number>(0);
  const [previousAngle, setPreviousAngle] = useState<number>(0);
  const [isFirstWall, setIsFirstWall] = useState<boolean>(true);

  const [isTJoint, setIsTJoint] = useState<boolean>(false);
  const [previousCornerIsTJoint, setPreviousCornerIsTJoint] = useState<boolean>(false);
  const previousTJointAngle = useRef<number>(0);

  return {
    wallLengthInput,
    setWallLengthInput,
    concreteWidthInput,
    setConcreteWidthInput,
    wallHeightInput,
    setWallHeightInput,
    angleInput,
    setAngleInput,
    previousAngle,
    setPreviousAngle,
    isFirstWall,
    setIsFirstWall,
    isTJoint,
    setIsTJoint,
    previousCornerIsTJoint,
    setPreviousCornerIsTJoint,
    previousTJointAngle,
  };
};

export default useInputState;
