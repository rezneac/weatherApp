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
import WeatherIcon from "../components/WeatherIcon";
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
    <View>
      <View style={styles.mainCard}>
        {/* <Button title="Refresh" onPress={getCurrentWeather} /> */}

        <View style={styles.row}>
          <Feather name="map-pin" style={styles.iconStyle} />
          <Text style={styles.addressText}>{address}</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <WeatherIcon id={currentWeather.weathercode} />
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
            <Text style={{ color: "white", fontSize: 15 }}>
              {currentWeather.windspeed} Km/h
            </Text>

            <Feather name="droplet" style={styles.iconStyle} />
            <Text style={{ color: "white", fontSize: 15 }}>
              Humidity {humidity}%
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Feather name="sunrise" style={styles.iconStyle} />
            <Text style={{ color: "white" }}>
              {moment(data.daily.sunrise[0]).format("LT")}
            </Text>
            <Feather name="sunset" style={styles.iconStyle} />
            <Text style={{ color: "white" }}>
              {moment(data.daily.sunset[0]).format("LT")}
            </Text>
          </View>
        </View>

        <View>
          <FlatList
            data={data.hourly.weathercode.slice(0,24)}
            // keyExtractor={(item) => data.length}
            horizontal={true}
            renderItem={({ item, index }) => {
              function getIndex(time) {
                for (var i = 0; i < data.hourly.time.length; ++i) {
                  if (data.hourly.time[i] === time) {
                    return i;
                  }
                }
                return -1;
              }
              return (
                <View style={styles.forecastCard}>
                  <Text style={{ color: "white",size:32 }}>
                    {moment(data.hourly.time[index]).format("HH:mm")}
                  </Text>
                  <WeatherIcon id={item} />
                  <Text style={{ color: "white",size:32 }}>
                    {data.hourly.temperature_2m[index]} °C
                  </Text>
                </View>
              );
            }}
          />
        </View>

        <Text style={{ color: "white" }}>
          Last time updated: {moment(currentWeather.time).calendar()}
        </Text>
      </View>

      <View style={styles.forecastCard}>
        <FlatList
          data={data.daily.sunrise}
          // horizontal={true}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => {
            return (
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text style={{ color: "white", fontSize: 15 }}>
                    {moment(data.daily.time[index]).format("dddd")}{" "}
                  </Text>
                </View>
                <View style={{ flex: 2, alignItems: "center" }}>
                  <WeatherIcon id={data.daily.weathercode[index]} />
                </View>
                {/* <Text style={styles.smallText}>Sunrise:{moment(item).format("LT")}, Sunset:{moment(data.daily.sunset[index]).format("LT")}</Text> */}
                <View
                  style={{
                    alignSelf: "flex-end",
                    flexDirection: "row",
                    flex: 1,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 15 }}>
                    {data.daily.temperature_2m_max[index]}°/
                  </Text>
                  <Text style={{ color: "white", fontSize: 15 }}>
                    {data.daily.temperature_2m_min[index]}°
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  forecastCard:{
    marginLeft:3,
    marginRight:3,
    marginTop:3,
    size:30,
  },
  mainCard: {
    backgroundColor: "#283655",
    padding: 20,
    borderRadius: 45,
    margin: 10,
  },
  forecastCard: {
    backgroundColor: "#283655",
    padding: 20,
    borderRadius: 45,
    margin: 10,
    // alignItems: "center",
  },
  iconStyle: {
    fontSize: 25,
    alignSelf: "center",
    marginHorizontal: 5,
    color: "white",
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
    color: "white",
  },
  currentTempText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
  },
  smallText: {
    fontSize: 12,
    color: "white",
  },
});

export default MainScreen;
