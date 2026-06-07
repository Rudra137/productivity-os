import { useEffect, useState } from "react";

const getWeatherIcon = (code) => {

  if (code === 0) return "☀️";

  if ([1,2,3].includes(code))
    return "⛅";

  if ([45,48].includes(code))
    return "🌫️";

  if ([51,53,55,61,63,65].includes(code))
    return "🌧️";

  if ([71,73,75].includes(code))
    return "❄️";

  if ([95,96,99].includes(code))
    return "⛈️";

  return "🌤";
};

function WeatherWidget() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(
      async (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
        );

        const data = await response.json();

        setWeather({
          temp: data.current.temperature_2m,
          code: data.current.weather_code
        });
      },

      (error) => {
        console.log(error);
      }
    );

  }, []);

  if (!weather) {
    return <span>Loading...</span>;
  }

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "18px",
          fontWeight: "600"
        }}
      >
        <span>{getWeatherIcon(weather.code)}</span>

        <span>{weather.temp}°C</span>
      </div>
    );}

export default WeatherWidget;
