// React imports
import React, { useState, useEffect } from "react";
import { Modal, View, Pressable, StyleSheet } from "react-native";

// Components
import ImageButton from "@/components/ImageButton";
import DropdownMenu from "@/components/DropdownMenu";
import ResponsiveInput from "@/components/ResponsiveInput";
import ResponsiveText from "@/components/ResponsiveText";
import CheckBox from "@/components/CheckBox";

// Enums
import { InsulationArea, FoamWidth, stringToEnum, CornerLength, FloorType } from "@/utils/enums";

// Constants
import { Constants, icons } from "@/constants";

// Types
import { SettingsState } from "@/screens/srf-drawer/types/settingsState";
import { VisibilityState } from "@/types/visibilityState";

interface SettingsComponentProps {
  settingsState: SettingsState;
  visibilityState: VisibilityState;
}

const SettingsComponent: React.FC<SettingsComponentProps> = ({
  settingsState,
  visibilityState,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

  const handleDropdownToggle = (index: number) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleCheckMarkPress = () => {
    settingsState.setAddExtraPanels(!settingsState.addExtraPanels);
    visibilityState.setIsResultVisible(false);
  };

  useEffect(() => {
    visibilityState.setIsSurplusPercentageVisible(!visibilityState.isSurplusPercentageVisible);
  }, [settingsState.addExtraPanels]);

  const showModal = (): void => {
    setIsModalVisible(true);
  };

  const hideModal = (): void => {
    setIsModalVisible(false);
    setOpenDropdownIndex(null);
  };

  useEffect(() => {
    visibilityState.setIsResultVisible(false);
  }, [
    settingsState.percentageExtraMin,
    settingsState.defaultConcreteWidth,
    settingsState.defaultWallHeight,
  ]);

  return (
    <View style={styles.container}>
      <ImageButton
        imageSource={icons.gear}
        imageSize={Constants.GEAR_SIZE}
        minHeight={Constants.MIN_GEAR_SIZE}
        minWidth={Constants.MIN_GEAR_SIZE}
        maxHeight={Constants.MAX_GEAR_SIZE}
        maxWidth={Constants.MAX_GEAR_SIZE}
        handlePress={showModal}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={hideModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxWidth: Constants.MAX_MODAL_WIDTH }]}>
            <View style={styles.titleContainer}>
              <ResponsiveText
                title="Paramètres"
                size={Constants.TITLE_SIZE}
                style={{ textAlign: "center" }}
                header={true}
              />
            </View>

            <View style={[styles.settingsContainer, { zIndex: 4 }]}>
              <ResponsiveText
                title="Épaisseur du foam"
                size={Constants.FONT_SIZE}
                style={styles.textStyle}
              />
              <DropdownMenu
                options={Object.values(FoamWidth)}
                selectedOption={settingsState.foamWidth}
                fontSize={Constants.FONT_SIZE}
                isDropdownMenuOpen={openDropdownIndex === 0}
                textStyle={styles.dropdownText}
                onSelect={(option) => {
                  settingsState.setFoamWidth(stringToEnum(FoamWidth, option));
                  visibilityState.setIsResultVisible(false);
                }}
                setIsDropdownMenuOpen={() => {
                  handleDropdownToggle(0);
                }}
              />
            </View>

            <View style={[styles.settingsContainer, { zIndex: 3 }]}>
              <ResponsiveText
                title="Longueur des coins"
                size={Constants.FONT_SIZE}
                style={styles.textStyle}
              />
              <DropdownMenu
                options={Object.values(CornerLength)}
                selectedOption={settingsState.cornerLength}
                fontSize={Constants.FONT_SIZE}
                isDropdownMenuOpen={openDropdownIndex === 2}
                textStyle={styles.dropdownText}
                onSelect={(option) => {
                  settingsState.setCornerLength(stringToEnum(CornerLength, option));
                  visibilityState.setIsResultVisible(false);
                }}
                setIsDropdownMenuOpen={() => {
                  handleDropdownToggle(2);
                }}
              />
            </View>

            <View style={[styles.settingsContainer, { zIndex: 2 }]}>
              <ResponsiveText
                title="Surface à isoler"
                size={Constants.FONT_SIZE}
                style={styles.textStyle}
              />
              <DropdownMenu
                options={Object.values(InsulationArea)}
                selectedOption={settingsState.insulationArea}
                fontSize={Constants.FONT_SIZE}
                isDropdownMenuOpen={openDropdownIndex === 3}
                defaultOption={settingsState.insulationArea}
                textStyle={styles.dropdownText}
                onSelect={(option) => {
                  settingsState.setInsulationArea(stringToEnum(InsulationArea, option));
                  visibilityState.setIsResultVisible(false);
                }}
                setIsDropdownMenuOpen={() => {
                  handleDropdownToggle(3);
                }}
              />
            </View>

            <View style={[styles.settingsContainer, { zIndex: 1 }]}>
              <ResponsiveText
                title="Isolant pour le plancher"
                size={Constants.FONT_SIZE}
                style={styles.textStyle}
              />
              <DropdownMenu
                options={Object.values(FloorType)}
                selectedOption={settingsState.floorType}
                fontSize={Constants.FONT_SIZE}
                isDropdownMenuOpen={openDropdownIndex === 4}
                defaultOption={settingsState.floorType}
                textStyle={styles.dropdownText}
                onSelect={(option) => {
                  settingsState.setFloorType(stringToEnum(FloorType, option));
                  visibilityState.setIsResultVisible(false);
                }}
                setIsDropdownMenuOpen={() => {
                  handleDropdownToggle(4);
                }}
              />
            </View>

            <View style={[styles.settingsContainer, { zIndex: 0 }]}>
              <ResponsiveText
                title="Hauteur par défaut"
                size={Constants.FONT_SIZE}
                style={styles.textStyle}
              />
              <ResponsiveInput
                title=""
                size={Constants.FONT_SIZE}
                input={settingsState.defaultWallHeight}
                setInput={settingsState.setDefaultWallHeight}
                inputStyle={styles.inputStyle}
              />
            </View>

            <View style={[styles.settingsContainer, { zIndex: 0 }]}>
              <ResponsiveText
                title="Épaisseur du béton par défaut"
                size={Constants.FONT_SIZE}
                style={styles.textStyle}
              />
              <ResponsiveInput
                title=""
                size={Constants.FONT_SIZE}
                input={settingsState.defaultConcreteWidth}
                setInput={settingsState.setDefaultConcreteWidth}
                inputStyle={styles.inputStyle}
              />
            </View>

            <View style={styles.extraContainer}>
              <View style={styles.checkMarkContainer}>
                <ResponsiveText title="Panneaux surplus" size={Constants.FONT_SIZE} />
                <CheckBox
                  size={Constants.FONT_SIZE}
                  isSelected={settingsState.addExtraPanels}
                  handlePress={handleCheckMarkPress}
                />
              </View>
              {visibilityState.isSurplusPercentageVisible && (
                <View style={styles.percentageExtraContainer}>
                  <ResponsiveText title="Pourcentage" size={Constants.FONT_SIZE} />
                  <ResponsiveInput
                    title=""
                    size={Constants.FONT_SIZE}
                    input={settingsState.percentageExtraMin}
                    setInput={settingsState.setPercentageExtraMin}
                    inputStyle={styles.inputStyle}
                  />
                </View>
              )}
            </View>

            <Pressable onPress={hideModal} style={styles.closeButton}>
              <ResponsiveText
                title="Fermer"
                size={Constants.FONT_SIZE}
                style={{ color: "#0000ff" }}
              />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  titleContainer: {
    marginBottom: 10,
  },
  settingsContainer: {
    marginBottom: 15,
  },
  dropdownText: {
    color: "#2e4459",
    flex: 1,
    textAlign: "left",
  },
  textStyle: {
    textAlign: "left",
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#00aaef",
    borderRadius: 4,
    color: "#2e4459",
  },
  extraContainer: {
    flexDirection: "row",
  },
  checkMarkContainer: {
    width: "50%",
  },
  percentageExtraContainer: {
    width: "50%",
  },
  closeButton: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  closeButtonText: {
    color: "blue",
    fontSize: 18,
  },
});

export default SettingsComponent;
