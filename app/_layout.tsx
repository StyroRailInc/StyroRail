// Expo import
import { Tabs } from "expo-router";
import { useFonts } from "expo-font";

// React import
import { useEffect } from "react";
import { View, Image, Text, StyleSheet, ImageSourcePropType } from "react-native";

// Component
import ResponsiveText from "@/components/ResponsiveText";

// Constants
import { Constants, icons } from "@/constants";

const HeaderTitle = () => (
  <ResponsiveText
    title="StyroRail"
    size={Constants.FONT_SIZE}
    style={{ color: "white" }}
    header={true}
  />
);

type TabIconProps = {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
};

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View style={styles.container}>
      <Image source={icon} resizeMode="contain" style={[styles.icon, { tintColor: color }]} />
      <Text
        style={[
          styles.text,
          {
            fontFamily: focused ? "Poppins-SemiBold" : "Poppins-Regular",
            color: color,
          },
        ]}
        numberOfLines={1}
      >
        {name}
      </Text>
    </View>
  );
};

export default function Layout() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("@/assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("@/assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("@/assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("@/assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("@/assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#00aaef",
        tabBarHideOnKeyboard: true,
        tabBarVisibilityAnimationConfig: {
          show: { animation: "timing", config: { duration: 0 } },
          hide: { animation: "timing", config: { duration: 0 } },
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#00aaef",
          },
          headerTitleAlign: "center",
          headerTitle: () => <HeaderTitle />,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.brickWall} color={color} name="SR.F Dessin" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="linear-srf"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#00aaef",
          },
          headerTitleAlign: "center",
          headerTitle: () => <HeaderTitle />,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.brickWall} color={color} name="SR.F Linéaire" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="build-block"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#00aaef",
          },
          headerTitleAlign: "center",
          headerTitle: () => <HeaderTitle />,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.brickWall} color={color} name="Build Block" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  text: {
    textAlign: "center",
  },
});
