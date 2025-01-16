import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";

import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";

import { getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";

const Explore = () => {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={properties}
        numColumns={2}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.flatListContainer}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" style={styles.loadingIndicator} />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <Image source={icons.backArrow} style={styles.headerIcon} />
              </TouchableOpacity>

              <Text style={styles.headerText}>Search for Your Ideal Home</Text>
              <Image source={icons.bell} style={styles.notificationIcon} />
            </View>

            <Search />

            <View style={styles.filterContainer}>
              <Filters />

              <Text style={styles.resultText}>
                Found {properties?.length} Properties
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  flatListContainer: {
    paddingBottom: 128,
  },
  columnWrapper: {
    flexDirection: "row",
    gap: 20,
    paddingHorizontal: 20,
  },
  headerContainer: {
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  backButton: {
    flexDirection: "row",
    backgroundColor: "#E8F0FF",
    borderRadius: 28,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  headerIcon: {
    width: 20,
    height: 20,
  },
  headerText: {
    fontSize: 16,
    color: "#333333",
    fontFamily: "Rubik-Medium",
    textAlign: "center",
    marginRight: 8,
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  filterContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 20,
    color: "#333333",
    fontFamily: "Rubik-Bold",
    marginTop: 20,
  },
  loadingIndicator: {
    marginTop: 20,
    color: "#0061FF",
  },
});

export default Explore;
