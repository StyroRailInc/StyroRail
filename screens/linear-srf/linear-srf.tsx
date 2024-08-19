// React imports
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

// Components
import Form from "@/components/Form";
import PanelsDisplay from "@/components/PanelDisplay";
import ResponsiveText from "@/components/ResponsiveText";
import ResponsiveButton from "@/components/ResponsiveButton";
import HeightRows from "@/screens/linear-srf/components/HeightRows";
import HeightInput from "@/screens/linear-srf/components/HeightInput";
import SettingsComponent from "@/screens/linear-srf/components/Settings";

// Custom hooks
import { useIsMount } from "@/hooks/useIsMount";
import useVisibilityState from "@/hooks/useVisibilityState";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import useInputState from "@/screens/linear-srf/hooks/useInputState";
import useSettingsState from "@/screens/linear-srf/hooks/useSettingsState";

// Constants
import { Constants } from "@/constants";

// Types
import { FoundationPanels, Heights } from "@/types/generalTypes";

// Helpers
import { addHeight, calculatePanelResults, getFormData, updateHeightInput } from "./helpers";

const LinearSRF: React.FC = () => {
  const settingsState = useSettingsState();
  const visibilityState = useVisibilityState();
  const inputState = useInputState();
  const isMount = useIsMount();

  const [heights, setHeights] = useState<Heights>({});
  const [panelResults, setPanelResults] = useState<FoundationPanels>({});
  const [heightRowPressedIndex, setHeightRowPressedIndex] = useState<number | null>(null);

  const [appScreenWidth, setAppScreenWidth] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useWindowDimensions(Constants.SCROLLVIEW_WIDTH_PERCENTAGE, setWindowWidth);
  useWindowDimensions(Constants.APP_SCREEN_WIDTH_PERCENTAGE, setAppScreenWidth);

  useEffect(() => {
    if (!isMount) {
      updateHeightInput(inputState, heightRowPressedIndex, heights);
    }
  }, [heightRowPressedIndex]);

  useEffect(() => {
    if (!isMount) {
      calculatePanelResults(inputState, settingsState, visibilityState, heights, setPanelResults);
    }
  }, [visibilityState.isResultVisible]);

  useEffect(() => {
    visibilityState.setIsResultVisible(false);
  }, [
    inputState.height,
    inputState.linearFeet,
    inputState.nInsideCorners,
    inputState.nOutsideCorners,
    inputState.n45InsideCorners,
    inputState.n45OutsideCorners,
    inputState.nTJoints,
  ]);

  const handleCalculatePress = () => {
    setHeightRowPressedIndex(null);
    visibilityState.setIsResultVisible(true);
  };
  const handleAddHeightPress = () => {
    addHeight(
      inputState,
      visibilityState,
      heightRowPressedIndex,
      setHeights,
      setHeightRowPressedIndex
    );
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

          <HeightInput inputState={inputState} />

          <View style={styles.addHeightButton}>
            <ResponsiveButton
              title={heightRowPressedIndex !== null ? "Modifier Hauteur" : "Ajouter Hauteur"}
              size={Constants.FONT_SIZE}
              handlePress={handleAddHeightPress}
            />
          </View>

          <HeightRows
            visibilityState={visibilityState}
            heights={heights}
            heightRowPressedIndex={heightRowPressedIndex}
            setHeightRowPressedIndex={setHeightRowPressedIndex}
            setHeights={setHeights}
          />

          {visibilityState.isCalculateButtonVisible && (
            <View style={styles.calculateButton}>
              <ResponsiveButton
                title="Calculer"
                size={Constants.FONT_SIZE}
                useAnimation={true}
                handlePress={handleCalculatePress}
              />
            </View>
          )}

          {visibilityState.isResultVisible && (
            <PanelsDisplay panels={panelResults} nElastics={inputState.nElastics} />
          )}
          {visibilityState.isResultVisible && (
            <View style={styles.form}>
              <Form
                data={getFormData(settingsState, inputState, panelResults)}
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
  addHeightButton: {
    width: "100%",
    marginTop: 10,
    zIndex: 2,
  },
  calculateButton: {
    width: "100%",
  },
  form: {
    width: "100%",
  },
});

export default LinearSRF;
