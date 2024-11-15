// Constants
import { Constants } from "@/constants";

// Type
import { FormDataState } from "@/types/formData";

export const fetchFormworkers = async (formDataState: FormDataState) => {
  try {
    const data = await fetchFormworkerById();
    formDataState.setFormworkersData(data);
  } catch (err) {
    console.error("Error fetching formworker:", err);
  }
};

export const sendForm = async (data: string, route: string): Promise<void> => {
  return fetch(route, {
    method: "POST", // change to GET
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: data, subject: "Soumission SR.F", createAttachment: true }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {})
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

export const getFormworkerNames = (formDataState: FormDataState) => {
  return formDataState.formworkersData
    .map((formworker) => formworker.Name)
    .sort((a: string, b: string) => a.localeCompare(b));
};

export const getSelectedFormworkerData = (formDataState: FormDataState) => {
  return formDataState.formworkersData.find(
    (formworker) => formworker.Name === formDataState.selectedFormworker
  ) as unknown as string;
};

export const getShapeHeights = (formData: FormDataState): string[] => {
  if (formData.selectedFormworkerData && formData.selectedFormworkerData.Shapes) {
    // Extract the heights and remove duplicates using Set
    const uniqueHeights = [
      ...new Set(formData.selectedFormworkerData.Shapes.map((shape) => shape.Height)),
    ];
    return uniqueHeights as string[];
  }

  return [];
};

export const getNumberOfBars = (formData: FormDataState): string[] => {
  if (formData.selectedFormworkerData && formData.selectedFormworkerData.Shapes) {
    return formData.selectedFormworkerData.Shapes.filter(
      (shape) => shape.Height == formData.selectedShapeHeight
    ).map((shape) => {
      return shape.Bars;
    });
  }

  return [];
};

export const getConfiguration = (formData: FormDataState): string => {
  if (formData.selectedFormworkerData && formData.selectedFormworkerData.Shapes) {
    return formData.selectedFormworkerData.Shapes.filter(
      (shape) =>
        shape.Height == formData.selectedShapeHeight && shape.Bars == formData.selectedNumberOfBars
    ).map((shape) => {
      return shape.Congiguration; // Typo in database
    });
  }

  return "";
};

export const getClip = (formData: FormDataState): string => {
  if (formData.selectedFormworkerData && formData.selectedFormworkerData.Shapes) {
    return formData.selectedFormworkerData.Shapes.filter(
      (shape) =>
        shape.Height == formData.selectedShapeHeight && shape.Bars == formData.selectedNumberOfBars
    ).map((shape) => {
      return shape.Clip;
    });
  }

  return "";
};

const fetchFormworkerById = async (id?: string) => {
  return fetch(`${Constants.FORMWORKER_DYNAMODB_URL}/formworkers${id ? `/${id}` : ""}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    });
};
