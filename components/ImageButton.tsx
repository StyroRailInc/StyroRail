// React imports
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Dimensions,
  Image,
  ImageSourcePropType,
  ImageStyle,
} from "react-native";

// Utility function
import calculateSize from "@/utils/CalculateSize";

// Custom hook
import useDimensionsEffect from "@/hooks/useDimensions";

// Constants
import { Constants } from "@/constants";

interface ImageButtonProps {
  imageSource: ImageSourcePropType;
  imageSize: number;
  minHeight?: number;
  minWidth?: number;
  maxHeight?: number;
  maxWidth?: number;
  style?: ImageStyle;
  handlePress: () => void;
}

const ImageButton: React.FC<ImageButtonProps> = ({
  imageSource,
  imageSize,
  minHeight = 0,
  minWidth = 0,
  maxHeight = Infinity,
  maxWidth = Infinity,
  style,
  handlePress,
}) => {
  const adjustedImageSize: number = calculateSize(Dimensions.get("window").width, imageSize);

  const [imageWidth, setImageWidth] = useState<number>(Math.max(adjustedImageSize, minWidth));
  const [imageHeight, setImageHeight] = useState<number>(Math.max(adjustedImageSize, minHeight));

  useDimensionsEffect(imageSize, [
    [setImageHeight, (width, size) => calculateSize(width, size), minHeight],
    [setImageWidth, (width, size) => calculateSize(width, size), minWidth],
  ]);

  return (
    <Pressable
      style={({ pressed }) => [
        { opacity: pressed ? Constants.HALF_OPACITY : Constants.FULL_OPACITY },
      ]}
      onPress={handlePress}
    >
      <Image
        source={imageSource}
        style={[
          styles.image,
          style,
          {
            width: imageWidth > maxWidth ? maxWidth : imageWidth,
            height: imageHeight > maxHeight ? maxHeight : imageHeight,
          },
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressableStyles: {},
  image: {
    resizeMode: "contain",
  },
});

export default ImageButton;
