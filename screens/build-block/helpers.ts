import { parseInput } from "@/utils/InputParser";
import { InputAction, WallState } from "./types/BBTypes";

export function validateInput(
  i: number,
  scrollViewRef: React.MutableRefObject<any>,
  wallState: WallState,
  wallDispatch: React.Dispatch<any>,
  inputDispatch: React.Dispatch<any>,
  inputAction: InputAction
) {
  let parsedHeight = null;
  try {
    parsedHeight = parseInput(wallState.walls[i].inputState.height, true, false);
  } catch (error) {
    wallDispatch({ type: "setPressedWallIndex", payload: i });
    inputDispatch(inputAction);
    scrollViewRef.current.scrollTo({
      y: 0,
      animated: true,
    });
  }
  return parsedHeight;
}
