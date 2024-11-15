// React imports
import React, { useState } from "react";
import { View, Modal, StyleSheet, ViewStyle, Pressable } from "react-native";

// Components
import ResponsiveButton from "./ResponsiveButton";
import ResponsiveText from "./ResponsiveText";

// Constants
import { Constants } from "@/constants";

interface FormModalProps {
  buttonTitle: string;
  modalTitle: string;
  children: any;
  animationType?: "slide" | "none" | "fade" | undefined;
  useAnimation?: boolean;
  buttonStyle?: ViewStyle;
  modalStyle?: ViewStyle;
  handleSubmit: () => void;
  closeModal?: () => void;
  onModalClose?: () => void;
}

const FormModal: React.FC<FormModalProps> = ({
  buttonTitle = "Open",
  modalTitle = "Form",
  children,
  animationType = "slide",
  useAnimation = true,
  buttonStyle = {},
  modalStyle = {},
  handleSubmit,
  onModalClose,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpen = () => setIsModalVisible(true);
  const handleClose = () => {
    setIsModalVisible(false);
    if (onModalClose) onModalClose();
  };

  return (
    <View style={{ width: "100%" }}>
      <ResponsiveButton
        title={buttonTitle}
        size={Constants.FONT_SIZE}
        style={buttonStyle}
        useAnimation={useAnimation}
        handlePress={handleOpen}
      />

      <Modal
        animationType={animationType}
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleClose}
      >
        <View style={[styles.modalOverlay]}>
          <View style={[styles.modalContent, modalStyle, { maxWidth: Constants.MAX_MODAL_WIDTH }]}>
            <View style={styles.titleContainer}>
              <ResponsiveText
                title={modalTitle}
                size={Constants.FONT_SIZE}
                header={true}
                style={{ textAlign: "center" }}
              />
            </View>

            <View style={styles.inputContainer}>{children}</View>
            <View style={styles.bottomTab}>
              <Pressable onPress={() => setIsModalVisible(false)}>
                <ResponsiveText
                  title={"Fermer"}
                  size={Constants.FONT_SIZE}
                  style={{ color: "#0000ff" }}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  handleSubmit();
                  handleClose();
                }}
              >
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
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  titleContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    zIndex: 10,
  },
  bottomTab: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 15,
  },
});

export default FormModal;
