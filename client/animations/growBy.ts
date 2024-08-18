// React imports
import { SharedValue, withSpring } from "react-native-reanimated";

// Constants
import { Constants } from "@/constants";

export const growBy = (size: number, scale: SharedValue) => {
  scale.value = withSpring(size, {
    damping: Constants.DAMPING,
    stiffness: Constants.STIFFNESS,
  });
};
