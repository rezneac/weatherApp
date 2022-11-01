import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Feather } from "@expo/vector-icons";
import geolocation from "../components/geolocation";
import useWeatherApi from "../api/useWeatherApi";
import WeatherStatus from "../components/WeatherStatus";

const MainScreen = ({ navigation }) => {
  const [getCurrentWeather, data, errorMessage] = useWeatherApi();
  const [text, location, address, err] = geolocation();

  useEffect(() => {
    //Runs only if location variable is changed
    getCurrentWeather();
  }, [location]);
  // console.log(address);

  return (
    <View>
      <Button title="Refresh" onPress={getCurrentWeather} />

      <View style={styles.row}>
        <Feather name="map-pin" style={styles.iconStyle} />
        <Text style={styles.addressText}>{address}</Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <WeatherStatus id={data.weathercode} />
        <View style={{ flexDirection: "row" }}>
          <Feather name="thermometer" style={styles.iconStyle} />
          <Text style={styles.currentTempText}>{data.temperature} °C</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Feather name="wind" style={styles.iconStyle} />
          <Text>{data.windspeed} Km/h</Text>

          <Feather name="droplet" style={styles.iconStyle} />
          <Text>Precipitation {data.precipitation} mm</Text>
        </View>
      </View>

      

      <Text>Last time updated {data.time}</Text>
      {/* <Text style={styles.paragraph}>{text}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: 25,
    alignSelf: "center",
    marginHorizontal: 5,
  },
  row: {
    flexDirection: "row",
    // justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: "gray",
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  addressText: {
    marginLeft: 10,
  },
  currentTempText: {
    fontWeight: "bold",
    fontSize: 25,
  },
});

export default MainScreen;
