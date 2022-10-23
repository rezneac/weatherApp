import { useEffect, useState } from "react";

export default () => {
  const [data, setData] = useState([]);

  const getCurrentWeather = async () => {
    try {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=52.2688&longitude=-0.8373&current_weather=true&timezone=auto",
        {
          method: "GET",
          headers: {},
        }
      );
      const json = await response.json();
      console.log(json);
      setData(json.current_weather);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentWeather();
  }, []);

  return [getCurrentWeather, data, error];
};
