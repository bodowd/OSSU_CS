import React from "react";

const Weather = ({ weather }) => {
  if (!weather) {
    return null;
  }
  return (
    <div>
      <div><strong>temperature: </strong> {weather.temperature} Celsius</div>
      <img src={weather.weather_icons} alt="weather" width="50" height="50"></img>
      <div>
        <strong>wind: </strong> {weather.wind_speed} mph direction {weather.wind_dir}
      </div>
    </div>
  );
};

export default Weather;
