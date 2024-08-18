// React imports
import React, { useState } from "react";

// Constants
import { Constants } from "@/constants";

const useInputState = () => {
  const [height, setHeight] = useState<string>(Constants.DEFAULT_WALL_HEIGHT);
  const [nTJoints, setNTJoints] = useState<string>("");
  const [nElastics, setNElastics] = useState<number>(0);
  const [linearFeet, setLinearFeet] = useState<string>("");
  const [nInsideCorners, setNInsideCorners] = useState<string>("");
  const [nOutsideCorners, setNOutsideCorners] = useState<string>("");
  const [n45InsideCorners, setN45InsideCorners] = useState<string>("");
  const [n45OutsideCorners, setN45OutsideCorners] = useState<string>("");

  return {
    height,
    setHeight,
    nTJoints,
    setNTJoints,
    nElastics,
    setNElastics,
    linearFeet,
    setLinearFeet,
    nInsideCorners,
    setNInsideCorners,
    nOutsideCorners,
    setNOutsideCorners,
    n45InsideCorners,
    setN45InsideCorners,
    n45OutsideCorners,
    setN45OutsideCorners,
  };
};

export default useInputState;
