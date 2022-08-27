import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import defaultStyles from "../config/styles";
import Detail from "../components/Detail";
import AppText from "../components/AppText";
function CetaceanProfileScreen(props) {
  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/dolphins/Atlantic_spotted_dolphin.jpg")}
        />
      </View>

      <View style={styles.profileContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AppText style={styles.cetaceanName}>Dolphy</AppText>
          <AppText style={styles.title}>Details</AppText>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.detailsContainer}>
              <Detail title="Age" subTitle="1" />
              <Detail title="Scientific Name" subTitle="Stenella frontalis" />
              <Detail title="Location" subTitle="Camâra de Lobos" />
            </View>
          </ScrollView>
          <AppText style={styles.title}>Introduction</AppText>
          <AppText style={styles.text}>
            They occur in Madeira all year around. Very active and playful at
            the surface. They often curiously approach boats and leap, bowride
            and stick their heads out of the water. The population of this
            species in Madeira consists of two ecotypes; the larger, pelagic
            offshore type and the smaller, coastal type with the latter
            community even containing resident groups.
          </AppText>
          <AppText style={styles.title}>History</AppText>
          <AppText style={styles.text}>
            Common bottlenose dolphins get their name from their short, thick
            snout (or rostrum). They are generally gray in color. They can range
            from light gray to almost black on top near their dorsal fin and
            light gray to almost white on their belly.
          </AppText>
          <AppText style={styles.title}>Migration</AppText>
          <AppText style={styles.text}>
            Bottlenose dolphins of the United States migrate up and down the
            Atlantic coast, heading north in the spring, and south again in the
            autumn.
          </AppText>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: "30%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "red",
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  profileContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: defaultStyles.colors.white,
    flex: 1,
    marginTop: 245,
    padding: 18,
  },
  cetaceanName: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: "justify",
  },
  detailsContainer: {
    flexDirection: "row",
    width: "100%",
    height: 80,
    padding: 1,
  },
});

export default CetaceanProfileScreen;
