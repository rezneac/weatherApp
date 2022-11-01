import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default () => {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [address, setAddress] = useState([]);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMessage("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    const place = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    //Find city in array of place from reverseGeocodeAsync
    place.find((p) => {
      city = `${p.postalCode}, ` + `${p.subregion}`;
      setAddress(city);
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  let text = "Waiting to get location...";
  if (errorMessage) {
    text = errorMessage;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return [text, location, address, errorMessage];
};
