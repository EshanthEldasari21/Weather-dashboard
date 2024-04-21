import "./App.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./Components/TopButtons";
import Inputs from "./Components/Inputs";
import TimeandLocation from "./Components/TimeAndLocation";
import TemperatureandDetails from "./Components/TemperatureAndDetails";
import Forecast from "./Components/Forecast";
import formatForecastWeather from "./services/hourly_daily";
import getFormattedWeatherData from "./services/weatherService";
import { formatToLocalTime, iconUrlFromCode } from "./services/weatherService";
import { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState({ q: "New Delhi" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [weather2, setWeather2] = useState(null);
  var lait, long;

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then(async (data) => {
        setWeather(data);
        const data2 = await formatForecastWeather(data.lat, data.lon);
        setWeather2(data2);
      });
    };

    fetchWeather();
  }, [query, units]);

  const { daily, hourly } = { ...weather2 };
  console.log(hourly);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
    className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
      id="form"
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeandLocation weather={weather} />
          <TemperatureandDetails weather={weather} />
          <Forecast title="Hourly Forecast" items={hourly} />
          <Forecast title="Daily Forecast" items={daily} />
        </div>
      )}
    </div>
  );
}

export default App;
