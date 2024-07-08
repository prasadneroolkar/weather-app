import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./Weather.module.css";
import { IoIosSearch } from "react-icons/io";
// import { conditions } from "../assets/cloud.png";
import clearicon from "../assets/clear.png";

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const cond = ["Clear", "Drizzle", "Clouds", "Haze", "Rain", "Snow"];

  const [conditions, setCondition] = useState("");

  useEffect(() => {
    {
      if (typeof weather.main !== "undefined") {
        if (weather.weather[0].main === "Clouds") {
          setCondition("cloud");
        } else if (weather.weather[0].main === "Rain") {
          setCondition("rain");
        } else if (weather.weather[0].main === "Haze") {
          setCondition("haze");
        } else if (weather.weather[0].main === "Drizzle") {
          setCondition("drizzle");
        } else if (weather.weather[0].main === "Snow") {
          setCondition("snow");
        } else if (weather.weather[0].main === "Clear") {
          setCondition("clear");
        }
      }
    }
  });

  const api = {
    key: "fd99ed79aaca0f833876596b62ad8dd0",
    basename: "https://api.openweathermap.org/data/2.5/",
  };

  const fetchWeather = () => {
    setLoading(true);
    setError(null);

    fetch(`${api.basename}weather?q=${query}&units=metric&appid=${api.key}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((result) => {
        setWeather(result);
        console.log(result);
        setQuery("");
      })
      .catch((error) => {
        setError(error.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClick = () => {
    if (query) {
      fetchWeather();
    }
  };

  const handlePress = (e) => {
    if (e.key === "Enter" && query) {
      fetchWeather();
    }
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
      "November",
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
    let month = months[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();
    return `${day}, ${date} ${month}, ${year}`;
  };

  return (
    <>
      <div className={styles.weather}>
        <div className={styles.search_box}>
          <input
            type="text"
            value={query}
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handlePress}
          />
          <IoIosSearch
            onClick={handleClick}
            aria-label="Search"
            role="button"
            tabIndex={0}
          />
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          typeof weather.main !== "undefined" && (
            <div className={styles.weather_content}>
              <p>{dateBuilder(new Date())}</p>

              <img src={`/src/assets/${conditions}.png`} alt="" />

              <p className={styles.weather_conditions}>
                {weather.weather[0].main}
              </p>
              <div className={styles.location_box}>
                <p className={styles.location}>
                  {weather.name}, {weather.sys.country}
                </p>
              </div>
              <div className="temperature-box">
                <p className={styles.temperature}>
                  {Math.round(weather.main.temp)}°C
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Weather;
