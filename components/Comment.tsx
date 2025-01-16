import { View, Text, Image, StyleSheet } from "react-native";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { Models } from "react-native-appwrite";

interface Props {
  item: Models.Document;
}

const Comment = ({ item }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={styles.userName}>{item.name}</Text>
      </View>

      <Text style={styles.commentText}>{item.review}</Text>

      <View style={styles.actionsContainer}>
        <View style={styles.likeContainer}>
          <Image
            source={icons.heart}
            style={styles.icon}
            tintColor={"#0061FF"}
          />
          <Text style={styles.likeCount}>120</Text>
        </View>
        <Text style={styles.date}>
          {new Date(item.$createdAt).toDateString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  userName: {
    fontSize: 16,
    color: "#333333",
    fontFamily: "Rubik-Bold",
    marginLeft: 12,
  },
  commentText: {
    fontSize: 16,
    color: "#666666",
    fontFamily: "Rubik-Regular",
    marginTop: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
  },
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  likeCount: {
    fontSize: 14,
    color: "#333333",
    fontFamily: "Rubik-Medium",
    marginLeft: 8,
  },
  date: {
    fontSize: 14,
    color: "#999999",
    fontFamily: "Rubik-Regular",
  },
});

export default Comment;
