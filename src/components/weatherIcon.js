import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const weatherIcon = (props) => {
  const weatherIcon = require("../jsonFile/weatherAttributes.json");

  return (
    <View>
      <MaterialCommunityIcons
        name={weatherIcon.weatherIcon[props.id]}
        size={32}
        color="white"
      />
    </View>
  );
};

const style = StyleSheet.create({});

export default weatherIcon;
