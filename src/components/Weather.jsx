/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react";

const Weather = ({ weather, temp}) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [city, setNewCity] = useState();

  console.log(city)

  const handleSubmit = (e) => {
    e.preventDefault();
    const cityName = e.target.cityName.value;

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=43e64485bdd18ae707520e42b7a6bec3&lang=sp`;
  
  axios
    .get(URL)
    .then((res) => setNewCity(res.data))
    .catch((err) => console.log(err));
  };    

  const temp1 = !city ? temp.celsius : (city.main.temp - 273.15).toFixed(1)
  const temp2 = !city ? temp.farenheit : (temp1 * (9/5) + 32).toFixed(1)

  

  console.log(weather);

  const changeUnitTemp = () => setIsCelsius(!isCelsius);

  return (
    <section className="text-xl">
      <form onSubmit={handleSubmit} className="flex gap-4 justify-center">
        <input
          id="cityName"
          className="border-[1px] rounded-md p-1 text-center"
          type="text"
          placeholder="Escribe la ciudad"
        />
        <button className="bg-slate-300/60  font-semibold rounded-md p-2">
          Buscar Ciudad
        </button>
      </form>

      <h2 className="text-center mb-4 font-bold text-2xl tracking-wider mt-20">
        {!city ? weather.name : city.name}, {!city ? weather.sys.country : city.sys.country}
      </h2>

      <section className="grid gap-4 sm:grid-cols-two">
        <article className="bg-slate-300/70 rounded-3xl grid grid-cols-2 justify-items-center items-center py-2 sm:px-2">
          <h3 className="capitalize col-start-1 col-end-3">
            {!city ? weather.weather[0].description : city.weather[0].description}
          </h3>

          <h2 className="text-[45px] font-light sm:text-6xl">
            {isCelsius ? `${temp1} ºC` : `${temp2} ºF`}{" "}
          </h2>

          <div>
            <img
              src={`https://openweathermap.org/img/wn/${!city ? weather.weather[0].icon : city.weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
        </article>

        <article className="bg-slate-300/70 rounded-3xl grid grid-cols-3 justify-center justify-items-stretch py-2 sm:grid-cols-1 sm:px-2 sm:py-0">
          <div className="flex gap-2 text-sm justify-center items-center">
            <div>
              <img src="/images/wind.png" alt="" />
            </div>
            <h5>{!city ? weather.wind.speed : city.wind.speed} m/s</h5>
          </div>

          <div className="flex gap-2 text-sm justify-center items-center">
            <div>
              <img src="/images/humidity.png" alt="" />
            </div>
            <h5>{!city ? weather.main.humidity : city.main.humidity} %</h5>
          </div>

          <div className="flex gap-2 text-sm justify-center items-center">
            <div>
              <img src="/images/pressure.png" alt="" />
            </div>
            <h5>{!city ? weather.main.pressure : city.main.pressure} hPa</h5>
          </div>
        </article>
      </section>

      <button
        onClick={changeUnitTemp}
        className="bg-blue-500 py-2 px-6 text-white font-bold rounded-full hover:bg-blue-800 duration-200 text-sm block mx-auto mt-4 "
      >
        {" "}
        {isCelsius ? "Cambiar a Fº" : "Cambiar a Cº"}
      </button>
    </section>
  );
};

export default Weather;
