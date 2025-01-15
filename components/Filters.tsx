import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";

const Filters = () => {
  const params = useLocalSearchParams<{ filters?: string }>();

  const [selectedCategory, setSelectedCategory] = useState(
    params.filters || "All"
  );

  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
      router.setParams({ filters: "" });
      return;
    }

    setSelectedCategory(category);
    router.setParams({ filters: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          onPress={() => handleCategoryPress(item.category)}
          key={index}
          style={[
            styles.categoryButton,
            selectedCategory === item.category
              ? styles.selectedCategory
              : styles.unselectedCategory,
          ]}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === item.category
                ? styles.selectedText
                : styles.unselectedText,
            ]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

// Cards.tsxで定義した色とフォントを再利用
const colors = {
  primary: {
    100: "#FFE5E0", // 薄いオレンジ
    200: "#FFC7B8", // 中間オレンジ
    300: "#FF6347", // 鮮やかなオレンジ
  },
  black: {
    300: "#333333", // 中間グレー
  },
  white: "#FFFFFF", // 純白
};

const fonts = {
  bold: "Rubik-Bold",
  regular: "Rubik-Regular",
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12, // mt-3
    marginBottom: 8, // mb-2
  },
  categoryButton: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: 16, // mr-4
    paddingHorizontal: 16, // px-4
    paddingVertical: 8, // py-2
    borderRadius: 999, // rounded-full
  },
  selectedCategory: {
    backgroundColor: colors.primary[300], // bg-primary-300
  },
  unselectedCategory: {
    backgroundColor: colors.primary[100], // bg-primary-100
    borderWidth: 1, // border
    borderColor: colors.primary[200], // border-primary-200
  },
  categoryText: {
    fontSize: 14, // text-sm
  },
  selectedText: {
    color: colors.white, // text-white
    fontFamily: fonts.bold, // font-rubik-bold
    marginTop: 2, // mt-0.5
  },
  unselectedText: {
    color: colors.black[300], // text-black-300
    fontFamily: fonts.regular, // font-rubik
  },
});

export default Filters;
