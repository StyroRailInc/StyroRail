// React imports
import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

// Utility function
import { inchesToFeet } from "@/utils/InputParser";

// Constants
import { Constants } from "@/constants";

// Component
import ResponsiveText from "@/components/ResponsiveText";

// Animation
import fade from "@/animations/fade";

// Type
import { FoundationPanels, FloorPanels } from "@/types/generalTypes";

interface PanelsDisplayProps {
  panels: FoundationPanels;
  nElastics: number;
  floorPanels?: FloorPanels;
  style?: ViewStyle | ViewStyle[];
}

const PanelsDisplay: React.FC<PanelsDisplayProps> = ({ panels, nElastics, floorPanels, style }) => {
  const opacity = useSharedValue(Constants.NO_OPACITY);
  const animatedStyle = fade(opacity, Constants.FULL_OPACITY);

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <View style={styles.titleAndResultsContainer}>
        <View style={styles.title}>
          <ResponsiveText title="Résultats : " size={Constants.FONT_SIZE} />
        </View>
        <View style={styles.results}>
          {Object.entries(panels).map(([heights, lengths], index) => (
            <View key={index} style={styles.resultsContainer}>
              <ResponsiveText
                title={`Hauteur : ${inchesToFeet(parseInt(heights))}`}
                size={Constants.FONT_SIZE}
              />
              <View style={styles.resultsContent}>
                {lengths.map((nPanels, length) => {
                  if (nPanels !== 0) {
                    return (
                      <ResponsiveText
                        key={length}
                        title={`${Constants.PANEL_LENGTHS[length]}: ${nPanels}`}
                        size={Constants.FONT_SIZE}
                      />
                    );
                  }
                  return null;
                })}
              </View>
            </View>
          ))}
          <View style={styles.resultsContainer}>
            <ResponsiveText
              title={"Élastiques"}
              size={Constants.FONT_SIZE}
              style={{ textAlign: "center" }}
            />
            <View style={styles.resultsContent}>
              <ResponsiveText title={`Sacs : ${nElastics}`} size={Constants.FONT_SIZE} />
            </View>
          </View>
          {floorPanels !== undefined &&
            Object.entries(floorPanels).map(
              ([floorType, quantity], index) =>
                floorType !== "Aucun" &&
                quantity !== 0 && (
                  <View key={index} style={styles.resultsContainer}>
                    <ResponsiveText title={floorType} size={Constants.FONT_SIZE} />
                    <View style={styles.resultsContent}>
                      <ResponsiveText title={`Panneaux : ${quantity}`} size={Constants.FONT_SIZE} />
                    </View>
                  </View>
                )
            )}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
    paddingRight: 10,
  },
  titleAndResultsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#2e4459",
  },
  results: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "100%",
    justifyContent: "center",
    width: "70%",
  },
  resultsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    marginLeft: 10,
    marginBottom: 10,
  },
  resultsContent: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

export default PanelsDisplay;
