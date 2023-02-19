import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import OptionSelector from "../components/OptionSelector";
import AppText from "../components/AppText";
import { ListDetails, ListItemSeparator } from "../components/Lists";
import PointsIndicator from "../components/PointsIndicator";
import { Carousel } from "../components/Carousels/ImageCarousel";
import IconButton from "../components/Buttons/IconButton";
import Screen from "../components/Screen";
import Icon from "../components/Icon";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "../components/BottomSheet";
import defaultStyles from "../config/styles";
import DropDownItem from "../components/DropDownItem";

const windowHeight = Dimensions.get("window").height;

function UserProfileScreen({ navigation }) {
  const details = [
    { id: 1, title: "Idade" },
    { id: 2, title: "País" },
    { id: 3, title: "Profissão" },
    { id: 4, title: "País" },
    { id: 5, title: "Idade" },
    { id: 6, title: "País" },
    { id: 7, title: "País" },
    { id: 8, title: "País" },
    { id: 9, title: "País" },
    { id: 10, title: "Pasdís" },
  ];
  const users = [
    {
      name: "Luana",
      detalhes: {
        idade: "21",
        País: "Portugal",
        contaCriadaEm: "28/07/2022",
      },
    },
  ];

  const favorites = [
    {
      id: 6,
      name: "Rough toothed Dolphin",
      details: {
        scientificName: "Steno bredanensiss",
        age: "1",
        Length: "3m",
        weigh: "650kg",
        location: "Camâra de Lobos",
      },
      imageUrl: require("../assets/dolphins/Rough_toothed_dolphin.jpg"),
      introduction:
        "They occur in Madeira all year around. Very active and playful at the surface. They often curiously approach boats and leap, bowride and stick their heads out of the water. The population of this species in Madeira consists of two ecotypes; the larger, pelagic offshore type and the smaller, coastal type with the latter community even containing resident groups.",
      history:
        "Common bottlenose dolphins get their name from their short, thick snout (or rostrum). They are generally gray in color. They can range from light gray to almost black on top near their dorsal fin and light gray to almost white on their belly.",
      migration:
        "Bottlenose dolphins of the United States migrate up and down the Atlantic coast, heading north in the spring, and south again in the autumn.",
    },
    {
      id: 4,
      name: "Frasers Dolphin",
      details: {
        scientificName: "Lagenodelphis hosei",
        age: "1",
        Length: "3m",
        weigh: "650kg",
        location: "Camâra de Lobos",
      },
      imageUrl: require("../assets/dolphins/Frasers_dolphin.jpg"),
      introduction:
        "They occur in Madeira all year around. Very active and playful at the surface. They often curiously approach boats and leap, bowride and stick their heads out of the water. The population of this species in Madeira consists of two ecotypes; the larger, pelagic offshore type and the smaller, coastal type with the latter community even containing resident groups.",
      history:
        "Common bottlenose dolphins get their name from their short, thick snout (or rostrum). They are generally gray in color. They can range from light gray to almost black on top near their dorsal fin and light gray to almost white on their belly.",
      migration:
        "Bottlenose dolphins of the United States migrate up and down the Atlantic coast, heading north in the spring, and south again in the autumn.",
    },
    {
      id: 1,
      name: "Atlantic spotted Dolphin",
      details: {
        scientificName: "Stenella frontalis",
        age: "1",
        Length: "3m",
        weigh: "650kg",
        location: "Camâra de Lobos",
      },
      imageUrl: require("../assets/dolphins/Atlantic_spotted_dolphin.jpg"),
      introduction:
        "They occur in Madeira all year around. Very active and playful at the surface. They often curiously approach boats and leap, bowride and stick their heads out of the water. The population of this species in Madeira consists of two ecotypes; the larger, pelagic offshore type and the smaller, coastal type with the latter community even containing resident groups.",
      history:
        "Common bottlenose dolphins get their name from their short, thick snout (or rostrum). They are generally gray in color. They can range from light gray to almost black on top near their dorsal fin and light gray to almost white on their belly.",
      migration:
        "Bottlenose dolphins of the United States migrate up and down the Atlantic coast, heading north in the spring, and south again in the autumn.",
    },
  ];

  const [isBottomSheetActive, setBottomSheetActive] = useState(false);
  const [detailsActive, setDetailsActive] = useState([]);
  const handleDetailItemPress = (id, title) => {
    if (!detailsActive.find((item) => item.id === id)) {
      setDetailsActive([...detailsActive, { id, title }]);
    } else {
      setDetailsActive(detailsActive.filter((elemento) => elemento.id !== id));
    }
  };
  const selectDetailItemIcon = (id) => {
    return detailsActive.find((item) => item.id === id)
      ? ["check-circle", defaultStyles.colors.white]
      : ["add-circle-outline", defaultStyles.colors.black];
  };

  const handleEditDetailsPress = () => {
    setBottomSheetActive(!isBottomSheetActive);
  };
  const handleOnChangeDetail = (text, id) => {
    let object = detailsActive.find((item) => item.id === id);
    object.value = text;
    setDetailsActive([...detailsActive]);
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Screen>
          <View style={styles.imageContainer}>
            <Icon
              onPress={() => navigation.navigate("Settings")}
              style={styles.icon}
              icon="cog-outline"
              size={26}
              iconColor={defaultStyles.colors.black}
              backgroundColor={defaultStyles.colors.white}
            />
            <Image
              style={styles.image}
              source={require("../assets/userPicture.jpg")}
            />
          </View>
          <View style={styles.profileContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.header}>
                <AppText style={styles.userName}>{users[0].name}</AppText>
                <PointsIndicator points={60} />
              </View>
              <View style={styles.body}>
                <View style={styles.detailsHeader}>
                  <AppText style={styles.title}>Detalhes</AppText>
                  <IconButton
                    style={styles.iconButton}
                    onPress={handleEditDetailsPress}
                    color={defaultStyles.colors.black}
                    name="edit"
                    size={25}
                  />
                </View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <ListDetails details={users[0].detalhes} />
                </ScrollView>
                <ListItemSeparator
                  width="100%"
                  style={{ marginVertical: 30 }}
                />
                <AppText style={styles.title}>Cetáceos Favoritos</AppText>
                <Carousel style={{ marginBottom: 15 }} data={favorites} />
                <AppText style={styles.title}>Visitados</AppText>
              </View>
            </ScrollView>
          </View>
        </Screen>
        {isBottomSheetActive ? (
          <>
            <TouchableOpacity
              style={styles.transparentContainer}
              onPress={() => setBottomSheetActive(false)}
            ></TouchableOpacity>
            <BottomSheet
              scroll
              maxValue={-windowHeight / 1.5}
              minValue={-windowHeight / 1.6}
              initialValue={-windowHeight / 1.5}
              title="Editar detalhes"
            >
              {details.map((item, index) => (
                <DropDownItem
                  key={index}
                  handleOnChange={(text) => handleOnChangeDetail(text, item.id)}
                  id={item.id}
                  title={item.title}
                  itemsActive={detailsActive}
                  onPress={() => handleDetailItemPress(item.id, item.title)}
                  name={selectDetailItemIcon(item.id)[0]}
                  color={selectDetailItemIcon(item.id)[1]}
                />
              ))}
            </BottomSheet>
          </>
        ) : (
          ""
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: defaultStyles.colors.primary },
  transparentContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: defaultStyles.colors.transparent,
  },
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
  icon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  profileContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    marginBottom: 5,
  },
  detailsHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  iconButton: {
    marginLeft: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: "justify",
  },
});

export default UserProfileScreen;
