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
  if (location == null) {
    setLocation({
      coords: {
        accuracy: 20.899999618530273,
        altitude: 126.30000305175781,
        altitudeAccuracy: 1.9488483667373657,
        heading: 0,
        latitude: 52.2690939,
        longitude: -0.8373514,
        speed: 0,
      },
      mocked: false,
      timestamp: 1667908360286,
    });
  }
  if (errorMessage) {
    text = errorMessage;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return [text, location, address, errorMessage];
};
