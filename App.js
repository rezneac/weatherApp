import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import WeatherStatus from "./src/components/WeatherStatus";
import MainScreen from "./src/screens/MainScreen";

const navigator = createStackNavigator(
  {
    Main: MainScreen,
    Weather: WeatherStatus,
  },
  {
    initialRouteName: "Main",
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
