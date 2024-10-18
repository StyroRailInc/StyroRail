// React imports
import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Pressable } from "react-native";

// Components
import ResponsiveText from "@/components/ResponsiveText";
import ResponsiveInput from "@/components/ResponsiveInput";

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
import ResponsiveButton from "@/components/ResponsiveButton";

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
  const [pressedWallIndex, setPressedWallIndex] = useState(0);

  const handleAddWallPress = (index: number) => {
    wallReducer({
      type: "modifyWall",
      payload: { inputState: inputState, openingState: openingState, index: pressedWallIndex },
    });
    wallReducer({
      type: "addWall",
      payload: { inputState: inputState, openingState: openingState },
    });
    setPressedWallIndex(index);
    inputReducer({ type: "setHeight", payload: "" });
    inputReducer({ type: "setLength", payload: "" });
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
    openingReducer({
      type: "setOpenings",
      payload: {
        openings: [{ width: "", height: "", quantity: "" }],
      },
    });
  };

  const handleWallPress = (index: number) => {
    wallReducer({
      type: "modifyWall",
      payload: { inputState: inputState, openingState: openingState, index: pressedWallIndex },
    });
    setPressedWallIndex(index);
    inputReducer({ type: "setHeight", payload: wallState.walls[index].inputState.height });
    inputReducer({ type: "setLength", payload: wallState.walls[index].inputState.length });
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
    openingReducer({ type: "setOpenings", payload: wallState.walls[index].openingState });
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollContainer}>
        {wallState.walls.map((wall, index) => (
          <View key={index} style={styles.wallContainer}>
            {index === pressedWallIndex ? (
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
      </ScrollView>
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
    justifyContent: "flex-start",
    height: 50,
  },
  wallContainer: {
    width: 60,
    marginRight: 10,
  },
});

export default Walls;
