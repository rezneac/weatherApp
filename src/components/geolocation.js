import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default () => {
    const [location, setLocation] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMessage("Permission to access location was denied");
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
  
    let text = "Waiting..";
    if (errorMessage) {
      text = errorMessage;
    } else if (location) {
      text = JSON.stringify(location);
    }
    
    
    return [text,location,errorMessage];
};
