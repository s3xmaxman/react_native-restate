import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import { login } from "@/lib/appwrite";
import { Redirect } from "expo-router";
import { useGlobalContext } from "@/lib/global-provider";
import icons from "@/constants/icons";
import images from "@/constants/images";

const SignIn = () => {
  const { refetch, loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/" />;

  const handleLogin = async () => {
    const result = await login();
    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image
          source={images.onboarding}
          style={styles.onboardingImage}
          resizeMode="contain"
        />

        <View style={styles.contentView}>
          <Text style={styles.welcomeText}>Welcome To Real Scout</Text>

          <Text style={styles.titleText}>
            Let's Get You Closer To {"\n"}
            <Text style={styles.primaryText}>Your Ideal Home</Text>
          </Text>

          <Text style={styles.loginText}>Login to Real Scout with Google</Text>

          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <View style={styles.loginButtonContent}>
              <Image
                source={icons.google}
                style={styles.googleIcon}
                resizeMode="contain"
              />
              <Text style={styles.loginButtonText}>Continue with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
    height: "100%",
  },
  scrollViewContent: {
    height: "100%",
  },
  onboardingImage: {
    width: "100%",
    height: "66.66%", // 4/6
  },
  contentView: {
    paddingHorizontal: 10,
  },
  welcomeText: {
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Rubik",
    color: "#222", // text-black-200
  },
  titleText: {
    fontSize: 30,
    fontFamily: "Rubik-Bold",
    color: "#333", // text-black-300
    textAlign: "center",
    marginTop: 2,
  },
  primaryText: {
    color: "#007bff", // text-primary-300
  },
  loginText: {
    fontSize: 18,
    fontFamily: "Rubik",
    color: "#222", // text-black-200
    textAlign: "center",
    marginTop: 12,
  },
  loginButton: {
    backgroundColor: "white",
    shadowColor: "#333", // shadow-zinc-300
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 999,
    width: "100%",
    paddingVertical: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  loginButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  loginButtonText: {
    fontSize: 18,
    fontFamily: "Rubik-Medium",
    color: "#333", // text-black-300
    marginLeft: 2,
  },
});

export default SignIn;
