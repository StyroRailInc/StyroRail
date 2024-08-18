// React imports
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

// Components
import { LeftArrow, RightArrow } from "@/screens/srf-drawer/components/Arrows";
import ResponsiveButton from "@/components/ResponsiveButton";
import ResponsiveText from "@/components/ResponsiveText";
import SettingsComponent from "@/screens/srf-drawer/components/Settings";
import PanelsDisplay from "@/components/PanelDisplay";
import LineDrawer from "@/screens/srf-drawer/components/LineDrawer";
import WallInput from "@/screens/srf-drawer/components/WallInput";
import WallRows from "@/screens/srf-drawer/components/WallRows";
import Form from "@/components/Form";
import Rooms from "./components/RoomColumns";

// Custom hooks
import useFoundationState from "@/screens/srf-drawer/hooks/useFoundationState";
import useSettingsState from "@/screens/srf-drawer/hooks/useSettingsState";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import useInputState from "@/screens/srf-drawer/hooks/useInputState";
import useVisibilityState from "@/hooks/useVisibilityState";
import { useIsMount } from "@/hooks/useIsMount";

// Constants
import { Constants } from "@/constants";

// Helper functions
import {
  addWall,
  addFoundation,
  changeRoom,
  calculatePanelResults,
  createAndSetFoundations,
  getFormData,
  updateWallInput,
  computeAngleDifferences,
  adjustAngles,
} from "./helpers";
import { FloorType } from "@/utils/enums";

const SRFDrawer: React.FC = () => {
  const isMount = useIsMount();

  // States
  const settingsState = useSettingsState();
  const inputState = useInputState({ settingsState });
  const foundationState = useFoundationState();
  const visibilityState = useVisibilityState();

  const [initialAngleDifferences, setInitialAngleDifferences] = useState<number[]>([]);
  const [appScreenWidth, setAppScreenWidth] = useState<number>();
  const [windowWidth, setWindowWidth] = useState<number>();

  useWindowDimensions(Constants.SCROLLVIEW_WIDTH_PERCENTAGE, setWindowWidth);
  useWindowDimensions(Constants.APP_SCREEN_WIDTH_PERCENTAGE, setAppScreenWidth);

  // Update inputState when the settings change
  useEffect(() => {
    inputState.setConcreteWidthInput(settingsState.defaultConcreteWidth);
    inputState.setWallHeightInput(settingsState.defaultWallHeight);
  }, [settingsState.defaultConcreteWidth, settingsState.defaultWallHeight]);

  // Compute panelResults when calculate button is pressed
  useEffect(() => {
    if (!isMount) {
      calculatePanelResults(foundationState, settingsState, visibilityState);
    }
  }, [visibilityState.isResultVisible]);

  // Change the current visible room
  useEffect(() => {
    if (!isMount && foundationState.isRoomChange) {
      changeRoom(foundationState, inputState, settingsState, visibilityState);
    }
  }, [foundationState.roomPressedIndex]);

  useEffect(() => {
    if (!isMount) {
      updateWallInput(foundationState, inputState);
      computeAngleDifferences(foundationState, setInitialAngleDifferences);
    }
  }, [foundationState.wallRowPressedIndex]);

  useEffect(() => {
    if (!isMount) {
      adjustAngles(foundationState, inputState, initialAngleDifferences);
    }
  }, [inputState.angleInput]);

  const handleAddWallPress = () => {
    addWall(foundationState, inputState, visibilityState, settingsState);
  };

  const handleAddFoundationPress = () => {
    addFoundation(foundationState, settingsState, visibilityState);
  };

  const handleTJointPress = () => {
    // Can't have 2 TJoints in a row
    if (!inputState.previousCornerIsTJoint) {
      inputState.setIsTJoint(!inputState.isTJoint);
      inputState.setAngleInput(inputState.previousAngle);
    }
  };

  const handleCalculatePress = () => {
    createAndSetFoundations(foundationState, settingsState, inputState, visibilityState);
  };

  return (
    <View style={styles.pageContainer}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { minWidth: windowWidth }]}
        keyboardShouldPersistTaps={"always"}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[styles.pageContent, { width: appScreenWidth, maxWidth: Constants.APP_MAX_WIDTH }]}
        >
          <View style={styles.header}>
            <View style={styles.settingsComponent}>
              <SettingsComponent settingsState={settingsState} visibilityState={visibilityState} />
            </View>
            <View style={styles.title}>
              <ResponsiveText title="Calculatrice SR.F" size={Constants.TITLE_SIZE} header={true} />
            </View>
            <View style={styles.emptyContainer} />
          </View>

          <View style={styles.lineDrawer}>
            <LineDrawer inputState={inputState} foundationState={foundationState} />
            <View style={styles.roomsContainer}>
              <Rooms
                foundationState={foundationState}
                handleAddFoundationPress={handleAddFoundationPress}
              />
            </View>
            <View style={styles.tJoint}>
              {visibilityState.isTJointButtonVisible && (
                <ResponsiveButton
                  title="⊥"
                  size={Constants.FONT_SIZE}
                  useAnimation={true}
                  handlePress={handleTJointPress}
                />
              )}
            </View>
          </View>

          <View style={styles.arrows}>
            <View style={styles.leftArrow}>
              <LeftArrow inputState={inputState} />
            </View>
            <View style={[styles.rightArrow]}>
              <RightArrow inputState={inputState} />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputColumn}>
              <WallInput inputState={inputState} />
            </View>
          </View>

          <View style={styles.button}>
            <ResponsiveButton
              title={foundationState.wallRowPressedIndex !== null ? "Modifier Mur" : "Ajouter Mur"}
              size={Constants.FONT_SIZE}
              handlePress={handleAddWallPress}
            />
          </View>
          <WallRows
            foundationState={foundationState}
            inputState={inputState}
            visibilityState={visibilityState}
          />
          {visibilityState.isCalculateButtonVisible && (
            <ResponsiveButton
              title="Calculer"
              size={Constants.FONT_SIZE}
              useAnimation={true}
              handlePress={handleCalculatePress}
            />
          )}
          {visibilityState.isResultVisible && (
            <PanelsDisplay
              panels={foundationState.panelResults}
              nElastics={foundationState.nElastics}
              floorPanels={foundationState.floorPanelResults}
            />
          )}
          {visibilityState.isResultVisible && (
            <View style={styles.form}>
              <Form
                data={getFormData(foundationState, settingsState)}
                route={Constants.SEND_EMAIL_URL}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  pageContent: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  settingsComponent: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: "5%",
  },
  title: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    width: "5%",
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
  inputColumn: {
    flex: 1,
  },
  lineDrawer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  roomsContainer: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  tJoint: { position: "absolute", left: 10, top: 10, width: 40 },
  arrows: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  leftArrow: { width: "50%" },
  rightArrow: { width: "50%" },
  button: { width: "100%", zIndex: 2 },
  form: {
    width: "100%",
  },
});

export default SRFDrawer;

//test 53-3 34-8 36-10 8-10 16-5 25-10
//12-1 12-1 12-1 12-1
