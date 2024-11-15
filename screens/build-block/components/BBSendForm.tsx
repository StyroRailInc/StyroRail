// React imports
import React from "react";

// Components
import FormModal from "@/components/FormModal";
import ResponsiveButton from "@/components/ResponsiveButton";

// Constants
import { Constants } from "@/constants";

interface BBSendFormProps {}

const BBSendForm: React.FC<BBSendFormProps> = () => {
  const handleSubmit = () => {};
  return (
    <FormModal
      buttonTitle="Envoyer"
      modalTitle="Formulaire"
      modalStyle={{ width: "30%" }}
      handleSubmit={handleSubmit}
    >
      <ResponsiveButton title="Hi" size={Constants.FONT_SIZE} handlePress={() => {}} />
    </FormModal>
  );
};

export default BBSendForm;
