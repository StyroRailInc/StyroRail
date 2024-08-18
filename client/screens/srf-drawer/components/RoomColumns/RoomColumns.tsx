// React imports
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

// Component
import Room from "@/screens/srf-drawer/components/RoomColumn";
import ResponsiveButton from "@/components/ResponsiveButton";

// Type
import { FoundationState } from "@/screens/srf-drawer/types/foundationState";

// Class
import Foundation from "@/screens/srf-drawer/utils/SR.FCalculator/Foundation";

// Constants
import { Constants } from "@/constants";

interface RoomColumnsProps {
  foundationState: FoundationState;
  style?: ViewStyle;
  handleAddFoundationPress: () => void;
}

const RoomColumns: React.FC<RoomColumnsProps> = ({
  foundationState,
  style,
  handleAddFoundationPress,
}) => {
  return (
    <View style={[styles.roomsContainer, style]}>
      <View style={styles.addFoundation}>
        {foundationState.wallLengths.length > 0 && (
          <ResponsiveButton
            title=""
            size={Constants.FONT_SIZE}
            iconName={"plus"}
            minIconSize={Constants.MIN_PLUS_ICON_SIZE}
            useAnimation={true}
            handlePress={handleAddFoundationPress}
          />
        )}
      </View>
      {foundationState.foundations.map((foundation: Foundation | null, index: number) => (
        <Room key={index} foundationState={foundationState} roomIndex={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  roomsContainer: {
    flexDirection: "row-reverse",
    width: "100%",
  },
  addFoundation: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
  },
});

export default RoomColumns;
