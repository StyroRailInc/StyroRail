// React imports
import { useEffect } from "react";
import { Dimensions } from "react-native";

// Type
import { Setter } from "@/types/generalTypes";

const useWindowDimensions = (
  percentageWidth: number,
  widthSetter: Setter,
  percentageHeight?: number,
  heightSetter?: Setter
) => {
  useEffect(() => {
    const updateHeights = () => {
      const { height, width } = Dimensions.get("window");
      if (percentageHeight && heightSetter) {
        heightSetter(height * percentageHeight);
      }
      widthSetter(width * percentageWidth);
    };

    // Initial call to set heights
    updateHeights();

    const subscription = Dimensions.addEventListener("change", updateHeights);

    return () => {
      subscription.remove();
    };
  }, [percentageHeight, percentageWidth, heightSetter, widthSetter]);
};

export default useWindowDimensions;
