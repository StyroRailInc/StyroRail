// React imports
import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

// Constants
import { Constants } from "@/constants";

// Component
import ResponsiveText from "@/components/ResponsiveText";

// Animation
import fade from "@/animations/fade";

// Class
import House from "../utils/BBCalculator/House";

interface BlockDisplayProps {
  house: House;
  style?: ViewStyle | ViewStyle[];
}

const BlockDisplay: React.FC<BlockDisplayProps> = ({ house, style }) => {
  const opacity = useSharedValue(Constants.NO_OPACITY);
  const animatedStyle = fade(opacity, Constants.FULL_OPACITY);

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <View style={styles.titleAndResultsContainer}>
        <View style={styles.title}>
          <ResponsiveText title="Résultats : " size={Constants.FONT_SIZE} />
        </View>
        {Object.entries(house.getBlockQuantities()).map(([width, blocks]) => (
          <View key={`width-${width}`} style={styles.results}>
            <View style={styles.resultsContainer}>
              <View style={{ alignItems: "center" }}>
                <ResponsiveText title={`Largeur : ${width}`} size={Constants.FONT_SIZE} />
              </View>
              <View style={styles.resultsContent}>
                {Object.entries(blocks).map(([block, quantity]) =>
                  quantity !== 0 && !Number.isNaN(quantity) ? (
                    <ResponsiveText
                      key={`${block}`}
                      title={`${block}: ${quantity}`}
                      size={Constants.FONT_SIZE}
                    />
                  ) : null
                )}
              </View>
            </View>
          </View>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 0,
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

export default BlockDisplay;
