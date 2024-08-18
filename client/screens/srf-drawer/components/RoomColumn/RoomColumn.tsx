// React imports
import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";

// Components
import ResponsiveText from "@/components/ResponsiveText";

// Constants
import { Constants } from "@/constants";

// Animation
import { growBy } from "@/animations/growBy";

// Type
import { FoundationState } from "@/screens/srf-drawer/types/foundationState";

// Animation
import { fadeInSlide } from "@/animations/fadeInSlide";

interface RoomColumnProps {
  foundationState: FoundationState;
  roomIndex: number;
}

const RoomColumn: React.FC<RoomColumnProps> = ({ foundationState, roomIndex }) => {
  const offset = useSharedValue(Constants.OFFSET);
  const opacity = useSharedValue(Constants.NO_OPACITY);
  const scale = useSharedValue(Constants.FULL_SCALE);
  const animatedStyles = fadeInSlide(offset, scale, opacity, "horizontal");

  useEffect(() => {
    if (foundationState.roomPressedIndex !== roomIndex) {
      growBy(Constants.FULL_SCALE, scale);
    } else {
      growBy(Constants.LARGE_SCALE, scale);
    }
  }, [foundationState.roomPressedIndex, roomIndex]);

  const handleRoomPress = () => {
    foundationState.setRoomPressedIndex(roomIndex);
    foundationState.setIsRoomChange(true);
    growBy(Constants.LARGE_SCALE, scale);
  };

  return (
    <Pressable style={styles.roomContainer} onPress={handleRoomPress}>
      <Animated.View style={[styles.room, animatedStyles]}>
        <ResponsiveText
          title={`${roomIndex + 1}`}
          size={Constants.FONT_SIZE}
          style={{ color: "white" }}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  roomContainer: {
    marginLeft: 10,
  },
  room: {
    backgroundColor: "#00aaef",
    borderRadius: 25,
    paddingVertical: 10,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RoomColumn;
