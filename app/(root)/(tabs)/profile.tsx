import {
  Alert,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";

import icons from "@/constants/icons";
import { settings } from "@/constants/data";

interface SettingsItemProp {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProp) => (
  <TouchableOpacity onPress={onPress} style={styles.settingsItemContainer}>
    <View style={styles.settingsItemInnerContainer}>
      <Image source={icon} style={styles.icon} />
      <Text
        style={[
          styles.settingsItemText,
          textStyle === "text-danger" && styles.dangerText,
        ]}
      >
        {title}
      </Text>
    </View>

    {showArrow && <Image source={icons.rightArrow} style={styles.arrowIcon} />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Alert.alert("Success", "Logged out successfully");
      refetch();
    } else {
      Alert.alert("Error", "Failed to logout");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Profile</Text>
          <Image source={icons.bell} style={styles.arrowIcon} />
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user?.avatar }} style={styles.avatarImage} />
            <TouchableOpacity style={styles.editButton}>
              <Image source={icons.edit} style={styles.editIcon} />
            </TouchableOpacity>

            <Text style={styles.userNameText}>{user?.name}</Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>

        <View style={styles.borderedSection}>
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View style={styles.borderedSection}>
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  settingsItemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  settingsItemInnerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  settingsItemText: {
    fontSize: 18,
    fontFamily: "Rubik-Medium",
    color: "#333333",
  },
  container: {
    height: "100%",
    backgroundColor: "white",
  },
  scrollViewContent: {
    paddingBottom: 128,
    paddingHorizontal: 28,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Rubik-Bold",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    marginTop: 20,
  },
  avatarImage: {
    width: 176,
    height: 176,
    borderRadius: 9999,
    position: "relative",
  },
  editButton: {
    position: "absolute",
    bottom: 44,
    right: 8,
  },
  editIcon: {
    width: 36,
    height: 36,
  },
  userNameText: {
    fontSize: 24,
    fontFamily: "Rubik-Bold",
    marginTop: 8,
  },
  sectionContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 40,
  },
  borderedSection: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "#0061FF33",
    paddingTop: 20,
  },
  dangerText: {
    color: "#FF0000",
  },
});

export default Profile;
