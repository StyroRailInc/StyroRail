// React imports
import React, { SetStateAction } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

// Component
import HeightRow from "@/screens/linear-srf/components/HeightRow";

// Custom hooks
import useVisibilityState from "@/hooks/useVisibilityState";

// Utility functions
import { removeHeights } from "@/screens/linear-srf/utils/RemoveHeights";

// Types
import { Heights } from "@/types/generalTypes";

interface HeightRowsProps {
  visibilityState: ReturnType<typeof useVisibilityState>;
  heights: Heights;
  heightRowPressedIndex: number | null;
  style?: ViewStyle;
  setHeights: React.Dispatch<SetStateAction<Heights>>;
  setHeightRowPressedIndex: React.Dispatch<SetStateAction<number | null>>;
}

const HeightRows: React.FC<HeightRowsProps> = ({
  visibilityState,
  heights,
  heightRowPressedIndex,
  style,
  setHeights,
  setHeightRowPressedIndex,
}) => {
  const handleRemoveHeight = (height: number) => {
    removeHeights(visibilityState, height, heights, setHeights, setHeightRowPressedIndex);
  };

  return (
    <View style={[styles.wallRowsContainer, style]}>
      {Object.keys(heights).map((height, index) => (
        <HeightRow
          key={index}
          heightIndex={index}
          height={parseInt(height)} // keys are strings
          heights={heights}
          visibilityState={visibilityState}
          setHeightRowPressedIndex={setHeightRowPressedIndex}
          heightRowPressedIndex={heightRowPressedIndex}
          removeHeight={handleRemoveHeight}
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

export default HeightRows;
