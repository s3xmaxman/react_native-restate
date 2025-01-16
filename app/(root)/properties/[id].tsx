import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import icons from "@/constants/icons";
import images from "@/constants/images";
import Comment from "@/components/Comment";
import { facilities } from "@/constants/data";

import { useAppwrite } from "@/lib/useAppwrite";
import { getPropertyById } from "@/lib/appwrite";

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const windowHeight = Dimensions.get("window").height;

  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id!,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={[styles.imageContainer, { height: windowHeight / 2 }]}>
          <Image
            source={{ uri: property?.image }}
            style={styles.propertyImage}
          />
          <Image source={images.whiteGradient} style={styles.gradientOverlay} />

          <View
            style={[
              styles.headerContainer,
              {
                top: Platform.OS === "ios" ? 70 : 20,
              },
            ]}
          >
            <View style={styles.headerContent}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <Image source={icons.backArrow} style={styles.headerIcon} />
              </TouchableOpacity>

              <View style={styles.headerIcons}>
                <Image
                  source={icons.heart}
                  style={styles.headerIcon}
                  tintColor={"#191D31"}
                />
                <Image source={icons.send} style={styles.headerIcon} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.propertyTitle}>{property?.name}</Text>

          <View style={styles.ratingContainer}>
            <View style={styles.propertyType}>
              <Text style={styles.typeText}>{property?.type}</Text>
            </View>

            <View style={styles.ratingContainer}>
              <Image source={icons.star} style={styles.ratingIcon} />
              <Text style={styles.ratingText}>
                {property?.rating} ({property?.reviews.length} reviews)
              </Text>
            </View>
          </View>

          <View style={styles.featuresContainer}>
            <View style={styles.featureIconContainer}>
              <Image source={icons.bed} style={styles.featureIcon} />
            </View>
            <Text style={styles.featureText}>{property?.bedrooms} Beds</Text>

            <View style={[styles.featureIconContainer, { marginLeft: 28 }]}>
              <Image source={icons.bath} style={styles.featureIcon} />
            </View>
            <Text style={styles.featureText}>{property?.bathrooms} Baths</Text>

            <View style={[styles.featureIconContainer, { marginLeft: 28 }]}>
              <Image source={icons.area} style={styles.featureIcon} />
            </View>
            <Text style={styles.featureText}>{property?.area} sqft</Text>
          </View>

          <View style={styles.sectionDivider}>
            <Text style={styles.sectionTitle}>Agent</Text>

            <View style={styles.agentContainer}>
              <View style={styles.agentInfo}>
                <Image
                  source={{ uri: property?.agent.avatar }}
                  style={styles.agentAvatar}
                />
                <View style={styles.agentDetails}>
                  <Text style={styles.agentName}>{property?.agent.name}</Text>
                  <Text style={styles.agentEmail}>{property?.agent.email}</Text>
                </View>
              </View>

              <View style={styles.agentActions}>
                <Image source={icons.chat} style={styles.headerIcon} />
                <Image source={icons.phone} style={styles.headerIcon} />
              </View>
            </View>
          </View>

          <View style={styles.sectionDivider}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.descriptionText}>{property?.description}</Text>
          </View>

          <View style={styles.sectionDivider}>
            <Text style={styles.sectionTitle}>Facilities</Text>

            {property?.facilities.length > 0 && (
              <View style={styles.facilitiesContainer}>
                {property?.facilities.map((item: string, index: number) => {
                  const facility = facilities.find(
                    (facility) => facility.title === item
                  );

                  return (
                    <View key={index} style={styles.facilityItem}>
                      <View style={styles.facilityIconContainer}>
                        <Image
                          source={facility ? facility.icon : icons.info}
                          style={styles.facilityIcon}
                        />
                      </View>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.facilityText}
                      >
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          {property?.gallery.length > 0 && (
            <View style={styles.sectionDivider}>
              <Text style={styles.sectionTitle}>Gallery</Text>
              <FlatList
                contentContainerStyle={[
                  styles.facilitiesContainer,
                  { paddingRight: 20 },
                ]}
                data={property?.gallery}
                keyExtractor={(item) => item.$id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.image }}
                    style={styles.galleryImage}
                  />
                )}
              />
            </View>
          )}

          <View style={styles.sectionDivider}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.locationInfo}>
              <Image source={icons.location} style={styles.locationIcon} />
              <Text style={styles.locationText}>{property?.address}</Text>
            </View>
            <Image source={images.map} style={styles.mapImage} />
          </View>

          {property?.reviews.length > 0 && (
            <View style={styles.sectionDivider}>
              <View style={styles.reviewsHeader}>
                <View style={styles.reviewRating}>
                  <Image source={icons.star} style={styles.reviewRatingIcon} />
                  <Text style={styles.reviewRatingText}>
                    {property?.rating} ({property?.reviews.length} reviews)
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: 20 }}>
                <Comment item={property?.reviews[0]} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footerContainer}>
        <View style={styles.footerContent}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text numberOfLines={1} style={styles.priceValue}>
              ${property?.price}
            </Text>
          </View>

          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    paddingBottom: 128,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
  },
  propertyImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 40,
  },
  headerContainer: {
    zIndex: 50,
    position: "absolute",
    left: 28,
    right: 28,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
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
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerIcon: {
    width: 28,
    height: 28,
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 28,
    gap: 8,
  },
  propertyTitle: {
    fontSize: 24,
    color: "#333333",
    fontFamily: "Rubik-ExtraBold",
  },
  propertyType: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#E8F0FF",
    borderRadius: 20,
  },
  typeText: {
    fontSize: 12,
    color: "#0061FF",
    fontFamily: "Rubik-Bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ratingIcon: {
    width: 20,
    height: 20,
  },
  ratingText: {
    fontSize: 14,
    color: "#666666",
    fontFamily: "Rubik-Medium",
    marginTop: 4,
  },
  featuresContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  featureIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F0FF",
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  featureIcon: {
    width: 16,
    height: 16,
  },
  featureText: {
    fontSize: 14,
    color: "#333333",
    fontFamily: "Rubik-Medium",
    marginLeft: 8,
  },
  sectionDivider: {
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#E8F0FF",
    paddingTop: 28,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#333333",
    fontFamily: "Rubik-Bold",
  },
  agentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  agentInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  agentAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  agentDetails: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 12,
  },
  agentName: {
    fontSize: 18,
    color: "#333333",
    fontFamily: "Rubik-Bold",
  },
  agentEmail: {
    fontSize: 14,
    color: "#666666",
    fontFamily: "Rubik-Medium",
  },
  agentActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: "#666666",
    fontFamily: "Rubik-Regular",
    marginTop: 8,
  },
  facilitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 8,
    gap: 20,
  },
  facilityItem: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    minWidth: 64,
    maxWidth: 80,
  },
  facilityIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: "#E8F0FF",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  facilityIcon: {
    width: 24,
    height: 24,
  },
  facilityText: {
    fontSize: 14,
    color: "#333333",
    fontFamily: "Rubik-Regular",
    marginTop: 6,
    textAlign: "center",
  },
  galleryContainer: {
    marginTop: 28,
  },
  galleryImage: {
    width: 160,
    height: 160,
    borderRadius: 12,
  },
  locationContainer: {
    marginTop: 28,
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 16,
    gap: 8,
  },
  locationIcon: {
    width: 28,
    height: 28,
  },
  locationText: {
    fontSize: 14,
    color: "#666666",
    fontFamily: "Rubik-Medium",
  },
  mapImage: {
    height: 208,
    width: "100%",
    marginTop: 20,
    borderRadius: 12,
  },
  reviewsContainer: {
    marginTop: 28,
  },
  reviewsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewRatingIcon: {
    width: 24,
    height: 24,
  },
  reviewRatingText: {
    fontSize: 20,
    color: "#333333",
    fontFamily: "Rubik-Bold",
    marginLeft: 8,
  },
  viewAllText: {
    fontSize: 16,
    color: "#0061FF",
    fontFamily: "Rubik-Bold",
  },
  footerContainer: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#E8F0FF",
    padding: 28,
  },
  footerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 40,
  },
  priceContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  priceLabel: {
    fontSize: 12,
    color: "#666666",
    fontFamily: "Rubik-Medium",
  },
  priceValue: {
    fontSize: 24,
    color: "#0061FF",
    fontFamily: "Rubik-Bold",
  },
  bookButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0061FF",
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontFamily: "Rubik-Bold",
    textAlign: "center",
  },
});

export default Property;
