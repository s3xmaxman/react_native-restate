import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import icons from "@/constants/icons";

import Search from "@/components/Search";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import { Card, FeaturedCard } from "@/components/Cards";

import { useAppwrite } from "@/lib/useAppwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { getLatestProperties, getProperties } from "@/lib/appwrite";

const Index = () => {
  const { user } = useGlobalContext();

  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
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
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color={colors.primary[300]}
              style={styles.loadingIndicator}
            />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <View style={styles.userInfoContainer}>
              <View style={styles.userAvatarContainer}>
                <Image
                  source={{ uri: user?.avatar }}
                  style={styles.userAvatar}
                />

                <View style={styles.userTextContainer}>
                  <Text style={styles.greetingText}>Good Morning</Text>
                  <Text style={styles.userName}>{user?.name}</Text>
                </View>
              </View>
              <Image source={icons.bell} style={styles.bellIcon} />
            </View>

            <Search />

            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Featured</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
              </View>

              {latestPropertiesLoading ? (
                <ActivityIndicator size="large" color={colors.primary[300]} />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList
                  data={latestProperties}
                  renderItem={({ item }) => (
                    <FeaturedCard
                      item={item}
                      onPress={() => handleCardPress(item.$id)}
                    />
                  )}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.featuredListContent}
                />
              )}
            </View>

            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Our Recommendation</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
              </View>

              <Filters />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const colors = {
  primary: {
    300: "#FF6347", // 鮮やかなオレンジ
  },
  black: {
    100: "#191D31", // 濃いグレー
    300: "#333333", // 中間グレー
  },
  white: "#FFFFFF", // 純白
};

const fonts = {
  bold: "Rubik-Bold",
  medium: "Rubik-Medium",
  regular: "Rubik-Regular",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listContent: {
    paddingBottom: 128, // pb-32
  },
  columnWrapper: {
    gap: 20, // gap-5
    paddingHorizontal: 20, // px-5
  },
  loadingIndicator: {
    marginTop: 20, // mt-5
  },
  headerContainer: {
    paddingHorizontal: 20, // px-5
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20, // mt-5
  },
  userAvatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  userTextContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 8, // ml-2
  },
  greetingText: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.black[100],
  },
  userName: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.black[300],
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
  sectionContainer: {
    marginVertical: 20, // my-5
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.black[300],
  },
  seeAllText: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.primary[300],
  },
  featuredListContent: {
    gap: 20, // gap-5
    marginTop: 20, // mt-5
  },
});

export default Index;
