// React imports
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

// Component
import WallRow from "./WallRow";

// Types
import { FoundationState } from "@/screens/srf-drawer/types/foundationState";
import { InputState } from "@/screens/srf-drawer/types/inputState";
import { VisibilityState } from "@/types/visibilityState";

// Utility functions
import { removeWalls } from "@/screens/srf-drawer/utils/RemoveWalls";

interface WallRowsProps {
  foundationState: FoundationState;
  inputState: InputState;
  visibilityState: VisibilityState;
  style?: ViewStyle;
}

const WallRows: React.FC<WallRowsProps> = ({
  foundationState,
  inputState,
  visibilityState,
  style,
}) => {
  const handleRemoveWall = (wallIndex: number) => {
    removeWalls(foundationState, inputState, visibilityState, wallIndex);
  };

  return (
    <View style={[styles.wallRowsContainer, style]}>
      {foundationState.wallLengths.map((length: number, index: number) => (
        <WallRow
          key={index}
          foundationState={foundationState}
          visibilityState={visibilityState}
          wallIndex={index}
          removeWall={handleRemoveWall}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wallRowsContainer: {
    marginTop: 10,
    width: "100%",
  },
});

export default WallRows;
