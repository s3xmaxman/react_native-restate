import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import images from "@/constants/images";

const NoResults = () => {
  return (
    <View style={styles.container}>
      <Image source={images.noResult} style={styles.image} />
      <Text style={styles.title}>No Result</Text>
      <Text style={styles.description}>We could not find any result</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: "91.67%",
    height: 320,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontFamily: "Rubik-Bold",
    color: "#333333",
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: "#666666",
    marginTop: 8,
  },
});

export default NoResults;
