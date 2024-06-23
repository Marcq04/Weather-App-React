import './App.css';
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';

// Weather API Key
const api = {
  key: "API Key",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  // States
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState('');

  // API Call
  const fetchWeather = async () => {
    const url = `${api.base}weather?q=${search}&units=metric&appid=${api.key}`;
    const response = await fetch(url);
    const result = await response.json();
    if (result.cod === 200) {
      setWeather(result);
      setError(false);
      getCurrentDateTime(result.timeZone);
    } 
    else {
      setWeather({});
      setError(true);
      setCurrentDateTime('');
    }
  }

  // Get weather icon URL
  const getWeatherIconUrl = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

  // Current date and time
  const getCurrentDateTime = (location) => {
    const date = new Date();
    const localeTime = new Date(date.getTime() - (date.getTimezoneOffset() * 1000));
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: location
    };
    setCurrentDateTime(localeTime.toLocaleDateString('en-US', options));
  }

  // HTML Elements
  return (
    <div className="App">
      <header className='App-header'>
        {/* Container */}
        <div className="container">
          {/* Header */}
          <h1>Weather App</h1>
          {/* Search Box */}
          <input type="text" placeholder='Enter city/town...' onChange={(e) => setSearch(e.target.value)}></input>
          <button onClick={fetchWeather}>Search</button>
          {/* Display weather information conditionally */}
          {weather.name && weather.sys && (
            <div>
              {/* Location */}
              <p>{weather.name}, {weather.sys.country}</p>
              {/* Date and Time */}
              <p>{currentDateTime}</p>
              {/* Condition */}
              {weather.weather && weather.weather[0] && (
                <div>
                  <p>{weather.weather[0].main}</p>
                  <img src={getWeatherIconUrl(weather.weather[0].icon)} alt={weather.weather[0].description} />
                </div>
              )}
              {/* Temperature */}
              {weather.main && <p>Temperature: {weather.main.temp}°C</p>}
              {/* Humidity */}
              {weather.main && <p>Humidity: {weather.main.humidity}%</p>}
              {/* Wind Speed */}
              {weather.wind && (<p>Wind Speed: {weather.wind.speed}m/s</p>)}
            </div>
          )}
          {error && <p>City not found</p>}
        </div>
      </header>
    </div>
  );
}

export default App;
