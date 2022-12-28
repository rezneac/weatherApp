import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import store from "../redux-saga/store";

// import { changeText } from "../redux-saga/actions";
// import { Provider } from "react-redux";

const TestSagas = (props) => {
  const [text, setText] = useState([store.getState().updateText.text]);
  const [number, setNumber] = useState([store.getState().updateNumber.number]);

  const onPress = () => {
    store.dispatch({ type: "SET_TEXT", text: "Testing dispatch" });
    setText(store.getState().updateText.text);
  };

  const onPlus = () => {
    store.dispatch({ type: "UPDATE_VALUE", payload: 1 });
    setNumber(store.getState().updateNumber.number);
  };
  const onMinus = () => {
    store.dispatch({ type: "UPDATE_VALUE", payload: -1 });
    setNumber(store.getState().updateNumber.number);
  };

  return (
    <View>
      <Button title="dispatch" onPress={onPress} />
      <Button
        title="Log value"
        onPress={() => console.log(store.getState().updateText.text)}
      />

      <Text>{text}</Text>

      <Button title="INCREMENT" onPress={onPlus} />
      <Button title="DECREMENT" onPress={onMinus} />

      <Text>{number}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TestSagas;
