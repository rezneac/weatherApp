import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const MainScreen = () => {
  const [data, setData] = useState("data");
  const getMoviesFromApi = async () => {
    try {
      const response = await fetch("https://reactnative.dev/movies.json");
      const json = await response.json();
      setData(json.title);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMoviesFromApi();
  }, []);

  console.log(data);
  return (
    <View>
      <Button title="Get data" conPress={getMoviesFromApi} />
      <Text>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MainScreen;
