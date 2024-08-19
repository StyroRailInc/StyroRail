// React imports
import React, { useState, useEffect } from "react";
import { Modal, View, Pressable, StyleSheet } from "react-native";

// Components
import ImageButton from "@/components/ImageButton";
import DropdownMenu from "@/components/DropdownMenu";
import ResponsiveText from "@/components/ResponsiveText";
import ResponsiveInput from "@/components/ResponsiveInput";
import CheckBox from "@/components/CheckBox";

// Enums
import { FoamWidth, stringToEnum, CornerLength } from "@/utils/enums";

// Constants
import { Constants, icons } from "@/constants";

// Types
import { SettingsState } from "@/screens/linear-srf/types/settingsState";
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
  const [isFillersPercentageVisible, setIsFillersPercentageVisible] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

  const handleDropdownToggle = (index: number) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const showModal = (): void => {
    setIsModalVisible(true);
  };

  const hideModal = (): void => {
    setIsModalVisible(false);
    setOpenDropdownIndex(null);
  };

  useEffect(() => {
    visibilityState.setIsResultVisible(false);
    setIsFillersPercentageVisible(settingsState.chooseFillersPercentage);
  }, [settingsState.fillersPercentage, settingsState.chooseFillersPercentage]);

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
            <View style={styles.headerContainer}>
              <ResponsiveText
                title="Paramètres"
                size={Constants.TITLE_SIZE}
                style={{ textAlign: "center" }}
                header={true}
              />
            </View>
            <View style={[styles.dropdownWrapper, { zIndex: 4 }]}>
              <ResponsiveText
                title="Épaisseur du foam"
                size={Constants.FONT_SIZE}
                style={styles.labelStyle}
              />
              <DropdownMenu
                options={Object.values(FoamWidth)}
                selectedOption={settingsState.foamWidth}
                fontSize={Constants.FONT_SIZE}
                isDropdownMenuOpen={openDropdownIndex === 0}
                onSelect={(option) => {
                  settingsState.setFoamWidth(stringToEnum(FoamWidth, option));
                  visibilityState.setIsResultVisible(false);
                }}
                setIsDropdownMenuOpen={() => {
                  handleDropdownToggle(0);
                }}
              />
            </View>
            <View style={[styles.dropdownWrapper, { zIndex: 3 }]}>
              <ResponsiveText
                title="Longueur des coins"
                size={Constants.FONT_SIZE}
                style={styles.labelStyle}
              />
              <DropdownMenu
                options={Object.values(CornerLength)}
                selectedOption={settingsState.cornerLength}
                fontSize={Constants.FONT_SIZE}
                isDropdownMenuOpen={openDropdownIndex === 2}
                onSelect={(option) => {
                  settingsState.setCornerLength(stringToEnum(CornerLength, option));
                  visibilityState.setIsResultVisible(false);
                }}
                setIsDropdownMenuOpen={() => {
                  handleDropdownToggle(2);
                }}
              />
            </View>
            <View style={styles.optionsContainer}>
              <View style={styles.checkboxWrapper}>
                <ResponsiveText title="Choisir % fillers" size={Constants.FONT_SIZE} />
                <CheckBox
                  size={Constants.FONT_SIZE}
                  isSelected={settingsState.chooseFillersPercentage}
                  handlePress={() => {
                    settingsState.setChooseFillersPercentage(
                      !settingsState.chooseFillersPercentage
                    );
                    visibilityState.setIsResultVisible(false);
                  }}
                />
              </View>

              {isFillersPercentageVisible && (
                <View style={[styles.fillersPercentageWrapper, { zIndex: 0 }]}>
                  <ResponsiveText
                    title="Pourcentage"
                    size={Constants.FONT_SIZE}
                    style={styles.labelStyle}
                  />
                  <ResponsiveInput
                    title=""
                    size={Constants.FONT_SIZE}
                    input={settingsState.fillersPercentage}
                    setInput={settingsState.setFillersPercentage}
                    inputStyle={styles.inputWrapper}
                  />
                </View>
              )}
            </View>

            {/* Close modal button */}
            <Pressable onPress={hideModal} style={styles.modalFooter}>
              <ResponsiveText title="Fermer" size={Constants.FONT_SIZE} style={styles.footerText} />
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
  headerContainer: {
    marginBottom: 10,
  },
  dropdownWrapper: {
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
  },
  checkboxWrapper: {
    width: "50%",
  },
  fillersPercentageWrapper: {
    width: "50%",
  },
  labelStyle: {
    textAlign: "left",
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: "#00aaef",
    borderRadius: 4,
  },
  modalFooter: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  footerText: {
    color: "blue",
    fontSize: 18,
  },
});

export default SettingsComponent;
