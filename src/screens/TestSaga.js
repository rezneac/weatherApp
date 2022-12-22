import React, { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
//Get store data
import store from "../redux-saga/store";

import { changeText } from "../redux-saga/dispatcher";

const TestSagas = (props) => {
  const [text, setText] = useState([store.getState().text]);

  return (
    <View>
      <Button
        title="dispatch"
        onPress={() => {
          changeText("Testing dispatcher");
        }}
      />
      <Button
        title="Log value"
        onPress={() => console.log(store.getState().text)}
      />

      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TestSagas;
