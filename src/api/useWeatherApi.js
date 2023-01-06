import { useEffect, useState } from "react";
import geolocation from "../components/geolocation";
import store from "../redux-saga/store";

export default () => {
  const [currentWeather, setCurrentWeather] = useState([]);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [text, location, err] = geolocation();
  const [humidity, setHumidity] = useState();

  const getCurrentWeather = async () => {
    if (location != null) {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&hourly=temperature_2m,weathercode,relativehumidity_2m,precipitation&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=auto`,
          {
            method: "GET",
            headers: {},
          }
        );
        const json = await response.json();
        setCurrentWeather(json.current_weather);
        setData(json);
        store.dispatch({ type: "SET_TEXT", text: json });

        humidityData(json);
      } catch (error) {
        console.error(error);
        setErrorMessage("Something went wrong");
      }
    }
  };

  const humidityData = (json) => {
    //Getting index of time and finding right humidity value
    var currentTime = currentWeather.time;
    var index = 0;
    for (let i = 0; i < 168; i++) {
      if (currentTime === json.hourly.time[i]) {
        index = i;
        break;
      }
    }
    setHumidity(json.hourly.relativehumidity_2m[index]);
    
  };

  return [getCurrentWeather, humidity, errorMessage];
};
