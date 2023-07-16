import React, { useRef, useState } from "react";
import "./Weather1.css";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";

const api = {
  key: "4141c81caaff7e396ff484e2393606d6",
  base: "https://api.openweathermap.org/data/2.5/",
};

const places = ["places"];

const Weather1 = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const inputRef = useRef();

  const getMyLocation = () => {
    if (window.navigator) {
        const location = window.navigator.geolocation;
        let lat;
        let lng;
        location.getCurrentPosition((pos) => {
            fetch(
                `${
                  api.base
                }weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&appid=${
                  api.key
                }`
              )
                .then((res) => res.json())
                .then((result) => {
                  setWeather(result);
                  console.log(result);
                  setQuery("");
                });
        });        
      }
  }

  let flag = useRef(false);
  if(!flag.value) {
    getMyLocation();
    flag.value = true;
  }

  

  const handlePlaceChanged = () => {
    const place = inputRef.current.getPlaces();
    if (place) {
      fetch(
        `${
          api.base
        }weather?lat=${place[0].geometry.location.lat()}&lon=${place[0].geometry.location.lng()}&units=metric&appid=${
          api.key
        }`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          console.log(result);
          setQuery("");
        });
    }
  };

  const getIconUrl = (id) => {
    let url = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    return url;
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "Novermber",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div className="total">
      <main>
        <div className="search-box">
          <LoadScript
            googleMapsApiKey="AIzaSyCKbEMuGOxGc_VM6fGC9qQAC4dGzc4ucS4"
            libraries={places}
          >
            <StandaloneSearchBox
              onLoad={(ref) => (inputRef.current = ref)}
              onPlacesChanged={handlePlaceChanged}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Enter Location"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </StandaloneSearchBox>
          </LoadScript>
          
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name},{weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">{Math.round(weather.main.temp)}°c</div>
            <div className="icon">
              <img src={getIconUrl(weather.weather[0].icon)}></img>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
            <div className="speed">
              <span>Wind Speed : </span>
              {weather.wind.speed}
            </div>
            <div className="temp">
              <div className="mintemp">
                <span>Min_temp : </span>
                {Math.round(weather.main.temp_min)}°c
              </div>
              <div className="maxtemp">
                <span>Max_temp : </span>
                {Math.round(weather.main.temp_max)}°c
              </div>
            </div>
            <div className="temp">
              <div className="humidity">
                <span>Humidity : </span>
                {Math.round(weather.main.humidity)}
              </div>
              <div className="pressure">
                <span>Pressure : </span>
                {Math.round(weather.main.pressure)}
              </div>
            </div>

          </div>
        ) : (
          " "
        )}
      </main>
    </div>
  );
};
export default Weather1;
