import React from "react";
import { View, StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
import { ListDetails } from "../components/Lists";
import PointsIndicator from "../components/PointsIndicator";
const windowHeight = Dimensions.get("window").height;

function UserProfileScreen(props) {
  const users = [
    {
      name: "Luana",
      details: {
        age: "21",
        hometown: "Madeira",
        joinedFinTracker: "28/07/2022",
      },
    },
  ];

  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/userPicture.jpg")}
        />
      </View>

      <View style={styles.profileContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <AppText style={styles.userName}>{users[0].name}</AppText>
            <PointsIndicator />
          </View>
          <View style={styles.body}>
            <View style={styles.detailsHeader}>
              <AppText style={styles.title}>Details</AppText>
              <MaterialIcons
                style={{
                  marginTop: 15,
                  marginBottom: 5,
                }}
                name="edit"
                size={25}
              />
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <ListDetails details={users[0].details} />
            </ScrollView>
            <AppText style={styles.title}>Favorite Cetaceans</AppText>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: windowHeight / 3,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: defaultStyles.colors.primary,
  },
  image: {
    width: "50%",
    height: "50%",
    resizeMode: "cover",
    borderRadius: 100,
    aspectRatio: 1,
  },
  profileContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: defaultStyles.colors.white,
    flex: 1,
    marginTop: windowHeight / 3.5,
    padding: 15,
  },
  userName: { fontSize: 22, flex: 1, fontWeight: "bold", marginBottom: 15 },
  header: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  body: {
    marginTop: 70,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  detailsHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: 95,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: "justify",
  },
});

export default UserProfileScreen;
