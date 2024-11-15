// Rreact imports
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

// Component
import FormModal from "@/components/FormModal";
import ResponsiveText from "@/components/ResponsiveText";
import DropdownMenu from "@/components/DropdownMenu";
import ResponsiveInput from "@/components/ResponsiveInput";

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

interface DrawerSendFormProps {
  data: any; // Object
  route: string;
}

const DrawerSendForm: React.FC<DrawerSendFormProps> = ({ data, route }) => {
  const formDataState = useFormDataState();
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

  const handleDropdownToggle = (index: number) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

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

  const handleSubmitPress = () => {
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
  };

  return (
    <FormModal buttonTitle="Envoyer" modalTitle="Formulaire" handleSubmit={handleSubmitPress}>
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
    </FormModal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#00aaef",
    borderRadius: 4,
  },
});

export default DrawerSendForm;
