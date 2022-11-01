import React from "react";
import { View, Text, StyleSheet } from "react-native";
const WeatherStatus = (props) => {
  const weatherCode = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense intensity drizzle",
    56: "Light freezing drizzle",
    57: "Dense intensity freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy intensity rain",
    66: "Light freezing rain",
    67: "Heavy intensity freezing rain",
    71: "Slight Snow fall",
    73: "Moderate snow fall",
    75: "Heavy intensity snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Slight thunderstorm",
    99: "Heavy hail thunderstorm",
  };

  return (
    <View>
      <Text style={style.currentWeather}>{weatherCode[props.id]}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  currentWeather: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default WeatherStatus;
