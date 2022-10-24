import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import geolocation from "../components/geolocation";
import useWeatherApi from "../api/useWeatherApi";

const MainScreen = (props) => {
  const weatherCode = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "cloudy",
    3: "overcast",
  };
  const [text, location, err] = geolocation();
  const [getCurrentWeather, data, errorMessage] = useWeatherApi();


  return (
    <View>
      <Button title="Get data" onPress={getCurrentWeather} />
      <Text>Temperature is {data.temperature} °C</Text>
      <Text>Wind speedd is {data.windspeed} Km/h</Text>
      <Text>Current weather is {weatherCode[data.weathercode]}</Text>
      <Text>Last time updated {data.time}</Text>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MainScreen;
