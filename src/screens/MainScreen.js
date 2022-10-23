import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const MainScreen = () => {
  const weatherCode = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "cloudy",
    3: "overcast",
  };
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

  return (
    <View>
      <Button title="Get data" onPress={getCurrentWeather} />
      <Text>Temperature is {data.temperature} °C</Text>
      <Text>Wind speedd is {data.windspeed} Km/h</Text>
      <Text>Current weather is {weatherCode[data.weathercode]}</Text>
      <Text>Last time updated {data.time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MainScreen;
