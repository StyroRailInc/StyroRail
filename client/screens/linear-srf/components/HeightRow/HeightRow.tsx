// React imports
import React, { SetStateAction, useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

// Components
import ResponsiveText from "@/components/ResponsiveText";
import ImageButton from "@/components/ImageButton/ImageButton";

// Utility functions
import { inchesToFeet } from "@/utils/InputParser";
import { growBy } from "@/animations/growBy";

// Constants
import { Constants, icons } from "@/constants";

// Custom hooks
import { VisibilityState } from "@/types/visibilityState";

// Types
import { Heights } from "@/types/generalTypes";

// Animations
import { fadeInSlide } from "@/animations/fadeInSlide";

interface HeightRowProps {
  visibilityState: VisibilityState;
  heights: Heights;
  height: number;
  heightIndex: number;
  heightRowPressedIndex: number | null;
  removeHeight: (heightIndex: number) => void;
  setHeightRowPressedIndex: React.Dispatch<SetStateAction<number | null>>;
}

const HeightRow: React.FC<HeightRowProps> = ({
  visibilityState,
  heights,
  height,
  heightIndex,
  heightRowPressedIndex,
  removeHeight,
  setHeightRowPressedIndex,
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
    if (heightRowPressedIndex !== heightIndex) {
      growBy(Constants.FULL_SCALE, scale);
    }
  }, [heightRowPressedIndex, heightIndex]);

  const handleHeightRowPress = () => {
    visibilityState.setIsTJointButtonVisible(false);
    setHeightRowPressedIndex(heightIndex);
    growBy(Constants.MEDIUM_SCALE, scale);
  };

  const handleRemoveHeightPress = () => {
    visibilityState.setIsResultVisible(false);
    removeHeight(height);
  };

  return (
    <Pressable onPress={handleHeightRowPress}>
      <Animated.View style={[styles.heightRowContainer, animatedStyles]}>
        <ResponsiveText
          title={`Hauteur ${inchesToFeet(height)} : `}
          size={Constants.FONT_SIZE}
          style={{ textAlign: "left" }}
        />
        <View style={styles.specsAndRemoveContainer}>
          <View style={styles.heightSpecsContainer}>
            <View style={styles.heightTextContainer}>
              <ResponsiveText
                title={`Pieds Linéaires : ${inchesToFeet(heights[height][0])}`}
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
              handlePress={handleRemoveHeightPress}
            />
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  heightRowContainer: {
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
  heightSpecsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
  },
  heightTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 0,
  },
  removeButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default React.memo(HeightRow);
