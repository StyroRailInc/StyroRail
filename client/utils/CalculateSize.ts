// Constants
import { Constants } from "@/constants";

const calculateSize = (width: number, size: number): number => {
  const baseWidth: number = Constants.APP_BASE_WIDTH;
  const scale: number = width / baseWidth;
  return Math.round(size * scale);
};

export default calculateSize;
