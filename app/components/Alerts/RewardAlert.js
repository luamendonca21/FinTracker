import React, { useEffect, useRef } from "react";
import { StyleSheet, Dimensions, Animated } from "react-native";

import { AppText } from "../Text";
import { LinkButton, AppButton } from "../Buttons";

import defaultStyles from "../../config/styles";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const RewardAlert = ({ isVisible, points, onPress, onContinue }) => {
  const opacityValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(opacityValue, {
        toValue: 0.4,
        duration: 400,
        useNativeDriver: true,
      }).start();

      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();

      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [opacityValue, scaleValue, isVisible]);

  return (
    <>
      <Animated.View style={[styles.overlay, { opacity: opacityValue }]} />
      <Animated.View
        style={[styles.container, { transform: [{ scale: scaleValue }] }]}
      >
        <AppText style={styles.title}>Parabéns</AppText>
        <AppText style={styles.description}>
          {points / 5 === 1
            ? `Acabaste de ganhar 5 pontos ao visitar um novo cetáceo, e desbloqueaste o seu perfil completo.`
            : `Acabaste de ganhar ${points} pontos ao visitar ${
                points / 5
              } novos cetáceos, e desbloqueaste o seu perfil completo.`}
        </AppText>
        <AppButton
          color="secondary"
          style={styles.button}
          title="Ir para o perfil do cetáceo"
          styleText={{ fontSize: 15 }}
          onPress={onPress}
        />
        <AppText style={{ fontSize: 18 }}>Ou</AppText>
        <LinkButton
          style={styles.linkButton}
          onPress={onContinue}
          title="Continuar"
          color="secondary"
        />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: defaultStyles.colors.black,
    height: "100%",
    width: "100%",
    zIndex: 1,
    backgroundColor: defaultStyles.colors.black,
  },
  container: {
    position: "absolute",
    zIndex: 1,
    borderRadius: 20,
    alignSelf: "center",
    bottom: windowHeight / 3,
    backgroundColor: defaultStyles.colors.white,
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth / 1.3,
    height: 425,
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 36,
    color: defaultStyles.colors.thirdly,
    fontWeight: "bold",
  },
  description: { fontSize: 18, textAlign: "center" },
  button: { width: "100%" },
  linkButton: { fontSize: 18 },
  // Estilos adicionais...
});

export default RewardAlert;
