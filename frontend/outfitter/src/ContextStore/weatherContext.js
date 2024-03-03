import { createContext, useState } from "react";
import backport from "../helpers/backendport";
export const WeatherContext = createContext({
  weatherConditions: [],
  fetchAllWeahterConditions: () => {},
});
export const WeahterProvider = (props) => {
  const [weatherConditions, setweatherConditions] = useState([]);

  //fn to fetch all weather conditions
  const fetchAllWeahterConditions = async () => {
    try {
      const response = await fetch(
        `http://localhost:${backport}/weather/getCondtions`
      );
      const data = await response.json();
      console.log("here are the weahter conditions i received", data);
      setweatherConditions(data.conditions);
    } catch (err) {
      console.log("failed to fetch weather conditions", err);
    }
  };
  return (
    <WeatherContext.Provider
      value={{ weatherConditions, fetchAllWeahterConditions }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};
