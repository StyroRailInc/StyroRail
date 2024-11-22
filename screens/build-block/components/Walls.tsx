// React imports
import React, { useRef, useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";

// Components
import ResponsiveButton from "@/components/ResponsiveButton";

// Constants
import { Constants } from "@/constants";

// Types
import {
  WallState,
  WallAction,
  OpeningState,
  InputState,
  OpeningAction,
  InputAction,
} from "../types/BBTypes";

// Reducer
import { initialOpeningState, initialInputState } from "../reducer";

// Utility function
import { parseInput } from "@/utils/InputParser";

interface WallsProps {
  wallState: WallState;
  openingState: OpeningState;
  inputState: InputState;
  wallDispatch: React.Dispatch<WallAction>;
  openingDispatch: React.Dispatch<OpeningAction>;
  inputDispatch: React.Dispatch<InputAction>;
}

const Walls: React.FC<WallsProps> = ({
  wallState,
  openingState,
  inputState,
  wallDispatch,
  openingDispatch,
  inputDispatch,
}) => {
  const handleAddWallPress = (index: number) => {
    wallDispatch({
      type: "modifyWall",
      payload: {
        inputState: inputState,
        openingState: openingState,
        index: wallState.pressedWallIndex,
      },
    });
    wallDispatch({ type: "setPressedWallIndex", payload: index });
    resetInputs();
    wallDispatch({
      type: "addWall",
      payload: { inputState: initialInputState, openingState: openingState }, // because state not updated automatically
    });
  };

  const resetInputs = () => {
    inputDispatch({ type: "resetInputs" });
    openingDispatch({
      type: "setOpenings",
      payload: {
        openings: [{ width: "", height: "", quantity: "" }],
      },
    });
  };

  const updateInputs = (index: number) => {
    inputDispatch({
      type: "setInputs",
      payload: {
        length: wallState.walls[index].inputState.length,
        height: wallState.walls[index].inputState.height,
        width: wallState.walls[index].inputState.width,
        nInsideCorners: wallState.walls[index].inputState.nInsideCorners,
        nOutsideCorners: wallState.walls[index].inputState.nOutsideCorners,
        n45InsideCorners: wallState.walls[index].inputState.n45InsideCorners,
        n45OutsideCorners: wallState.walls[index].inputState.n45OutsideCorners,
        brickLedgeLength: wallState.walls[index].inputState.brickLedgeLength,
        doubleTaperTopLength: wallState.walls[index].inputState.doubleTaperTopLength,
        isValidLength: wallState.walls[index].inputState.isValidLength,
        isValidHeight: wallState.walls[index].inputState.isValidHeight,
        isValidWidth: wallState.walls[index].inputState.isValidWidth,
      },
    });
    openingDispatch({ type: "setOpenings", payload: wallState.walls[index].openingState });
  };

  useEffect(() => {
    updateInputs(wallState.pressedWallIndex);
  }, [wallState.pressedWallIndex]);

  const handleWallPress = (index: number) => {
    wallDispatch({
      type: "modifyWall",
      payload: {
        inputState: inputState,
        openingState: openingState,
        index: wallState.pressedWallIndex,
      },
    });
    wallDispatch({ type: "setPressedWallIndex", payload: index });
  };

  useEffect(() => {
    wallDispatch({
      type: "modifyWall",
      payload: {
        inputState: inputState,
        openingState: openingState,
        index: wallState.pressedWallIndex,
      },
    });
  }, [inputState, openingState]);

  const handleDeletePress = () => {
    if (wallState.pressedWallIndex === 0) {
      if (wallState.walls.length > 1) {
        wallDispatch({ type: "deleteWall", payload: { index: wallState.pressedWallIndex } });
        updateInputs(wallState.pressedWallIndex + 1);
      } else {
        wallDispatch({
          type: "modifyWall",
          payload: {
            inputState: initialInputState,
            openingState: initialOpeningState,
            index: wallState.pressedWallIndex,
          },
        });
        resetInputs();
      }
      wallDispatch({ type: "setPressedWallIndex", payload: 0 });
    } else {
      wallDispatch({ type: "deleteWall", payload: { index: wallState.pressedWallIndex } });
      wallDispatch({ type: "setPressedWallIndex", payload: wallState.pressedWallIndex - 1 });
    }
  };

  return (
    <View style={styles.container}>
      {wallState.walls.map((wall, index) => (
        <View key={index} style={styles.wallContainer}>
          {index === wallState.pressedWallIndex ? (
            <ResponsiveButton
              title={`Mur ${index + 1}`}
              size={0}
              style={{
                borderRadius: 4,
                borderWidth: 2,
                borderColor: "#00aaef",
              }}
              handlePress={() => handleWallPress(index)}
            />
          ) : (
            <ResponsiveButton
              title={`Mur ${index + 1}`}
              size={0}
              style={{
                borderRadius: 4,
                borderWidth: 2,
                backgroundColor: "white",
                borderColor: "#00aaef",
              }}
              textStyle={{ color: "#2e4459" }}
              handlePress={() => handleWallPress(index)}
            />
          )}
        </View>
      ))}
      <View key={wallState.walls.length} style={[styles.wallContainer, { opacity: 0.5 }]}>
        <ResponsiveButton
          title={`Mur ${wallState.walls.length + 1}`}
          size={0}
          style={{
            borderRadius: 4,
            borderWidth: 2,
            backgroundColor: "white",
            borderColor: "#00aaef",
          }}
          textStyle={{ color: "#2e4459" }}
          handlePress={() => handleAddWallPress(wallState.walls.length)}
        />
      </View>
      <View style={{ position: "absolute", right: 10, width: 20 }}>
        <ResponsiveButton
          title="-"
          size={Constants.FONT_SIZE}
          handlePress={handleDeletePress}
          style={{ backgroundColor: "red" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    width: "100%",
    height: 20,
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 50,
  },
  wallContainer: {
    width: 60,
    marginRight: 10,
  },
});

export default Walls;
