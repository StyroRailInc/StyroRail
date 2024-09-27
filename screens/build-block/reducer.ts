// Types
import { InputState, InputAction, OpeningAction, OpeningState } from "./types/BBTypes";

function inputReducer(state: InputState, action: InputAction) {
  switch (action.type) {
    case "setLength":
      return { ...state, length: action.payload };
    case "setHeight":
      return { ...state, height: action.payload };
    case "setNInsideCorners":
      return { ...state, nInsideCorners: action.payload };
    case "setNOutsideCorners":
      return { ...state, nOutsideCorners: action.payload };
    case "setN45InsideCorners":
      return { ...state, n45InsideCorners: action.payload };
    case "setN45OutsideCorners":
      return { ...state, n45OutsideCorners: action.payload };
    default:
      return state;
  }
}

const initialState: InputState = {
  length: "",
  height: "",
  nInsideCorners: "",
  nOutsideCorners: "",
  n45InsideCorners: "",
  n45OutsideCorners: "",
};

function openingReducer(state: OpeningState, action: OpeningAction) {
  switch (action.type) {
    case "setOpeningHeight":
      return { ...state, height: action.payload };
    case "setOpeningWidth":
      return { ...state, width: action.payload };
    case "setOpeningQuantity":
      return { ...state, quantity: action.payload };
    case "addOpening":
      return { ...state, openings: [...state.openings, action.payload] };
    case "removeOpening":
      return {
        ...state,
        openings: [
          ...state.openings.slice(0, action.payload),
          ...state.openings.slice(action.payload + 1),
        ],
      };
    default:
      return state;
  }
}

const initialOpeningState: OpeningState = {
  width: "",
  height: "",
  quantity: "",
  openings: [],
};

export { inputReducer, initialState, openingReducer, initialOpeningState };
