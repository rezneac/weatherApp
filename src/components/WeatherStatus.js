import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WeatherStatus = (props) => {
  const weatherCode = require("../jsonFile/weatherAttributes.json");

  return (
    <View>
      <Text style={style.currentWeather}>
        {weatherCode.weatherCode[props.id]}
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  currentWeather: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
});

export default WeatherStatus;
