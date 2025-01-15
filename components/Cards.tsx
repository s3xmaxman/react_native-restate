import { StyleSheet } from "react-native";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Models } from "react-native-appwrite";

interface Props {
  item: Models.Document;
  onPress?: () => void;
}

export const FeaturedCard = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.featuredContainer}>
      <Image source={{ uri: item.image }} style={styles.featuredImage} />

      <Image source={images.cardGradient} style={styles.featuredGradient} />

      <View style={styles.ratingContainer}>
        <Image source={icons.star} style={styles.ratingIcon} />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>

      <View style={styles.featuredContent}>
        <Text style={styles.featuredTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.featuredAddress} numberOfLines={1}>
          {item.address}
        </Text>

        <View style={styles.featuredPriceContainer}>
          <Text style={styles.featuredPrice}>${item.price}</Text>
          <Image source={icons.heart} style={styles.featuredHeartIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.ratingContainer}>
        <Image
          source={icons.star}
          style={[styles.ratingIcon, { width: 10, height: 10 }]}
        />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>

      <Image source={{ uri: item.image }} style={styles.cardImage} />

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardAddress}>{item.address}</Text>

        <View style={styles.cardPriceContainer}>
          <Text style={styles.cardPrice}>${item.price}</Text>
          <Image source={icons.heart} style={styles.cardHeartIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

// 直接定義するカラースキーム
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

// 直接定義するフォントスタイル
const fonts = {
  bold: "Rubik-Bold",
  extrabold: "Rubik-ExtraBold",
  regular: "Rubik-Regular",
};

const styles = StyleSheet.create({
  featuredContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: 240,
    height: 320,
    position: "relative",
  },
  featuredImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  featuredGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    position: "absolute",
    bottom: 0,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    position: "absolute",
    top: 20,
    right: 20,
  },
  ratingIcon: {
    width: 14,
    height: 14,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: fonts.bold,
    color: colors.primary[300],
    marginLeft: 4,
  },
  featuredContent: {
    flexDirection: "column",
    alignItems: "flex-start",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  featuredTitle: {
    fontSize: 20,
    fontFamily: fonts.extrabold,
    color: colors.white,
  },
  featuredAddress: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  featuredPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  featuredPrice: {
    fontSize: 20,
    fontFamily: fonts.extrabold,
    color: colors.white,
  },
  featuredHeartIcon: {
    width: 20,
    height: 20,
  },

  // Cardコンポーネントのスタイル
  cardContainer: {
    flex: 1,
    width: "100%",
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: colors.white,
    shadowColor: colors.black[100],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: 160,
    borderRadius: 8,
  },
  cardContent: {
    flexDirection: "column",
    marginTop: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.black[300],
  },
  cardAddress: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.black[100],
    marginTop: 4,
  },
  cardPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  cardPrice: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.primary[300],
  },
  cardHeartIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: colors.black[100],
  },
});
