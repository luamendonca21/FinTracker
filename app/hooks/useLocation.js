import { useEffect, useState } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const requestLocationPermissions = async () => {
    const { granted } = await requestForegroundPermissionsAsync();
    if (!granted) {
      setErrorMsg("Permissão para acessar a localização recusada.");
      return;
    }
    const currentPosition = await getCurrentPositionAsync();
    setLocation(currentPosition);
    console.log("Localização atual =>", currentPosition);
  };

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  return { location, errorMsg };
};

export default useLocation;
