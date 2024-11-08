// React imports
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

// Components
import ResponsiveText from "@/components/ResponsiveText";
import ResponsiveInput from "@/components/ResponsiveInput";

// Types
import { InputState } from "@/screens/srf-drawer/types/inputState";

// Constants
import { Constants } from "@/constants";

interface WallInputProps {
  inputState: InputState;
  style?: ViewStyle;
}

const WallInput: React.FC<WallInputProps> = ({ inputState, style }) => {
  return (
    <View style={[styles.wallLengthContainer, style]}>
      <View style={styles.inputContainer}>
        <View style={styles.inputGroup}>
          <ResponsiveText title="L : " size={Constants.FONT_SIZE} style={styles.label} />
          <ResponsiveInput
            title=""
            size={Constants.FONT_SIZE}
            input={inputState.wallLengthInput}
            inputStyle={styles.inputStyle}
            setInput={inputState.setWallLengthInput}
          />
        </View>

        <View style={[styles.inputGroup, styles.divider]}>
          <ResponsiveText title="E : " size={Constants.FONT_SIZE} style={styles.label} />
          <ResponsiveInput
            title=""
            size={Constants.FONT_SIZE}
            input={inputState.concreteWidthInput}
            inputStyle={styles.inputStyle}
            setInput={inputState.setConcreteWidthInput}
          />
        </View>

        <View style={[styles.inputGroup, styles.divider]}>
          <ResponsiveText title={`H : `} size={Constants.FONT_SIZE} style={styles.label} />
          <ResponsiveInput
            title=""
            size={Constants.FONT_SIZE}
            input={inputState.wallHeightInput}
            inputStyle={styles.inputStyle}
            setInput={inputState.setWallHeightInput}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wallLengthContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
    justifyContent: "space-between",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  inputGroup: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  divider: {
    borderLeftWidth: 1,
    borderColor: "black",
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#00aaef",
    borderRadius: 4,
    // width: "70%",
    textAlign: "center",
  },
  label: {
    textAlign: "left",
    marginRight: 5,
  },
});

export default WallInput;
