import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGlobalContext } from "@/lib/global-provider";

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activityIndicator: {
    color: "#93c5fd",
  },
});

export default function AppLayout() {
  const { loading, isLogged } = useGlobalContext();

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator
          color={styles.activityIndicator.color}
          size="large"
        />
      </SafeAreaView>
    );
  }

  if (!isLogged) {
    return <Redirect href="/sign-in" />;
  }

  return <Slot />;
}
