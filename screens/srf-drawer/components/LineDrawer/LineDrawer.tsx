// React and React Native imports
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { Line, Circle, G } from "react-native-svg";
import { Constants } from "@/constants";

// Types
import { InputState } from "@/screens/srf-drawer/types/inputState";
import { FoundationState } from "@/screens/srf-drawer/types/foundationState";

// Custom hooks
import useWindowDimensions from "@/hooks/useWindowDimensions";

// Type definitions
import { DrawingParams } from "@/types/generalTypes";

// Helper functions
import {
  calculateEndpoint,
  getValidatedWallLength,
  addTJoint,
  addWallLengthInput,
  computeDrawingBounds,
  scaleWallLengths,
  computeDrawingOffsets,
  verifyEulerPath,
  strokeColor,
} from "./helpers";

interface LineDrawerProps {
  inputState: InputState;
  foundationState: FoundationState;
}

export const LineDrawer: React.FC<LineDrawerProps> = ({ inputState, foundationState }) => {
  const [lines, setLines] = useState<React.JSX.Element[]>([]);

  const [drawingWindowHeight, setDrawingWindowHeight] = useState<number>(
    Dimensions.get("window").width * Constants.DRAWING_WINDOW_SCREEN_HEIGHT_PERCENTAGE
  );
  const [drawingWindowWidth, setDrawingWindowWidth] = useState<number>(
    Dimensions.get("window").width * Constants.APP_SCREEN_WIDTH_PERCENTAGE
  );

  useWindowDimensions(Constants.APP_SCREEN_WIDTH_PERCENTAGE, setDrawingWindowWidth);
  useWindowDimensions(Constants.DRAWING_WINDOW_SCREEN_HEIGHT_PERCENTAGE, setDrawingWindowHeight);

  const limitedDrawingWindowWidth =
    drawingWindowWidth > Constants.APP_MAX_WIDTH ? Constants.APP_MAX_WIDTH : drawingWindowWidth;
  const limitedDrawingWindowHeight =
    drawingWindowHeight > Constants.MAX_DRAWING_WINDOW_HEIGHT
      ? Constants.MAX_DRAWING_WINDOW_HEIGHT
      : drawingWindowHeight;

  useEffect(() => {
    setDrawingWindowWidth(limitedDrawingWindowWidth);
  }, [limitedDrawingWindowWidth]);

  useEffect(() => {
    setDrawingWindowHeight(limitedDrawingWindowHeight);
  }, [limitedDrawingWindowHeight]);

  const computeLines = () => {
    const wallLengthInput = getValidatedWallLength(inputState);

    let allWallLengths: number[] = [...foundationState.wallLengths];
    const allAngles: number[] = [...foundationState.angles];

    addTJoint(inputState, foundationState, wallLengthInput, allWallLengths, allAngles);
    addWallLengthInput(inputState, foundationState, wallLengthInput, allWallLengths, allAngles);

    const drawingBounds = computeDrawingBounds(allWallLengths, allAngles);

    let drawingWidth: number = drawingBounds.maxX - drawingBounds.minX;
    let drawingHeight: number = drawingBounds.maxY - drawingBounds.minY;

    let drawingParams: DrawingParams = {
      wallLengths: allWallLengths,
      drawingWidth,
      drawingHeight,
      drawingBounds,
      limitedDrawingWindowWidth,
      limitedDrawingWindowHeight,
    };

    scaleWallLengths(drawingParams);

    const { startX, startY } = computeDrawingOffsets(drawingParams);
    renderLines(startX, startY, drawingParams.wallLengths, allAngles);
  };

  useEffect(() => {
    computeLines();
  }, [
    inputState.isTJoint,
    inputState.angleInput,
    inputState.previousAngle,
    inputState.wallLengthInput,
    foundationState.wallRowPressedIndex,
    foundationState.wallLengths,
    foundationState.angles,
    drawingWindowWidth,
    drawingWindowHeight,
  ]);

  const renderLines = (
    startX: number,
    startY: number,
    allWallLengths: number[],
    allAngles: number[]
  ): void => {
    const calculatedLines = [];
    const calculatedEdgesCoordinates = [];
    let currentX = startX;
    let currentY = startY;

    for (let i = 0; i < allWallLengths.length; i++) {
      const { endX, endY } = calculateEndpoint(currentX, currentY, allWallLengths[i], allAngles[i]);

      if (i === allWallLengths.length - 1) {
        verifyEulerPath(foundationState, startX, startY, endX, endY);
      }

      calculatedEdgesCoordinates.push({ x1: endX, y1: endY });
      calculatedLines.push(
        <G key={i}>
          <Line
            x1={currentX}
            y1={currentY}
            x2={endX}
            y2={endY}
            stroke={strokeColor(foundationState, inputState, allAngles, i)}
            strokeWidth={
              drawingWindowWidth < Constants.IS_SMALL_SCREEN
                ? Constants.SMALL_STROKE_WIDTH
                : Constants.REGULAR_STROKE_WIDTH
            }
          />
          <Circle cx={endX} cy={endY} r={Constants.CIRCLE_RADIUS} fill="#00aaef" />
        </G>
      );

      currentX = endX;
      currentY = endY;
    }

    setLines(calculatedLines);
  };

  return (
    <View style={styles.canvas}>
      <Svg height={limitedDrawingWindowHeight} width={limitedDrawingWindowWidth}>
        {lines}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
});
