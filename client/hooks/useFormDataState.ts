// React import
import { useState } from "react";

const useFormDataState = () => {
  const [name, setName] = useState<string>("");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<string>("");

  const [formworkersData, setFormworkersData] = useState([]);
  const [selectedFormworker, setSelectedFormworker] = useState<string | null>(null);
  const [selectedFormworkerData, setSelectedFormworkerData] = useState<string | null>(null);
  const [selectedShapeHeight, setSelectedShapeHeight] = useState<string | null>(null);
  const [selectedNumberOfBars, setSelectedNumberOfBars] = useState<string | null>(null);

  const [shapeHeightsOptions, setShapeHeightsOptions] = useState<string[]>([]);
  const [numberOfBarsOptions, setNumberOfBarsOptions] = useState<string[]>([]);

  return {
    name,
    setName,
    deliveryAddress,
    setDeliveryAddress,
    deliveryDate,
    setDeliveryDate,
    formworkersData,
    setFormworkersData,
    selectedFormworker,
    setSelectedFormworker,
    selectedFormworkerData,
    setSelectedFormworkerData,
    selectedShapeHeight,
    setSelectedShapeHeight,
    selectedNumberOfBars,
    setSelectedNumberOfBars,
    shapeHeightsOptions,
    setShapeHeightsOptions,
    numberOfBarsOptions,
    setNumberOfBarsOptions,
  };
};

export default useFormDataState;
