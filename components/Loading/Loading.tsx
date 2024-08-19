import React from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from "react-native";

interface LoadingProps {
  image: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

const Loading: React.FC<LoadingProps> = ({ image, style, imageStyle }) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={image} style={[styles.image, imageStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default Loading;
