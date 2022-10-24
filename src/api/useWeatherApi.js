import { useEffect, useState } from "react";
import geolocation from "../components/geolocation";

export default () => {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [text, location, err] = geolocation();

  const getCurrentWeather = async () => {
    if (location != null) {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&current_weather=true&timezone=auto`,
          {
            method: "GET",
            headers: {},
          }
        );
        const json = await response.json();
        // console.log(json);
        setData(json.current_weather);
      } catch (error) {
        console.error(error);
        setErrorMessage("Something went wrong");
      }
    }
  };

  useEffect(() => {
    getCurrentWeather();
  }, []);

  return [getCurrentWeather, data, errorMessage];
};
