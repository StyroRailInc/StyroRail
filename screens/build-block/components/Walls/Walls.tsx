// React imports
import React, { useRef, useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";

// Components
import ResponsiveText from "@/components/ResponsiveText";
import ResponsiveInput from "@/components/ResponsiveInput";
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
} from "../../types/BBTypes";

// Reducer
import { initialOpeningState, initialInputState } from "../../reducer";

interface WallsProps {
  wallState: WallState;
  openingState: OpeningState;
  inputState: InputState;
  wallReducer: React.Dispatch<WallAction>;
  openingReducer: React.Dispatch<OpeningAction>;
  inputReducer: React.Dispatch<InputAction>;
}

const Walls: React.FC<WallsProps> = ({
  wallState,
  openingState,
  inputState,
  wallReducer,
  openingReducer,
  inputReducer,
}) => {
  const pressedWallIndex = useRef(0);

  const handleAddWallPress = (index: number) => {
    wallReducer({
      type: "modifyWall",
      payload: {
        inputState: inputState,
        openingState: openingState,
        index: pressedWallIndex.current,
      },
    });
    pressedWallIndex.current = index;
    resetInput();
    wallReducer({
      type: "addWall",
      payload: { inputState: initialInputState, openingState: openingState }, // because state not updated automatically
    });
  };

  const resetInput = () => {
    inputReducer({ type: "setHeight", payload: "" });
    inputReducer({ type: "setLength", payload: "" });
    inputReducer({ type: "setWidth", payload: "" });
    inputReducer({
      type: "setN45InsideCorners",
      payload: "",
    });
    inputReducer({
      type: "setN45OutsideCorners",
      payload: "",
    });
    inputReducer({
      type: "setNInsideCorners",
      payload: "",
    });
    inputReducer({
      type: "setNOutsideCorners",
      payload: "",
    });
    inputReducer({
      type: "setDoubleTaperTopLength",
      payload: "",
    });
    inputReducer({
      type: "setBrickLedgeLength",
      payload: "",
    });
    openingReducer({
      type: "setOpenings",
      payload: {
        openings: [{ width: "", height: "", quantity: "" }],
      },
    });
  };

  const updateInput = (index: number) => {
    inputReducer({ type: "setHeight", payload: wallState.walls[index].inputState.height });
    inputReducer({ type: "setLength", payload: wallState.walls[index].inputState.length });
    inputReducer({ type: "setWidth", payload: wallState.walls[index].inputState.width });
    inputReducer({
      type: "setN45InsideCorners",
      payload: wallState.walls[index].inputState.n45InsideCorners,
    });
    inputReducer({
      type: "setN45OutsideCorners",
      payload: wallState.walls[index].inputState.n45OutsideCorners,
    });
    inputReducer({
      type: "setNInsideCorners",
      payload: wallState.walls[index].inputState.nInsideCorners,
    });
    inputReducer({
      type: "setNOutsideCorners",
      payload: wallState.walls[index].inputState.nOutsideCorners,
    });
    inputReducer({
      type: "setDoubleTaperTopLength",
      payload: wallState.walls[index].inputState.doubleTaperTopLength,
    });
    inputReducer({
      type: "setBrickLedgeLength",
      payload: wallState.walls[index].inputState.brickLedgeLength,
    });
    openingReducer({ type: "setOpenings", payload: wallState.walls[index].openingState });
  };

  const handleWallPress = (index: number) => {
    wallReducer({
      type: "modifyWall",
      payload: {
        inputState: inputState,
        openingState: openingState,
        index: pressedWallIndex.current,
      },
    });
    pressedWallIndex.current = index;
    updateInput(index);
  };

  useEffect(() => {
    wallReducer({
      type: "modifyWall",
      payload: {
        inputState: inputState,
        openingState: openingState,
        index: pressedWallIndex.current,
      },
    });
  }, [inputState, openingState]);

  const handleDeletePress = () => {
    if (pressedWallIndex.current === 0) {
      if (wallState.walls.length > 1) {
        wallReducer({ type: "deleteWall", payload: { index: pressedWallIndex.current } });
        updateInput(pressedWallIndex.current + 1);
      } else {
        wallReducer({
          type: "modifyWall",
          payload: {
            inputState: initialInputState,
            openingState: initialOpeningState,
            index: pressedWallIndex.current,
          },
        });
        resetInput();
      }
      pressedWallIndex.current = 0;
    } else {
      wallReducer({ type: "deleteWall", payload: { index: pressedWallIndex.current } });
      pressedWallIndex.current = pressedWallIndex.current - 1;
      updateInput(pressedWallIndex.current);
    }
  };

  return (
    <View style={styles.container}>
      {wallState.walls.map((wall, index) => (
        <View key={index} style={styles.wallContainer}>
          {index === pressedWallIndex.current ? (
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
      <View style={{ position: "absolute", right: 10 }}>
        <ResponsiveButton title="-" size={Constants.FONT_SIZE} handlePress={handleDeletePress} />
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
