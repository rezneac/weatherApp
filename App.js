import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import WeatherStatus from "./src/components/WeatherStatus";
import MainScreen from "./src/screens/MainScreen";
import TestSagas from "./src/screens/TestSaga";

const navigator = createStackNavigator(
  {
    Main: MainScreen,
    Weather: WeatherStatus,
    Test: TestSagas,
  },
  {
    initialRouteName: "Test",
    defaultNavigationOptions: {
      title: "Weather App",
      headerTintColor:"white",
      headerStyle: { elevation: 0, backgroundColor: "#283655"},

      cardStyle: { backgroundColor: "#1e1f26" },
      backgroundColor: "black",
    },
  }
);

export default createAppContainer(navigator);
