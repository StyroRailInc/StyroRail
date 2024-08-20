// React imports
import { useState, useRef } from "react";

// Types
import { TJoints, TJointAngles, FoundationPanels, FloorPanels } from "@/types/generalTypes";

// Class
import Foundation from "@/screens/srf-drawer/utils/SR.FCalculator/Foundation";

const useFoundationState = () => {
  // Inputs
  const [wallLengths, setWallLengths] = useState<number[]>([]);
  const [wallHeights, setWallHeights] = useState<number[]>([]);
  const [concreteWidths, setConcreteWidths] = useState<number[]>([]);
  const [angles, setAngles] = useState<number[]>([]);
  const [tJoints, setTJoints] = useState<TJoints>({});
  const [tJointAngles, setTJointAngles] = useState<TJointAngles>({});
  const nTJoints = useRef(0);
  const [setNTjoints, NTJoints] = useState(0);

  // States
  const [wallRowPressedIndex, setWallRowPressedIndex] = useState<number | null>(null);
  const [roomPressedIndex, setRoomPressedIndex] = useState<number>(0);
  const previousRoomPressedIndex = useRef<number>(0);
  const [isRoomChange, setIsRoomChange] = useState<boolean>(true);
  const [isEulerPath, setIsEulerPath] = useState<boolean>(false);

  // Results
  const [foundations, setFoundations] = useState<(Foundation | null)[]>([null]);
  const [panelResults, setPanelResults] = useState<FoundationPanels>({});
  const [floorPanelResults, setFloorPanelResults] = useState<FloorPanels>();
  const [nElastics, setNElastics] = useState<number>(0);
  const totalLinearFeet = useRef<Record<number, string>>({});
  const percentageIncrease = useRef<number>(0);

  return {
    wallLengths,
    setWallLengths,
    wallHeights,
    setWallHeights,
    concreteWidths,
    setConcreteWidths,
    angles,
    setAngles,
    wallRowPressedIndex,
    setWallRowPressedIndex,
    roomPressedIndex,
    setRoomPressedIndex,
    previousRoomPressedIndex,
    isRoomChange,
    setIsRoomChange,
    isEulerPath,
    setIsEulerPath,
    tJoints,
    setTJoints,
    tJointAngles,
    setTJointAngles,
    nTJoints,
    setNTjoints,
    NTJoints,
    foundations,
    setFoundations,
    panelResults,
    setPanelResults,
    floorPanelResults,
    setFloorPanelResults,
    nElastics,
    setNElastics,
    totalLinearFeet,
    percentageIncrease,
  };
};

export default useFoundationState;
