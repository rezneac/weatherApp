import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import geolocation from "../components/geolocation";
import useWeatherApi from "../api/useWeatherApi";
import WeatherStatus from "../components/WeatherStatus";
import moment from "moment";

const MainScreen = ({ navigation }) => {
  const [getCurrentWeather, currentWeather, data, humidity, errorMessage] =
    useWeatherApi();
  const [text, location, address, err] = geolocation();

  useEffect(() => {
    //Runs again only if location variable is changed
    getCurrentWeather();
  }, [location]);

  return data === null ? (
    //Display when we haven't recived data from api yet
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    //Display when we have recived data
    <View style={styles.mainCard}>
      {/* <Button title="Refresh" onPress={getCurrentWeather} /> */}

      <View style={styles.row}>
        <Feather name="map-pin" style={styles.iconStyle} />
        <Text style={styles.addressText}>{address}</Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="weather-cloudy"
            size={32}
            color="white"
          />
          <WeatherStatus id={currentWeather.weathercode} />
        </View>

        <View style={{ flexDirection: "row" }}>
          <Feather name="thermometer" style={styles.iconStyle} />
          <Text style={styles.currentTempText}>
            {currentWeather.temperature} °C
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Feather name="wind" style={styles.iconStyle} />
          <Text style={{color:"white",fontSize:15}}>{currentWeather.windspeed} Km/h</Text>

          <Feather name="droplet" style={styles.iconStyle} />
          <Text style={{color:"white",fontSize:15}}>Humidity {humidity}%</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Feather name="sunrise" style={styles.iconStyle} />
          <Text style={{color:"white"}}>{moment(data.daily.sunrise[0]).format("LT")}</Text>
          <Feather name="sunset" style={styles.iconStyle} />
          <Text style={{color:"white"}}>{moment(data.daily.sunset[0]).format("LT")}</Text>
        </View>

        <FlatList
          data={data.daily.sunrise}
          // horizontal={true}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => {
            return (
              <Text style={styles.smallText}>
                Sunrise:{moment(item).format("LT")}, Sunset:
                {moment(data.daily.sunset[index]).format("LT")}
              </Text>
            );
          }}
        />
      </View>

      <Text style={{color:"white"}}>Last time updated: {moment(currentWeather.time).calendar()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCard: {
    backgroundColor: "#283655",
    padding: 20,
    borderRadius: 45,
    margin: 10,
  },
  iconStyle: {
    fontSize: 25,
    alignSelf: "center",
    marginHorizontal: 5,
    color:"white"
  },
  row: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderColor: "gray",
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  addressText: {
    marginLeft: 10,
    color: "white"
  },
  currentTempText: {
    fontWeight: "bold",
    fontSize: 25,
    color:"white"
  },
  smallText: {
    fontSize: 12,
    color:"white"
  },
});

export default MainScreen;
