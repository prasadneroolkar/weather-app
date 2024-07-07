import { useState } from "react";
import "./App.css";
import { IoIosSearch } from "react-icons/io";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const api = {
    key: "fd99ed79aaca0f833876596b62ad8dd0",
    basename: "https://api.openweathermap.org/data/2.5/",
  };

  const handleClick = () => {
    fetch(`${api.basename}weather?q=${query}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
      });
  };

  const handlePress = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.basename}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "february",
      "march",
      "april",
      "may",
      "june",
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
    return `${day},${date},${month},${year}`;
  };
  return (
    <>
      <div className="search-box">
        <input
          type="text"
          value={query}
          placeholder="search"
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handlePress}
        />
        <IoIosSearch onClick={handleClick} />
      </div>
      {typeof weather.main != "undefined" ? (
        <div>
          <div className="location-box">
            <div>
              {weather.name},{weather.sys.country}
            </div>
            <div>{dateBuilder(new Date())}</div>
          </div>
          <div className="temperature-box">
            <p>{Math.round(weather.main.temp)}°C</p>
          </div>
          <div className="weather">
            <p>{weather.weather[0].main}</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
