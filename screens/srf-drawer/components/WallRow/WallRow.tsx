// React imports
import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

// Components
import ResponsiveText from "@/components/ResponsiveText";
import ImageButton from "@/components/ImageButton/ImageButton";

// Utility functions
import { inchesToFeet } from "@/utils/InputParser";

// Constants
import { Constants, icons } from "@/constants";

// Animations
import { fadeInSlide } from "@/animations/fadeInSlide";
import { growBy } from "@/animations/growBy";

// Types
import { FoundationState } from "@/screens/srf-drawer/types/foundationState";
import { VisibilityState } from "@/types/visibilityState";

interface WallRowProps {
  foundationState: FoundationState;
  visibilityState: VisibilityState;
  wallIndex: number;
  removeWall: (wallIndex: number) => void;
}

const WallRow: React.FC<WallRowProps> = ({
  foundationState,
  visibilityState,
  wallIndex,
  removeWall,
}) => {
  const offset = useSharedValue(Constants.NEGATIVE_OFFSET);
  const opacity = useSharedValue(Constants.NO_OPACITY);
  const scale = useSharedValue(Constants.FULL_SCALE);

  const animatedStyles = fadeInSlide(
    offset,
    scale,
    opacity,
    "vertical",
    true,
    visibilityState.setIsCalculateButtonVisible
  );

  useEffect(() => {
    if (foundationState.wallRowPressedIndex !== wallIndex) {
      growBy(Constants.FULL_SCALE, scale);
    }
  }, [foundationState.wallRowPressedIndex, wallIndex]);

  const handleWallRowPress = () => {
    foundationState.setWallRowPressedIndex(wallIndex);
    visibilityState.setIsTJointButtonVisible(false);
    growBy(Constants.MEDIUM_SCALE, scale);
  };

  const handleRemoveWallPress = () => {
    visibilityState.setIsResultVisible(false);
    removeWall(wallIndex);
  };

  return (
    <Pressable onPress={handleWallRowPress}>
      <Animated.View style={[styles.wallLengthContainer, animatedStyles]}>
        <ResponsiveText
          title={`Mur ${wallIndex + 1} : `}
          size={Constants.FONT_SIZE}
          style={{ textAlign: "left" }}
        />
        <View style={styles.specsAndRemoveContainer}>
          <View style={styles.wallSpecsContainer}>
            <View style={[styles.spec, { borderLeftWidth: 0 }]}>
              <ResponsiveText
                title={`L : ${inchesToFeet(foundationState.wallLengths[wallIndex])}`}
                size={Constants.FONT_SIZE}
                style={{ textAlign: "left" }}
              />
            </View>

            <View style={styles.spec}>
              <ResponsiveText
                title={`E : ${inchesToFeet(foundationState.concreteWidths[wallIndex])}`}
                size={Constants.FONT_SIZE}
                style={{ textAlign: "left" }}
              />
            </View>

            <View style={styles.spec}>
              <ResponsiveText
                title={`H : ${inchesToFeet(foundationState.wallHeights[wallIndex])}`}
                size={Constants.FONT_SIZE}
                style={{ textAlign: "left" }}
              />
            </View>
          </View>
          <View style={styles.removeButton}>
            <ImageButton
              imageSource={icons.remove}
              imageSize={Constants.IMAGE_SIZE}
              minHeight={Constants.MIN_REMOVE_SIZE}
              minWidth={Constants.MIN_REMOVE_SIZE}
              maxHeight={Constants.MAX_REMOVE_SIZE}
              maxWidth={Constants.MAX_REMOVE_SIZE}
              style={{ tintColor: "red" }}
              handlePress={handleRemoveWallPress}
            />
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wallLengthContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  specsAndRemoveContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  wallSpecsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
  },
  spec: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 0,
    borderLeftWidth: 1,
  },
  removeButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default React.memo(WallRow);
