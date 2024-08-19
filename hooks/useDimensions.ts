// React imports
import { useEffect } from "react";
import { Dimensions, ScaledSize } from "react-native";

type StateUpdater = [(value: number) => void, (width: number, size: number) => number, number];

const useDimensionsEffect = (size: number, stateUpdaters: StateUpdater[]): void => {
  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      stateUpdaters.forEach(([setter, calculateValue, minValue]) => {
        const newValue = calculateValue(window.width, size);
        setter(Math.max(newValue, minValue));
      });
    };

    const subscription = Dimensions.addEventListener("change", onChange);

    return () => {
      subscription.remove();
    };
  }, [size, stateUpdaters]);
};

export default useDimensionsEffect;
