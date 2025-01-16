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
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

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

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 8,
  },
  categoryButton: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  selectedCategory: {
    backgroundColor: colors.primary[300],
  },
  unselectedCategory: {
    backgroundColor: colors.primary[100],
    borderWidth: 1,
    borderColor: colors.primary[200],
  },
  categoryText: {
    fontSize: 14,
  },
  selectedText: {
    color: colors.white,
    fontFamily: fonts.bold,
    marginTop: 2,
  },
  unselectedText: {
    color: colors.black[300],
    fontFamily: fonts.regular,
  },
});

export default Filters;
