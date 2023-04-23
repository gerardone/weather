import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Weather from "./components/Weather";
import Loader from "./components/Loader";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  
  const success = (pos) => {
    const currentCords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    };
    setCoords(currentCords);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);
  
  useEffect(() => {
    if (coords) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=43e64485bdd18ae707520e42b7a6bec3&lang=sp
    `;
      axios
        .get(URL)
        .then((res) => {
          setWeather(res.data)
          const celsius = (res.data.main.temp - 273.15).toFixed(1)
          const farenheit = (celsius * (9/5) + 32).toFixed(1)
          const newTemps = {
            celsius,
            farenheit
          }
          setTemp(newTemps)
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);
// weather.weather.weather[0].id
// style={{backgroundImage: `url('/images/${weather && weather.weather.weather[0].id}.jpg')`}}
//bg-[url('/images/${weather ? weather.weather[0].id : ""}.jpg')]
  return (
    <div className={`App flex justify-center items-center min-h-screen bg-[url('/images/bg.jpg')] bg-cover px-2`} >
      {
        weather ? (
          <Weather weather={weather} temp={temp} />
        ) : (
          <Loader />
        )
      }
    </div>
  );
}
export default App;
