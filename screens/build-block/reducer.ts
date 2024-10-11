// Types
import {
  InputState,
  InputAction,
  OpeningAction,
  OpeningState,
  WallState,
  WallAction,
} from "./types/BBTypes";

// Class
import Opening from "./utils/BBCalculator/Opening";

// Utility
import { parseInput } from "@/utils/InputParser";

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
    case "modifyOpening":
      try {
        return {
          ...state,
          openings: state.openings.map((opening, index) => {
            if (index === action.payload.index) {
              let updatedOpening = {
                width: opening.width,
                height: opening.height,
                quantity: opening.quantity,
              };

              switch (action.payload.attribute) {
                case "width":
                  updatedOpening.width = action.payload.value;
                  break;
                case "height":
                  updatedOpening.height = action.payload.value;
                  break;
                case "quantity":
                  updatedOpening.quantity = action.payload.value;
                  break;
                default:
                  break;
              }

              return updatedOpening;
            }

            return opening;
          }),
        };
      } catch (erro) {}

    default:
      return state;
  }
}

const initialOpeningState: OpeningState = {
  openings: [{ width: "", height: "", quantity: "" }],
};

function wallReducer(state: WallState, action: WallAction) {
  switch (action.type) {
    case "addWall":
      return state;
      break;
  }
}

const initialWallState: WallState = {
  walls: [
    { inputState: initialState, openingState: initialOpeningState },
    { inputState: initialState, openingState: initialOpeningState },
  ],
};

export {
  inputReducer,
  initialState,
  openingReducer,
  initialOpeningState,
  wallReducer,
  initialWallState,
};
