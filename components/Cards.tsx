import { StyleSheet } from "react-native";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Models } from "react-native-appwrite";
import { colors } from "@/constants/colors";

interface Props {
  item: Models.Document;
  onPress?: () => void;
}

// 共通スタイルの抽出
const commonStyles = StyleSheet.create({
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
    fontFamily: "Rubik-Bold",
    color: colors.primary[300],
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  heartIcon: {
    width: 20,
    height: 20,
  },
});

export const FeaturedCard = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.featuredContainer}>
      <Image source={{ uri: item.image }} style={styles.featuredImage} />
      <Image source={images.cardGradient} style={styles.featuredGradient} />

      <View style={commonStyles.ratingContainer}>
        <Image source={icons.star} style={commonStyles.ratingIcon} />
        <Text style={commonStyles.ratingText}>{item.rating}</Text>
      </View>

      <View style={styles.featuredContent}>
        <Text style={styles.featuredTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.featuredAddress} numberOfLines={1}>
          {item.address}
        </Text>

        <View style={commonStyles.priceContainer}>
          <Text style={styles.featuredPrice}>${item.price}</Text>
          <Image source={icons.heart} style={commonStyles.heartIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={[commonStyles.ratingContainer, { top: 12, right: 12 }]}>
        <Image
          source={icons.star}
          style={[commonStyles.ratingIcon, { width: 10, height: 10 }]}
        />
        <Text style={commonStyles.ratingText}>{item.rating}</Text>
      </View>

      <Image source={{ uri: item.image }} style={styles.cardImage} />

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardAddress}>{item.address}</Text>

        <View style={commonStyles.priceContainer}>
          <Text style={styles.cardPrice}>${item.price}</Text>
          <Image
            source={icons.heart}
            style={[commonStyles.heartIcon, { tintColor: colors.black[100] }]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
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
    fontFamily: "Rubik-ExtraBold",
    color: colors.white,
  },
  featuredAddress: {
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    color: colors.white,
  },
  featuredPrice: {
    fontSize: 20,
    fontFamily: "Rubik-ExtraBold",
    color: colors.white,
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
    fontFamily: "Rubik-Bold",
    color: colors.black[300],
  },
  cardAddress: {
    fontSize: 12,
    fontFamily: "Rubik-Regular",
    color: colors.black[100],
    marginTop: 4,
  },
  cardPrice: {
    fontSize: 16,
    fontFamily: "Rubik-Bold",
    color: colors.primary[300],
  },
});

export default { FeaturedCard, Card };
