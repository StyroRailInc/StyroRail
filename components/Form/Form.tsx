// React imports
import React, { useState, useEffect } from "react";
import { Modal, View, Pressable, StyleSheet, ScrollView } from "react-native";

// Components
import ResponsiveInput from "@/components/ResponsiveInput/ResponsiveInput";
import ResponsiveText from "@/components/ResponsiveText";
import ResponsiveButton from "@/components/ResponsiveButton";
import DropdownMenu from "@/components/DropdownMenu";

// Constants
import { Constants } from "@/constants";

// Custom hooks
import useFormDataState from "@/hooks/useFormDataState";

// Helper functions
import {
  sendForm,
  getConfiguration,
  getClip,
  getNumberOfBars,
  getShapeHeights,
  getFormworkerNames,
  getSelectedFormworkerData,
  fetchFormworkers,
} from "./helpers";

interface FormProps {
  data: any; // Object
  route: string;
}

const Form: React.FC<FormProps> = ({ data, route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const formDataState = useFormDataState();

  // Fetch formWorkers when component mounts
  useEffect(() => {
    fetchFormworkers(formDataState);
  }, []);

  useEffect(() => {
    formDataState.setSelectedFormworkerData(getSelectedFormworkerData(formDataState));
  }, [formDataState.selectedFormworker]);

  useEffect(() => {
    formDataState.setShapeHeightsOptions(getShapeHeights(formDataState));
  }, [formDataState.selectedFormworkerData]);

  useEffect(() => {
    formDataState.setNumberOfBarsOptions(getNumberOfBars(formDataState));
  }, [formDataState.selectedShapeHeight]);

  const handleDropdownToggle = (index: number) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleSendPress = () => {
    const updatedData = JSON.stringify({
      ...data,
      nom: formDataState.selectedFormworker,
      deliveryAddress: formDataState.deliveryAddress,
      deliveryDate: formDataState.deliveryDate,
      shapeHeight: formDataState.selectedShapeHeight,
      numberOfBars: formDataState.selectedNumberOfBars,
      configuration: getConfiguration(formDataState),
      clip: getClip(formDataState),
    });
    sendForm(updatedData, route);
    setIsModalVisible(false);
  };

  return (
    <View>
      <ResponsiveButton
        title={"Envoyer"}
        size={Constants.FONT_SIZE}
        style={{ width: "100%" }}
        useAnimation={true}
        handlePress={() => setIsModalVisible(true)}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxWidth: Constants.MAX_MODAL_WIDTH }]}>
            <View style={styles.titleContainer}>
              <ResponsiveText
                title="Formulaire"
                size={Constants.TITLE_SIZE}
                style={{ textAlign: "center" }}
                header={true}
              />
            </View>

            <View style={[styles.inputContainer, { zIndex: 10 }]}>
              <ResponsiveText
                title="Nom du coffreur"
                size={Constants.FONT_SIZE}
                style={{ textAlign: "left" }}
              />
              <DropdownMenu
                options={getFormworkerNames(formDataState)}
                selectedOption={formDataState.selectedFormworker ?? "Sélectionnez"}
                fontSize={Constants.FONT_SIZE}
                isDropdownMenuOpen={openDropdownIndex === 0}
                onSelect={(option) => {
                  formDataState.setSelectedFormworker(option);
                  formDataState.setSelectedShapeHeight(null);
                  formDataState.setSelectedNumberOfBars(null);
                }}
                setIsDropdownMenuOpen={() => {
                  handleDropdownToggle(0);
                }}
              />
            </View>

            <View style={[styles.inputContainer, { zIndex: 9 }]}>
              <ResponsiveText
                title="Hauteur des formes"
                size={Constants.FONT_SIZE}
                style={{ textAlign: "left" }}
              />
              <DropdownMenu
                options={formDataState.shapeHeightsOptions}
                selectedOption={formDataState.selectedShapeHeight ?? "Sélectionnez"}
                fontSize={Constants.FONT_SIZE}
                isDropdownMenuOpen={openDropdownIndex === 1}
                onSelect={(option) => {
                  formDataState.setSelectedShapeHeight(option);
                  formDataState.setSelectedNumberOfBars(null);
                }}
                setIsDropdownMenuOpen={() => {
                  handleDropdownToggle(1);
                }}
              />
            </View>

            <View style={[styles.inputContainer, { zIndex: 8 }]}>
              <ResponsiveText
                title="Nombre de bars"
                size={Constants.FONT_SIZE}
                style={{ textAlign: "left" }}
              />
              <DropdownMenu
                options={formDataState.numberOfBarsOptions}
                selectedOption={formDataState.selectedNumberOfBars ?? "Sélectionnez"}
                fontSize={Constants.FONT_SIZE}
                isDropdownMenuOpen={openDropdownIndex === 2}
                onSelect={(option) => {
                  formDataState.setSelectedNumberOfBars(option);
                }}
                setIsDropdownMenuOpen={() => {
                  handleDropdownToggle(2);
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <ResponsiveText
                title="Lieu de livraison"
                size={Constants.FONT_SIZE}
                style={{ textAlign: "left" }}
              />
              <ResponsiveInput
                title=""
                size={Constants.FONT_SIZE}
                input={formDataState.deliveryAddress}
                inputStyle={styles.inputStyle}
                setInput={formDataState.setDeliveryAddress}
              />
            </View>

            <View style={styles.inputContainer}>
              <ResponsiveText
                title="Date de livraison"
                size={Constants.FONT_SIZE}
                style={{ textAlign: "left" }}
              />
              <ResponsiveInput
                title=""
                size={Constants.FONT_SIZE}
                input={formDataState.deliveryDate}
                inputStyle={styles.inputStyle}
                setInput={formDataState.setDeliveryDate}
              />
            </View>

            <View style={styles.bottomTab}>
              <Pressable onPress={() => setIsModalVisible(false)}>
                <ResponsiveText
                  title={"Fermer"}
                  size={Constants.FONT_SIZE}
                  style={{ color: "#0000ff" }}
                />
              </Pressable>
              <Pressable onPress={handleSendPress}>
                <ResponsiveText
                  title={"Envoyer"}
                  size={Constants.FONT_SIZE}
                  style={{ color: "#0000ff" }}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  inputContainer: {
    marginTop: 10,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#00aaef",
    borderRadius: 4,
  },
  bottomTab: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 15,
  },
});

export default Form;
