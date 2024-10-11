// React imports
import React from "react";
import { ScrollView, View, StyleSheet, Pressable } from "react-native";

// Components
import ResponsiveText from "@/components/ResponsiveText";
import ResponsiveInput from "@/components/ResponsiveInput";

// Constants
import { Constants } from "@/constants";

// Types
import { WallState, WallAction } from "../../types/BBTypes";
import ResponsiveButton from "@/components/ResponsiveButton";

interface WallsProps {
  wallState: WallState;
  wallReducer: React.Dispatch<WallAction>;
}

const Walls: React.FC<WallsProps> = ({ wallState, wallReducer }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollContainer}>
        {wallState.walls.map((wall, index) => (
          <View key={index} style={styles.wallContainer}>
            <ResponsiveButton
              title={"10"}
              size={0}
              style={{
                borderRadius: 4,
                borderWidth: 2,
                backgroundColor: "white",
                borderColor: "#00aaef",
              }}
              handlePress={() => {}}
            />
          </View>
        ))}
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
  },
});

export default Walls;
