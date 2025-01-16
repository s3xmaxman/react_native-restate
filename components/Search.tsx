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
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

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
    <View style={styles.searchWrapper}>
      <View style={styles.searchBar}>
        <Image source={icons.search} style={styles.searchIcon} />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          style={styles.searchInput}
          placeholderTextColor={colors.black[200]}
        />
      </View>

      <TouchableOpacity style={styles.filterButton}>
        <Image source={icons.filter} style={styles.filterIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.primary[100],
    borderWidth: 1,
    borderColor: colors.primary[200],
    marginTop: 20,
    paddingVertical: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 50,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  searchInput: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.black[300],
    marginLeft: 8,
    flex: 1,
  },
  filterButton: {
    marginLeft: 12,
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
});

export default Search;
