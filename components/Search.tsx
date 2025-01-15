import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { useDebouncedCallback } from "use-debounce";

import icons from "@/constants/icons";
import { useLocalSearchParams, router, usePathname } from "expo-router";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();

  const [search, setSearch] = useState(params.query);

  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  }, 500);

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image source={icons.search} style={styles.icon} />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <TouchableOpacity>
        <Image source={icons.filter} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#F3F4F6", // bg-accent-100
    borderWidth: 1,
    borderColor: "#D1D5DB", // border-primary-100
    marginTop: 20,
    paddingVertical: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 50,
  },
  icon: {
    width: 20,
    height: 20,
  },
  input: {
    fontSize: 14,
    fontFamily: "Rubik-Regular",
    color: "#374151", // text-black-300
    marginLeft: 8,
    flex: 1,
  },
});

export default Search;
