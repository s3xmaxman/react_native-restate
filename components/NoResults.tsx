import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import images from "@/constants/images";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

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
    fontFamily: fonts.bold,
    color: colors.black[300],
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: colors.black[200],
    marginTop: 8,
  },
});

export default NoResults;
